import React from 'react';

interface PencilIconProps {
  className?: string;
}

const PencilIcon = ({ className = '' }: PencilIconProps) => {
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
      <path d='M12 20h9' />
      <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
      <line x1='10.5' y1='6.5' x2='17.5' y2='13.5' />
    </svg>
  );
};

export default PencilIcon;
