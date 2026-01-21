import React from 'react';

type Props = {
  size?: number;
  className?: string;
};

const SuccessCopiedIcon = ({ size = 24, className }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M20 6L9 17l-5-5' />
    </svg>
  );
};

export default SuccessCopiedIcon;
