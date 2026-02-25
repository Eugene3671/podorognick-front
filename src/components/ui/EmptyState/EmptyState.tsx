"use client";

import React from "react";
import css from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className={css.emptyStateBox}>
      <h3>{title}</h3>

      {description && <p>{description}</p>}

      {buttonText && onButtonClick && (
        <button className={css.emptyStateButton} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
