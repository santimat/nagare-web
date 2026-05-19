import { useState } from "react";

export function Toast({ children }) {
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const toastClasses = ``;

  return <span>{toast}</span>;
}
