import React from 'react';

interface HamburgerIconProps {
  isOpen?: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen = false }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d={isOpen ? 'M6 18L18 6M6 6L18 18' : 'M3 12H21M3 6H21M3 18H21'}
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default HamburgerIcon;
