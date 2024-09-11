import { ButtonHTMLAttributes, FC } from "react";
import { Noto_Sans } from "next/font/google";

const noto_sans = Noto_Sans({ subsets: ["latin"] });

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "info" | "danger";
};

const Button: FC<Props> = ({
  className,
  type,
  onClick,
  variant = "primary",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${
        noto_sans.className
      } px-2 p-1 min-w-20 transition-all rounded-md hover:outline hover:shadow-md outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner  active:outline-offset-0 active:scale-95 ${
        variant === "primary"
          ? "text-white bg-amber-600 active:bg-amber-700/80"
          : variant === "secondary"
          ? "text-white bg-stone-500 outline-stone-300"
          : variant === "info"
          ? "bg-transparent text-amber-500 border border-amber-500"
          : variant === "danger"
          ? "text-white bg-red-600 hover:outline-none hover:bg-red-500 active:bg-red-700/80"
          : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
