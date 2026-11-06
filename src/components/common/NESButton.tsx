import React from 'react';
import { sound } from '../../utils/audio';

export interface NESButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'gold' | 'green' | 'ghost' | 'default';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  soundType?: 'select' | 'start' | 'coin' | 'laser' | 'none';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const NESButton: React.FC<NESButtonProps> = ({
  variant = 'default',
  size = 'md',
  fullWidth = false,
  soundType = 'select',
  icon,
  children,
  onClick,
  onMouseEnter,
  className = '',
  disabled,
  style,
  ...rest
}) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && soundType !== 'none') {
      sound.playHover();
    }
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      if (soundType === 'select') sound.playSelect();
      else if (soundType === 'start') sound.playStart();
      else if (soundType === 'coin') sound.playCoin();
      else if (soundType === 'laser') sound.playLaser();
    }
    if (onClick) onClick(e);
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 10px', fontSize: '9px' },
    md: { padding: '10px 18px', fontSize: '11px' },
    lg: { padding: '14px 24px', fontSize: '13px' },
  };

  const variantClass = variant !== 'default' ? `nes-btn-${variant}` : '';

  return (
    <button
      className={`nes-btn ${variantClass} ${className}`}
      style={{
        ...sizeStyles[size],
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
