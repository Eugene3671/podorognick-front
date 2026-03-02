"use client";

import React, { useEffect } from "react";
import Button from "../../Button/Button";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  typeCancle: "";
  title: "href";
  description: "";
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  typeCancle,
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
        <h2></h2>
        <p></p>
        <div>
          <Button type={typeCancle}></Button>
          <Button></Button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
