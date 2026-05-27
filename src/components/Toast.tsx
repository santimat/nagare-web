import { useEffect, useState } from "react";

export function Toast({ children }) {
  const [toastMessage, setToastMessage] = useState<String | null>(null);
  const [toastType, setToastType] = useState<"error" | "success" | null>(null);
  const toastClasses = toastType === "error" ? "bg-accent/50" : "bg-darker/50";

  const handleToast = (event: CustomEvent) => {
    const {
      detail: { type, message },
    } = event;
    if (!message) return;
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  useEffect(() => {}, []);

  if (toastMessage)
    return (
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 rounded px-4 py-2 ${toastClasses} text-white`}
      >
        {toastMessage}
      </div>
    );
}
