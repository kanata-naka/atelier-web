import React, { useState, useEffect, useCallback } from "react"
import Modal from "react-modal"
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil"
import { nl2br } from "../../../utils/stringUtil"

Modal.setAppElement("#__next")

// モーダルの実体
const Component = () => {
  const [isOpen, setOpen] = useState(false)
  const [item, setItem] = useState({})
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
      <div className="gallery-modal-background" onClick={close}></div>
      <div
        className="gallery-modal-container"
        style={{
          backgroundImage: `url(${item.images &&
            item.images[currentImageIndex].url})`
        }}>
        <div className="gallery-modal-foreground">
          <h3 className="gallery-modal-title">{item.title}</h3>
          <p
            className="gallery-modal-description"
            dangerouslySetInnerHTML={{ __html: nl2br(item.description) }}></p>
          <div className="gallery-modal-date">
            <i className="far fa-clock"></i>
            &nbsp;
            {formatDateFromUnixTimestamp(item.createdAt)}
          </div>
        </div>
        <ul className="diff-list">
          {item.images &&
            item.images.map((image, index) => (
              <li
                key={index}
                className="diff-list-item"
                style={{
                  backgroundImage: `url(${image.url})`
                }}>
                <a
                  className="diff-list-item__link"
                  href="javascript:void(0)"
                  onClick={() => {
                    // 画像を切り替える
                    setCurrentImageIndex(index)
                  }}></a>
              </li>
            ))}
        </ul>
      </div>
      <div className="gallery-modal-close-button" onClick={close}>
        <i className="fas fa-times gallery-modal-close-button__icon"></i>
      </div>
    </Modal>
  )
}

const GalleryModal = {
  Component
}

export default GalleryModal
