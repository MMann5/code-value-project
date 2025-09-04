import React from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "default" | "filled" | "outline";
  className?: string;
  id?: string;
  name?: string;
  rows?: number;
  maxLength?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  disabled = false,
  required = false,
  size = "medium",
  variant = "default",
  className = "",
  id,
  name,
  rows = 4,
  maxLength,
  resize = "none",
}) => {
  const textAreaClasses = [
    styles.textArea,
    styles[variant],
    styles[size],
    className,
  ].join(" ");

  return (
    <textarea
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={textAreaClasses}
      id={id}
      name={name}
      rows={rows}
      maxLength={maxLength}
      style={{ resize }}
      
    />
  );
};

export default TextArea;
