import styles from "./Input.module.scss";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "default" | "filled" | "outline";
  className?: string;
  id?: string;
  name?: string;
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  required = false,
  size = "medium",
  variant = "default",
  className = "",
  id,
  name,
}: InputProps) => {
  const inputClasses = [
    styles.input,
    styles[variant],
    styles[size],
    className,
  ].join(" ");

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      className={inputClasses}
      id={id}
      name={name}
    />
  );
};

export default Input;
