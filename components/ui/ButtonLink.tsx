import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import { Noto_Sans } from "next/font/google";
import Link, { LinkProps } from "next/link";

const noto_sans = Noto_Sans({ subsets: ["latin"] });

type Props = LinkProps &
  PropsWithChildren & {
    className?: string;
    variant?: "primary" | "secondary" | "info" | "danger" | "muted";
  };

const ButtonLink: FC<Props> = ({
  href,
  className,
  variant = "primary",
  children,
}) => {
  return (
    <Link
      href={href}
      className={`${className} ${
        noto_sans.className
      } px-2 p-1 min-w-20 text-center transition-all rounded-md outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner  active:outline-offset-0 active:scale-95 ${
        variant === "primary"
          ? "text-white bg-amber-600 active:bg-amber-700/80 hover:outline hover:shadow-md"
          : variant === "secondary"
          ? "text-white bg-stone-500 outline-stone-300 hover:outline hover:shadow-md"
          : variant === "info"
          ? "bg-transparent text-amber-500 border border-amber-500 hover:outline hover:shadow-md"
          : variant === "danger"
          ? "text-white bg-red-600 hover:bg-red-500 active:bg-red-700/80"
          : variant === "muted"
          ? "hover:bg-stone-200/70 active:bg-stone-200"
          : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
