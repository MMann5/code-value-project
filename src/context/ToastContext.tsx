import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type FC,
} from "react";
import Toast from "../components/Toast/Toast";

type ToastContextType = {
  showToast: (
    message: any,
    severity: "info" | "success",
    autoHideDuration?: number
  ) => void;
  closeToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [autoHideDuration, setAutoHideDuration] = useState<number>(2000);
  const [severity, setSeverity] = useState<"info" | "success">("info");

  const showToast = (
    message: string,
    severity: "info" | "success",
    autoHideDuration?: number
  ) => {
    if (autoHideDuration) {
      setAutoHideDuration(autoHideDuration);
    }
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeToast = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      {open && (
        <Toast
          label={message}
          type={severity}
          onClose={closeToast}
          duration={autoHideDuration}
        />
      )}
    </ToastContext.Provider>
  );
};
