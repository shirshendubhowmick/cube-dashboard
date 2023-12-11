import { twJoin } from "tailwind-merge";

export interface ToastProps {
  type: "error" | "success";
  children: React.ReactNode;
}

function Toast(props: ToastProps) {
  return (
    <div
      className={twJoin(
        "mb-8 inline-block rounded border border-solid bg-white px-4 py-4 last:mb-0",
        props.type === "error" && "border-red-500",
        props.type === "success" && "border-green-500",
      )}
    >
      {props.children}
    </div>
  );
}

export default Toast;
