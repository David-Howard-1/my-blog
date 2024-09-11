import { ButtonHTMLAttributes, FC } from 'react';
import { Noto_Sans } from 'next/font/google';

const noto_sans = Noto_Sans({ subsets: ['latin'] });

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'info' | 'danger' | 'muted';
};

const Button: FC<Props> = ({
  className,
  type,
  onClick,
  variant = 'primary',
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${
        noto_sans.className
      } px-2 p-1 min-w-20 transition-all rounded-md hover:outline hover:shadow-md outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner  active:outline-offset-0 active:scale-95 ${
        variant === 'primary'
          ? 'text-white bg-amber-600 active:bg-amber-700/80 hover:outline hover:shadow-md'
          : variant === 'secondary'
          ? 'text-white bg-stone-500 outline-stone-300 hover:outline hover:shadow-md'
          : variant === 'info'
          ? 'bg-transparent text-amber-500 border border-amber-500 hover:outline hover:shadow-md'
          : variant === 'danger'
          ? 'text-white bg-red-600 hover:bg-red-500 active:bg-red-700/80 outline-red-300'
          : variant === 'muted'
          ? 'hover:bg-stone-200/70 active:bg-stone-200 outline-stone-400'
          : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
