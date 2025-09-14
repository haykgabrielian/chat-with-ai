import React from 'react';

type Props = {
  size?: number;
};

const PinIcon = ({ size = 14 }: Props) => {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
    >
      <path d='M16 12V4h1V2H7v2h1v8l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2z' />
    </svg>
  );
};

export default PinIcon;
