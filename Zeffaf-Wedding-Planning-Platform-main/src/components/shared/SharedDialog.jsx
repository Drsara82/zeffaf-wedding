import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export default function SharedDialog({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const [visible, setVisible] = useState(false);

  const originalOverflowRef = useRef("");
  const keyHandlerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    // cleanup helper (used on unmount)
    const cleanupNow = () => {
      if (keyHandlerRef.current) {
        document.removeEventListener("keydown", keyHandlerRef.current);
        keyHandlerRef.current = null;
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      document.body.style.overflow = originalOverflowRef.current || "";
      try {
        previouslyFocused.current && previouslyFocused.current.focus();
      } catch (err) {}
    };

    if (open) {
      // open: setup
      previouslyFocused.current = document.activeElement;

      originalOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // trigger entrance animation
      requestAnimationFrame(() => setVisible(true));

      // focus trap: focus first focusable element inside dialog after paint
      requestAnimationFrame(() => {
        const el = dialogRef.current;
        if (!el) return;
        const focusable = el.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) focusable.focus();
      });

      const onKey = (e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "Tab") {
          // basic focus trap
          const el = dialogRef.current;
          if (!el) return;
          const focusable = Array.from(
            el.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((n) => !n.hasAttribute("disabled"));
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      keyHandlerRef.current = onKey;
      document.addEventListener("keydown", onKey);

      // nothing to return here; cleanup is handled in the outer cleanup on dependency change/unmount
      return cleanupNow;
    }

    // if not open but we are visible, start closing
    if (!open && visible) {
      // start closing animation
      setVisible(false);

      // remove key handler immediately
      if (keyHandlerRef.current) {
        document.removeEventListener("keydown", keyHandlerRef.current);
        keyHandlerRef.current = null;
      }

      // wait for the animation to finish before restoring scroll and focus
      closeTimeoutRef.current = setTimeout(() => {
        document.body.style.overflow = originalOverflowRef.current || "";
        try {
          previouslyFocused.current && previouslyFocused.current.focus();
        } catch (err) {}
        closeTimeoutRef.current = null;
      }, 200); // match the transition duration

      return () => {
        // if effect runs again, clear the timeout
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      };
    }

    return cleanupNow;
  }, [open, onClose, visible]);

  // keep the component mounted while animating out
  if (!open && !visible) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onMouseDown={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shared-dialog-title"
        className={`relative z-10 w-full max-w-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg ring-1 ring-black/5 transform transition-all duration-200 ease-out ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 id="shared-dialog-title" className="text-lg font-semibold">
            {title}
          </h3>
          <button
            aria-label="Close dialog"
            onClick={onClose}
            className="ml-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
