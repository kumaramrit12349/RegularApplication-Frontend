import React, { useEffect } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ show, message, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bgColor = {
    success: "bg-success",
    error: "bg-danger",
    info: "bg-info",
    warning: "bg-warning",
  }[type];

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  }[type];

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <div className={`toast show ${bgColor} text-white`} role="alert">
        <div className="toast-header">
          <strong className="me-auto">
            <span className="me-2">{icon}</span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
