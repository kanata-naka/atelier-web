import { useState, useEffect, useCallback } from "react"
import Modal from "react-modal"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { styleDescription } from "../../../utils/domUtil"

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
  }, [])

  // モーダルを閉じる
  const close = useCallback(() => {
    if (onClose) {
      onClose(item)
    }
    setOpen(false)
  })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      className="gallery-modal"
      bodyOpenClassName="gallery-modal--open"
      style={{ overlay: { zIndex: 2 } }}>
      <Overlay onClick={close} />
      <div className="gallery-modal-container">
        <Background image={item.images[currentImageIndex]} />
        <div className="gallery-modal-foreground">
          <Title>{item.title}</Title>
          <Description>
            <span
              dangerouslySetInnerHTML={{
                __html: styleDescription(item.description)
              }}></span>
          </Description>
          <PostedDate timestamp={item.createdAt} />
        </div>
        <DiffList
          images={item.images}
          onSelect={index => setCurrentImageIndex(index)}
        />
      </div>
      <CloseButton onClick={close} />
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

const Description = ({ children }) => {
  return <p className="gallery-modal-description">{children}</p>
}

// 投稿日時
const PostedDate = ({ timestamp }) => {
  return (
    <div className="gallery-modal-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  )
}

// 差分リスト
const DiffList = ({ images, onSelect }) => {
  if (!images || !images.length) {
    return
  }
  return (
    <ul className="diff-list">
      {images.map((image, index) => (
        <DiffListItem
          key={index}
          image={image}
          onClick={e => {
            e.preventDefault()
            onSelect(index)
          }}
        />
      ))}
    </ul>
  )
}

const DiffListItem = ({ image, onClick }) => {
  return (
    <li
      className="diff-list-item"
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
