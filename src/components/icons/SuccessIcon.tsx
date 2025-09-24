import React from 'react';

interface SuccessIconProps {
  className?: string;
  color?: string;
  size?: number;
}

const SuccessIcon = ({
  className,
  color = '#5bb975',
  size,
}: SuccessIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={className}
      fill='currentColor'
      width={size}
      height={size}
    >
      <path
        fill={color}
        d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
      />
    </svg>
  );
};

export default SuccessIcon;
