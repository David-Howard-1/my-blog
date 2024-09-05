'use client';

import React from 'react';

type Props = React.PropsWithChildren & {
  tooltip?: string;
};

const ToolTip: React.FC<Props> = ({ tooltip, children }) => {
  const toolTipRef = React.useRef<HTMLSpanElement>(null);
  const container = React.useRef<HTMLDivElement>(null);

  return (
    <div
      onMouseEnter={({ clientX }) => {
        if (!toolTipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        toolTipRef.current.style.left = clientX - left + 'px';
      }}
      className="group relative inline-block"
    >
      {children}
      {tooltip ? (
        <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition rounded absolute text-white text-xs shadow-sm bg-stone-900/75 px-2 p-1 top-full mt-2 whitespace-nowrap">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

export default ToolTip;
