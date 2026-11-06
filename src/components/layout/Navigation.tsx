import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { PageId } from '../../types';

interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'start', label: 'START', icon: '🎮' },
  { id: 'about', label: 'ABOUT', icon: '🧙' },
  { id: 'skills', label: 'SKILLS', icon: '⚡' },
  { id: 'experience', label: 'EXPERIENCE', icon: '⚔️' },
  { id: 'projects', label: 'PROJECTS', icon: '🕹️' },
  { id: 'contact', label: 'CONTACT', icon: '📡' },
  { id: 'settings', label: 'CONFIG', icon: '⚙️' },
];

export const Navigation: React.FC = () => {
  const { currentStage, setCurrentStage } = useTheme();

  return (
    <nav
      aria-label="Main Navigation"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto 20px auto',
        padding: '0 16px',
      }}
    >
      <div
        className="pixel-box"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '10px 14px',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {NAV_ITEMS.map(item => {
          const isActive = currentStage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentStage(item.id)}
              className="nes-btn"
              style={{
                padding: '8px 12px',
                fontSize: '10px',
                backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-card-alt)',
                color: isActive ? '#ffffff' : 'var(--text-primary)',
                flex: '1 1 auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              {isActive && <span className="blink" style={{ color: 'var(--color-gold)' }}>►</span>}
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setCurrentStage('map')}
          className="nes-btn"
          style={{
            flex: '1 1 auto',
            padding: '8px 12px',
            fontSize: '10px',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            backgroundColor: currentStage === 'map' ? 'var(--color-gold)' : 'var(--bg-card-alt)',
            color: currentStage === 'map' ? '#111' : 'var(--color-gold)',
          }}
        >
          {currentStage === 'map' && <span className="blink">►</span>}
          <span>🗺️ OVERWORLD</span>
        </button>
      </div>
    </nav>
  );
};
