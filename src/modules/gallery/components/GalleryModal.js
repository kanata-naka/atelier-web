import { useState, useEffect, useCallback } from "react"
import Modal from "react-modal"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { nl2br } from "../../../utils/stringUtil"

Modal.setAppElement("#__next")

/**
 * モーダルの実体
 */
const Component = () => {
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
                __html: nl2br(item.description)
              }}></span>
          </Description>
          <PublicationDate timestamp={item.createdAt} />
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

const PublicationDate = ({ timestamp }) => {
  return (
    <div className="gallery-modal-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  )
}

/**
 * 差分リスト
 */
const DiffList = ({ images, onSelect }) => {
  if (!images || !images.length) {
    return
  }
  return (
    <ul className="diff-list">
      {images.map((image, index) => (
        <DiffListItem
          image={image}
          index={index}
          onClick={() => onSelect(index)}
        />
      ))}
    </ul>
  )
}

const DiffListItem = ({ image, index, onClick }) => {
  return (
    <li
      key={index}
      className="diff-list-item"
      style={{
        backgroundImage: `url(${image.url})`
      }}>
      <a
        className="diff-list-item__link"
        href="javascript:void(0)"
        onClick={onClick}></a>
    </li>
  )
}

/**
 * 閉じるボタン
 */
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
