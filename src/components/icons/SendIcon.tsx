import React from 'react';

interface SendIconProps {
  size?: number;
  className?: string;
}

const SendIcon = ({ size = 16, className = '' }: SendIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      shapeRendering='geometricPrecision'
      textRendering='geometricPrecision'
      imageRendering='optimizeQuality'
      fillRule='evenodd'
      clipRule='evenodd'
      viewBox='0 0 511 512.32'
      width={size}
      height={size}
      className={className}
      fill='currentColor'
    >
      <path d='M9.72 185.88L489.19 1.53c3.64-1.76 7.96-2.08 12.03-.53 7.83 2.98 11.76 11.74 8.78 19.57L326.47 502.56h-.02c-1.33 3.49-3.94 6.5-7.57 8.25-7.54 3.63-16.6.47-20.23-7.06l-73.78-152.97 146.67-209.97-209.56 146.3L8.6 213.64a15.117 15.117 0 01-7.6-8.25c-2.98-7.79.93-16.53 8.72-19.51z' />
    </svg>
  );
};

export default SendIcon;
