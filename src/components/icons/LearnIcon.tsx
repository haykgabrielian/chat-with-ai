import React from 'react';

interface LearnIconProps {
  className?: string;
}

const LearnIcon = ({ className = '' }: LearnIconProps) => {
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
      <path d='M22 10L12 5L2 10L12 15L22 10Z' />
      <path d='M6 13V17C6 18.1 8.7 20 12 20S18 18.1 18 17V13' />
      <line x1='12' y1='15' x2='12' y2='19' />
      <circle cx='20' cy='12' r='2' />
    </svg>
  );
};

export default LearnIcon;
