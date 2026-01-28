import React from 'react';

interface ArrowDownIconProps {
  size?: number;
  className?: string;
}

const ArrowDownIcon = ({ size = 16, className = '' }: ArrowDownIconProps) => {
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
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12 5v14m0 0l7-7m-7 7l-7-7' />
    </svg>
  );
};

export default ArrowDownIcon;
