import { useState } from "react";

export function Toast({ children }) {
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const toastClasses = toastType === "error" ? "bg-accent/50" : "bg-darker/50";

  return <span className={`absolute top-4 left-4 ${toastClasses}`}>{toast}</span>;
}
