"use client";

import React, { useEffect } from "react";
import css from "./ModalWrapper.module.css";
import Button from "../../Button/Button";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  hrefBtnLeft?: string;
  hrefBtnRight: string;
  textBtnLeft: string;
  textBtnRight: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  hrefBtnLeft,
  hrefBtnRight,
  textBtnRight,
  textBtnLeft,
  title,
  description,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className={css.modalContent}>
          <h3 className={css.modalTitle}>{title}</h3>
          <p className={css.modalText}>{description}</p>
          <div className={css.modalButtonsWrapper}>
            <Button
              className={`buttonGrey ${css.modalButton}`}
              href={hrefBtnLeft}
            >
              {textBtnLeft}
            </Button>
            <Button
              className={`buttonBlue ${css.modalButton}`}
              href={hrefBtnRight}
            >
              {textBtnRight}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
