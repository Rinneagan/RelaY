import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  info: <Info size={18} />,
  warning: <AlertTriangle size={18} />,
};

const COLORS: Record<ToastType, { bg: string; border: string; icon: string; title: string }> = {
  success: { bg: "#F0FDF4", border: "#86EFAC", icon: "#16A34A", title: "#15803D" },
  error: { bg: "#FEF2F2", border: "#FCA5A5", icon: "#DC2626", title: "#B91C1C" },
  info: { bg: "#EFF6FF", border: "#93C5FD", icon: "#2563EB", title: "#1D4ED8" },
  warning: { bg: "#FFFBEB", border: "#FDE68A", icon: "#D97706", title: "#B45309" },
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, toast.duration ?? 4500);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const c = COLORS[toast.type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: "12px",
        padding: "14px 16px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06)",
        minWidth: "300px",
        maxWidth: "380px",
        transform: visible ? "translateX(0) scale(1)" : "translateX(100%) scale(0.95)",
        opacity: visible ? 1 : 0,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        willChange: "transform, opacity",
      }}
    >
      <div style={{ color: c.icon, flexShrink: 0, marginTop: "1px" }}>{ICONS[toast.type]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: c.title, marginBottom: toast.message ? "3px" : 0 }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ fontSize: "12.5px", color: "#4B5563", lineHeight: 1.45 }}>{toast.message}</div>
        )}
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 300); }}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: "2px", flexShrink: 0, display: "flex", alignItems: "center", borderRadius: "4px" }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end", pointerEvents: "none" }}>
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: "all" }}>
            <ToastItem toast={t} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
