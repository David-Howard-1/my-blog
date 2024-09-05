import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  /**
   * Container classes
   */
  className?: string;
};

const Header: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`${className} bg-amber-100 text-center mb-8 p-10 md:p-28 flex flex-col items-center`}
    >
      {children}
    </div>
  );
};

export default Header;
