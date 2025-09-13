import React from 'react';

type WarningIconProps = {
  level?: 'info' | 'warning' | 'critical';
  size?: number;
  className?: string;
};

const colors = {
  info: '#00ad02',
  warning: '#FACC15',
  critical: '#e70000',
};

const WarningIcon = ({
  level = 'warning',
  size = 16,
  className,
}: WarningIconProps) => {
  const iconColor = colors[level];

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={iconColor}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
      <path d='M12 9v4' />
      <path d='M12 17h.01' />
    </svg>
  );
};

export default WarningIcon;
