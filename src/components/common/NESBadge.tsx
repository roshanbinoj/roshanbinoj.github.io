import React from 'react';

export interface NESBadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'gold' | 'green' | 'dark';
  size?: 'sm' | 'md';
}

export const NESBadge: React.FC<NESBadgeProps> = ({
  children,
  variant = 'dark',
  size = 'md',
}) => {
  const bgColors: Record<string, string> = {
    primary: 'var(--color-primary)',
    accent: 'var(--color-accent)',
    gold: 'var(--color-gold)',
    green: 'var(--color-green)',
    dark: 'var(--bg-card-alt)',
  };

  const textColors: Record<string, string> = {
    primary: '#fff',
    accent: '#fff',
    gold: '#111',
    green: '#111',
    dark: 'var(--text-primary)',
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: bgColors[variant],
        color: textColors[variant],
        fontFamily: 'var(--font-pixel)',
        fontSize: size === 'sm' ? '8px' : '9px',
        padding: size === 'sm' ? '2px 6px' : '4px 8px',
        border: '2px solid var(--border-color)',
        boxShadow: '2px 2px 0 #000',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {children}
    </span>
  );
};
