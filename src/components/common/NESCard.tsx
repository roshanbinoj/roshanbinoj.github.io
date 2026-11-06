import React from 'react';

export interface NESCardProps {
  title?: string;
  badge?: string;
  variant?: 'default' | 'primary' | 'accent' | 'gold';
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  style?: React.CSSProperties;
}

export const NESCard: React.FC<NESCardProps> = ({
  title,
  badge,
  variant = 'default',
  children,
  className = '',
  headerAction,
  style,
}) => {
  const variantClass = 
    variant === 'primary' ? 'pixel-box-primary' :
    variant === 'accent' ? 'pixel-box-accent' :
    variant === 'gold' ? 'pixel-box-gold' : '';

  return (
    <div className={`pixel-box ${variantClass} ${className}`} style={style}>
      {(title || badge || headerAction) && (
        <div className="dialogue-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--color-primary)' }}>▶</span>
            <span style={{ fontWeight: 'bold' }}>{title}</span>
            {badge && (
              <span
                style={{
                  fontSize: '9px',
                  backgroundColor: 'var(--color-gold)',
                  color: '#111',
                  padding: '2px 6px',
                  borderRadius: '2px',
                  fontWeight: 'bold',
                }}
              >
                {badge}
              </span>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  );
};
