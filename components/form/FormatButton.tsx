import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  isActive?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
};

const FormatButton: FC<Props> = ({
  onClick,
  isActive,
  className,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${isActive && 'bg-sky-200/50'} rounded-md p-1`}
    >
      <span
        className={`${
          isActive && 'text-sky-600 hover:text-sky-700'
        } hover:text-black/70 active:text-black/50`}
      >
        {children}
      </span>
    </button>
  );
};

export default FormatButton;
