'use client';

import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Button from './Button';
import { CgClose } from 'react-icons/cg';

type Props = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
};

const Modal: FC<Props> = ({ isOpen, onClose, header, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div id="modal-overlay" className="min-w-60">
      <div className="px-3 p-1 bg-stone-300 rounded-t-lg border-t border-stone-300 flex items-center justify-between text-stone-700">
        <h3 className="">{header}</h3>
        <Button
          onClick={onClose}
          variant="muted"
          className="rounded-full min-w-0"
        >
          <CgClose />
        </Button>
      </div>
      <div
        id="modal content"
        className="p-3 flex flex-col rounded-b-lg border border-stone-300 border-t-none bg-white"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
