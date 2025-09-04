import styles from "./Select.module.scss";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "default" | "filled" | "outline";
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
}

const Select = ({
  options,
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
  placeholder,
}: SelectProps) => {
  const selectClasses = [
    styles.select,
    styles[variant],
    styles[size],
    className,
  ].join(" ");

  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      required={required}
      className={selectClasses}
      id={id}
      name={name}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
