import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { NESButton } from '../common/NESButton';
import { sound } from '../../utils/audio';

export const PauseModal: React.FC = () => {
  const {
    isPaused,
    setIsPaused,
    soundEnabled,
    toggleSound,
    crtEnabled,
    toggleCrt,
    setCurrentStage,
  } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPaused) {
          sound.playPause();
          setIsPaused(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, setIsPaused]);

  if (!isPaused) return null;

  const handleResume = () => {
    sound.playPause();
    setIsPaused(false);
  };

  const handleWarp = (stage: 'map' | 'start' | 'settings') => {
    sound.playSelect();
    setIsPaused(false);
    setCurrentStage(stage);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={handleResume}
    >
      <div
        className="pixel-box-gold"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'var(--bg-card)',
          padding: '24px',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Pause Banner */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2
            className="blink"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '22px',
              color: 'var(--color-gold)',
              letterSpacing: '3px',
              textShadow: '3px 3px 0 #000',
              marginBottom: '8px',
            }}
          >
            *** PAUSED ***
          </h2>
          <p style={{ fontFamily: 'var(--font-retro)', fontSize: '12px', color: 'var(--text-secondary)' }}>
            GAME SUSPENDED • ADVENTURER IS RESTING
          </p>
        </div>

        {/* Menu Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <NESButton variant="primary" fullWidth size="lg" onClick={handleResume}>
            ▶ CONTINUE QUEST [ESC]
          </NESButton>

          <NESButton variant="gold" fullWidth onClick={() => handleWarp('map')}>
            🗺️ GO TO OVERWORLD MAP [M]
          </NESButton>

          <div style={{ display: 'flex', gap: '12px' }}>
            <NESButton
              variant={soundEnabled ? 'green' : 'ghost'}
              style={{ flex: 1 }}
              onClick={toggleSound}
            >
              {soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF'}
            </NESButton>

            <NESButton
              variant={crtEnabled ? 'accent' : 'ghost'}
              style={{ flex: 1 }}
              onClick={toggleCrt}
            >
              {crtEnabled ? '📺 CRT: ON' : '📺 CRT: OFF'}
            </NESButton>
          </div>

          <NESButton variant="default" fullWidth onClick={() => handleWarp('settings')}>
            ⚙️ OPEN SETTINGS / CONFIG
          </NESButton>
        </div>

        {/* Controller Hotkey Guide */}
        <div
          style={{
            backgroundColor: 'var(--bg-card-alt)',
            border: '2px solid var(--border-subtle)',
            padding: '12px',
            fontFamily: 'var(--font-terminal)',
            fontSize: '16px',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ color: 'var(--color-gold)', marginBottom: '4px', fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
            CONTROLLER SHORTCUTS:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div>[1] - [7] : Jump Stages</div>
            <div>[M] : Overworld Map</div>
            <div>[S] : Audio Mute Toggle</div>
            <div>[T] : Scanline CRT Filter</div>
            <div>[C] : Earn Free Coins</div>
            <div>[ESC] : Pause Menu</div>
          </div>
        </div>
      </div>
    </div>
  );
};
