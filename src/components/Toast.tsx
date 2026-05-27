import { useEffect, useState } from "react";

export function Toast({ children }) {
  const [toastMessage, setToastMessage] = useState<String | null>(null);
  const [toastType, setToastType] = useState<"error" | "success" | null>(null);
  const toastClasses = toastType === "error" ? "bg-accent" : "bg-darker";

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

  useEffect(() => {
    window.addEventListener("contact-error", handleToast);
    window.addEventListener("contact-success", handleToast);

    () => {
      window.removeEventListener("contact-error", handleToast);
      window.removeEventListener("contact-success", handleToast);
    };
  }, []);

  if (toastMessage)
    return (
      <span
        className={`animate-fade-in-down animate-duration-300 fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded px-4 py-2 text-white ${toastClasses}`}
      >
        {toastMessage}
      </span>
    );
}
