import React, { useState, useRef, useEffect } from "react"
import Modal from "react-modal"

const Component = ({ item }) => {
  const [isOpen, setOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  Component.open = () => {
    setOpen(true)
  }

  Component.close = () => {
    setOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={Component.close}
      overlayClassName="gallery-modal">
      <div className="gallery-modal-background"></div>
      <div className="gallery-modal-container">
        <img
          className="gallery-modal__image"
          src={item.images[currentImageIndex]}
        />
        <div className="gallery-modal-foreground">
          <h3 className="gallery-modal-title">{item.title}</h3>
          <p className="gallery-modal-description">{item.description}</p>
          <div className="gallery-modal-date">
            <i className="far fa-clock"></i>
            {" " + item.createdAt}
          </div>
        </div>
        <ul className="diff-list">
          {item.images.map((image, index) => (
            <li key={index} className="diff-list-item">
              <a
                className="diff-list-item__link"
                onClick={() => {
                  setCurrentImageIndex(index)
                }}>
                <img className="diff-list-item__image" src={image} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="gallery-modal-close-button" onClick={Component.close}>
        <i className="fas fa-times gallery-modal-close-button__icon"></i>
      </div>
    </Modal>
  )
}
