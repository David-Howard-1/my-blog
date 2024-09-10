import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    variant?: 'primary' | 'secondary' | 'info' | 'danger';
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
      className={`${className} px-2 p-1 min-w-20 font-semibold rounded-md hover:outline outline-amber-400 hover:outline-1 outline-offset-1 active:shadow-inner  active:outline-offset-0 ${
        variant === 'primary'
          ? 'text-white bg-amber-600 active:bg-amber-700/80'
          : variant === 'secondary'
          ? 'text-white bg-stone-500 outline-stone-300'
          : variant === 'info'
          ? 'bg-transparent text-amber-500 border border-amber-500'
          : variant === 'danger'
          ? 'text-white bg-red-600 hover:outline-none hover:bg-red-500 active:bg-red-700/80'
          : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
