import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { NESButton } from '../common/NESButton';
import { sound } from '../../utils/audio';

export const HUD: React.FC = () => {
  const {
    currentStage,
    setCurrentStage,
    score,
    coins,
    addCoin,
    soundEnabled,
    toggleSound,
    crtEnabled,
    toggleCrt,
    setIsPaused,
  } = useTheme();

  const stageLabels: Record<string, string> = {
    start: 'W1-1 START',
    about: 'W1-2 HERO',
    skills: 'W2-1 SKILL',
    experience: 'W3-1 QUEST',
    projects: 'W4-1 ARCADE',
    contact: 'W5-1 BEACON',
    settings: 'W6-1 CONFIG',
    map: 'OVERWORLD',
  };

  const handlePause = () => {
    sound.playPause();
    setIsPaused(true);
  };

  return (
    <header className="hud-bar" role="banner">
      <div className="hud-content">
        {/* Left: Player & HP */}
        <div className="hud-stat-group">
          <button
            onClick={() => setCurrentStage('start')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-pixel)',
              fontSize: '11px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            title="Return to Title Screen"
          >
            <span style={{ color: 'var(--color-primary)' }}>★</span>
            <span style={{ fontWeight: 'bold' }}>ROSHAN</span>
          </button>

          <div
            className="hud-stat hud-hp"
            onClick={addCoin}
            style={{ cursor: 'pointer' }}
            title="Click to replenish HP & earn 100 PTS!"
          >
            <span className="hud-stat-label">HP</span>
            <div className="pixel-bar-container">
              <div className="pixel-bar-fill" style={{ width: '92%' }} />
            </div>
          </div>

          <div
            className="hud-stat hud-coins"
            onClick={addCoin}
            style={{ cursor: 'pointer' }}
            title="Click for coins!"
          >
            <span style={{ color: 'var(--color-gold)' }}>🪙</span>
            <span className="hud-stat-value">x{coins < 10 ? `0${coins}` : coins}</span>
          </div>
        </div>

        {/* Center: Stage & Score */}
        <div className="hud-stat-group hud-center">
          <div className="hud-stat">
            <span className="hud-stat-label">STAGE</span>
            <span
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                padding: '2px 8px',
                border: '2px solid var(--border-color)',
                color: 'var(--color-primary)',
                fontWeight: 'bold',
              }}
            >
              {stageLabels[currentStage] || 'WORLD 1'}
            </span>
          </div>

          <div className="hud-stat">
            <span className="hud-stat-label">SCORE</span>
            <span className="hud-stat-value" style={{ letterSpacing: '1px' }}>
              {score.toString().padStart(6, '0')}
            </span>
          </div>
        </div>

        {/* Right: Retro Controls */}
        <div className="hud-stat-group">
          <NESButton
            size="sm"
            variant={currentStage === 'map' ? 'primary' : 'default'}
            onClick={() => setCurrentStage('map')}
            title="Open Interactive Overworld Map"
          >
            🗺️<span className="hud-btn-label"> MAP</span>
          </NESButton>

          <NESButton
            size="sm"
            variant={soundEnabled ? 'green' : 'ghost'}
            onClick={toggleSound}
            title={soundEnabled ? 'Mute 8-bit Audio' : 'Enable 8-bit Audio'}
          >
            {soundEnabled ? '🔊' : '🔇'}<span className="hud-btn-label"> {soundEnabled ? 'SFX' : 'MUTE'}</span>
          </NESButton>

          <NESButton
            size="sm"
            variant={crtEnabled ? 'accent' : 'ghost'}
            onClick={toggleCrt}
            title="Toggle CRT scanline filter"
          >
            📺<span className="hud-btn-label"> CRT</span>
          </NESButton>

          <NESButton
            size="sm"
            variant="gold"
            onClick={handlePause}
            title="Pause Game (or press ESC)"
          >
            ⏸️<span className="hud-btn-label"> MENU</span>
          </NESButton>
        </div>
      </div>
    </header>
  );
};
