import { useCallback, useEffect, useRef, useState } from "react";

import { eventName, ToastEventDetail } from ".";

import Toast, { ToastProps } from "./components/Toast/Toast";

interface ToastsState extends ToastProps {
  id: number;
}

const TOAST_TIMEOUT_MS = 4000;

function ToastContainer() {
  const [toasts, setToasts] = useState<ToastsState[]>([]);
  const intervalRef = useRef<number>();

  const onShowToast = useCallback((e: CustomEvent<ToastEventDetail>) => {
    setToasts((currentState) => [
      ...currentState,
      {
        children: e.detail.msg,
        type: e.detail.type,
        id: new Date().getTime(),
      },
    ]);
  }, []) as EventListener;

  useEffect(() => {
    document.addEventListener(eventName, onShowToast);

    return () => {
      document.removeEventListener(eventName, onShowToast);
    };
  }, [onShowToast]);

  const registerToastCleanup = useCallback(() => {
    intervalRef.current = window.setInterval(() => {
      setToasts((currentState) => {
        if (currentState.length === 1) {
          clearInterval(intervalRef.current);
        }
        return currentState.slice(1);
      });
    }, TOAST_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (toasts.length === 1) {
      registerToastCleanup();
    }
  }, [registerToastCleanup, toasts.length]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex min-w-[250px] flex-col items-start">
      {toasts.map((toast) => (
        <Toast type={toast.type} key={toast.id}>
          {toast.children}
        </Toast>
      ))}
    </div>
  );
}

export default ToastContainer;
