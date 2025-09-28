import React from 'react';

interface ProductivityIconProps {
  className?: string;
}

const ProductivityIcon = ({ className = '' }: ProductivityIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={className}
      fill='currentColor'
    >
      <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
      <path d='M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 2h2v16h-2V5z' />
    </svg>
  );
};

export default ProductivityIcon;
