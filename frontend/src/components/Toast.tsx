import { FunctionComponent, useEffect } from "react";
import { ToastMessage } from "../Context/AppContext";

const Toast: FunctionComponent<ToastMessage & { onClose: () => void }> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center gap-4">
        <span className="text-lg font-semibold">{message}</span>
        <span
          className="text-white cursor-pointer font-semibold"
          onClick={onClose}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default Toast;
