import { useState, useEffect, useCallback } from "react"
import Modal from "react-modal"
import Router from 'next/router'
import { Globals } from "../../../common/models"
import ShareButtons from "../../../common/components/ShareButtons"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { renderMarkdown } from "../../../utils/domUtil"

Modal.setAppElement("#__next")

// モーダルの実体
const Component = ({ onClose }) => {
  const [isOpen, setOpen] = useState(false)
  const [item, setItem] = useState({ images: [] })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // モーダルを開く
    GalleryModal.open = item => {
      setItem(item)
      setCurrentImageIndex(0)
      setOpen(true)
    }
    // モーダルを閉じる
    GalleryModal.close = () => setOpen(false)
  }, [])

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
    }
    setOpen(false)
  })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="gallery-modal"
      bodyOpenClassName="gallery-modal--open"
      style={{ overlay: { zIndex: 2 } }}>
      <Overlay onClick={handleClose} />
      <div className="gallery-modal-container">
        <Background image={item.images[currentImageIndex]} />
        <div className="gallery-modal-foreground">
          <Title>{item.title}</Title>
          <TagList tags={item.tags} />
          <Description>{renderMarkdown(item.description)}</Description>
          <ShareButtons
            url={`${Globals.env.BASE_URL}/gallery/${item.id}`}
            title={item.title}
            classPrefix="gallery-modal-"
          />
          <PostedDate timestamp={item.createdAt} />
        </div>
        <DiffList
          images={item.images}
          currentImageIndex={currentImageIndex}
          onSelect={index => setCurrentImageIndex(index)}
        />
      </div>
      <CloseButton onClick={handleClose} />
    </Modal>
  )
}

// オーバーレイ
const Overlay = ({ onClick }) => {
  return <div className="gallery-modal-overlay" onClick={onClick}></div>
}

const Background = ({ image }) => {
  return (
    <div
      className="gallery-modal-background"
      style={{
        backgroundImage: image && `url(${image.url})`
      }}></div>
  )
}

const Title = ({ children }) => {
  return <h3 className="gallery-modal-title">{children}</h3>
}

const TagList = ({ tags = [] }) => {
  return (
    <ul className="gallery-modal-tag-list">
      {tags.map((tag, index) => (
        <TagListItem key={index} tag={tag} />
      ))}
    </ul>
  )
}

const TagListItem = ({ tag }) => {
  return (
    <li className="gallery-modal-tag-list-item">
      <a href={`/gallery?tag=${tag}`} onClick={(e) => {
          // ※同一ページ間の遷移だとモーダルがそのままになってしまうため、
          // 　手動でモーダルを閉じる
          e.preventDefault()
          Router.push(`/gallery?tag=${tag}`)
          GalleryModal.close()
        }}>
        {`#${tag}`}
      </a>
    </li>
  )
}

const Description = ({ children }) => {
  return <p className="gallery-modal-description">{children}</p>
}

// 投稿日時
const PostedDate = ({ timestamp }) => {
  return (
    <div className="gallery-modal-posted-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  )
}

// 差分リスト
const DiffList = ({ images, currentImageIndex, onSelect }) => {
  if (!images || !images.length) {
    return null
  }
  return (
    <ul className="diff-list">
      {images.map((image, index) => (
        <DiffListItem
          key={index}
          image={image}
          isActive={index === currentImageIndex}
          onClick={e => {
            e.preventDefault()
            onSelect(index)
          }}
        />
      ))}
    </ul>
  )
}

const DiffListItem = ({ image, isActive, onClick }) => {
  return (
    <li
      className={`diff-list-item ${isActive ? "active" : ""}`}
      style={{
        backgroundImage: `url(${image.url})`
      }}>
      <a
        className="diff-list-item__link"
        href={image.url}
        onClick={onClick}></a>
    </li>
  )
}

// 閉じるボタン
const CloseButton = ({ onClick }) => {
  return (
    <div className="gallery-modal-close-button" onClick={onClick}>
      <i className="fas fa-times gallery-modal-close-button__icon"></i>
    </div>
  )
}

const GalleryModal = {
  Component
}

export default GalleryModal
