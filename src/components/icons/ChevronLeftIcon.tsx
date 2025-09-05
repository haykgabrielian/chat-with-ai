import React from 'react';

interface ChevronLeftIconProps {
  size?: number;
  className?: string;
}

const ChevronLeftIcon = ({
  size = 20,
  className = '',
}: ChevronLeftIconProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      className={className}
    >
      <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
    </svg>
  );
};

export default ChevronLeftIcon;
