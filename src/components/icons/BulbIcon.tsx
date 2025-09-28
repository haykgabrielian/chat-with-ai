import React from 'react';

interface BulbIconProps {
  className?: string;
}

const BulbIcon = ({ className = '' }: BulbIconProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M9 21h6' />
      <path d='M12 17v4' />
      <path d='M9 18h6' />
      <path d='M12 3a6 6 0 0 1 6 6c0 3-2 4.5-2 6H8c0-1.5-2-3-2-6a6 6 0 0 1 6-6z' />
    </svg>
  );
};

export default BulbIcon;
