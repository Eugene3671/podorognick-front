"use client";

import React, { useEffect } from "react";
import css from "./ModalWrapper.module.css";
import Button from "../../Button/Button";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;

  // navigation url for left/right button, optional when using click callbacks
  hrefBtnLeft?: string;
  hrefBtnRight?: string;

  // click handlers, e.g. for cancelling/confirming an action
  onLeftClick?: () => void;
  onRightClick?: () => void | Promise<void>;

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
  onLeftClick,
  onRightClick,
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

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={css.modalCloseBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h3 className={css.modalTitle}>{title}</h3>
        <p className={css.modalText}>{description}</p>
        <div className={css.modalButtonsWrapper}>
          <Button
            className={`buttonGrey ${css.modalButton}`}
            href={hrefBtnLeft}
            onClick={onLeftClick}
          >
            {textBtnLeft}
          </Button>
          <Button
            className={`buttonBlue ${css.modalButton}`}
            href={hrefBtnRight}
            onClick={onRightClick}
          >
            {textBtnRight}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalWrapper;
