import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { NESCard } from '../components/common/NESCard';
import { NESButton } from '../components/common/NESButton';
import { sound } from '../utils/audio';
import { launchPixelConfetti } from '../utils/confetti';
import type { ThemeId } from '../types';

export const Settings: React.FC = () => {
  const {
    theme,
    setTheme,
    themes,
    soundEnabled,
    toggleSound,
    crtEnabled,
    toggleCrt,
    textSpeed,
    setTextSpeed,
    addScore,
    addCoin,
    setCurrentStage,
  } = useTheme();

  const [cheatInput, setCheatInput] = useState<string[]>([]);
  const [cheatUnlocked, setCheatUnlocked] = useState<boolean>(false);

  const konamiPattern = ['UP', 'UP', 'DOWN', 'DOWN', 'LEFT', 'RIGHT', 'LEFT', 'RIGHT', 'B', 'A'];

  const handleKonamiPress = (key: string) => {
    sound.playHover();
    const nextInput = [...cheatInput, key].slice(-10);
    setCheatInput(nextInput);

    if (
      nextInput.length === 10 &&
      nextInput.every((val, idx) => val === konamiPattern[idx])
    ) {
      sound.playVictory();
      launchPixelConfetti();
      setCheatUnlocked(true);
      addScore(99999);
      for (let i = 0; i < 20; i++) {
        addCoin();
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '20px', color: 'var(--color-gold)', marginBottom: '6px' }}>
          STAGE 6-1: AIRSHIP WORKSHOP // CONFIGURATION & SETTINGS
        </h2>
        <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-secondary)' }}>
          FINE-TUNE VIDEO COLOR PALETTES, AUDIO SYNTHESIZERS, AND ARCADE CONTROLS
        </p>
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Left: Theme Selector */}
        <NESCard title="COLOR PALETTE SWITCHER" badge="THEME CONTEXT" variant="primary">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)' }}>
              Select an authentic retro hardware color profile. Theme settings apply across the entire application and persist in local storage.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {themes.map(t => {
                const isActive = theme === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setTheme(t.id as ThemeId)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: isActive ? 'var(--bg-card-alt)' : '#10111a',
                      border: `2px solid ${isActive ? 'var(--color-gold)' : 'var(--border-subtle)'}`,
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'border-color 0.1s ease',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isActive && <span className="blink" style={{ color: 'var(--color-gold)' }}>►</span>}
                        <strong style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--text-primary)' }}>
                          {t.name}
                        </strong>
                      </div>
                      <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '17px', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {t.tagline}
                      </div>
                    </div>

                    {/* Color Swatch Dots */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: '16px', height: '16px', backgroundColor: t.primaryColor, border: '1px solid #fff' }} />
                      <div style={{ width: '16px', height: '16px', backgroundColor: t.accentColor, border: '1px solid #fff' }} />
                      <div style={{ width: '16px', height: '16px', backgroundColor: t.bgColor, border: '1px solid #fff' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </NESCard>

        {/* Right: Audio Synthesizer Test Board */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <NESCard title="CHIPTUNE AUDIO ENGINE" badge={soundEnabled ? 'ONLINE' : 'MUTED'} variant="gold">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--text-primary)' }}>
                    MASTER AUDIO MUTE
                  </div>
                  <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '17px', color: 'var(--text-secondary)' }}>
                    Web Audio API synthesized waveforms
                  </div>
                </div>

                <NESButton
                  variant={soundEnabled ? 'green' : 'ghost'}
                  onClick={toggleSound}
                >
                  {soundEnabled ? '🔊 ENABLED' : '🔇 MUTED'}
                </NESButton>
              </div>

              {/* Sound Test Pad */}
              <div>
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--color-primary)', marginBottom: '8px' }}>
                  WAVEFORM TEST SOUND BOARD:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  <NESButton size="sm" variant="default" onClick={() => sound.playCoin()}>
                    🪙 COIN SFX
                  </NESButton>
                  <NESButton size="sm" variant="default" onClick={() => sound.playPowerup()}>
                    ⚡ POWERUP
                  </NESButton>
                  <NESButton size="sm" variant="default" onClick={() => sound.playLaser()}>
                    💥 LASER SHOT
                  </NESButton>
                  <NESButton size="sm" variant="default" onClick={() => sound.playStart()}>
                    🎮 FANFARE
                  </NESButton>
                  <NESButton size="sm" variant="default" onClick={() => sound.playVictory()}>
                    👑 VICTORY
                  </NESButton>
                  <NESButton size="sm" variant="default" onClick={() => sound.playError()}>
                    ❌ BUZZ ERROR
                  </NESButton>
                </div>
              </div>
            </div>
          </NESCard>

          {/* CRT & Display Settings */}
          <NESCard title="VIDEO & SCREEN SHADERS" variant="default">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--text-primary)' }}>
                    CRT SCANLINE & VIGNETTE
                  </div>
                  <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '17px', color: 'var(--text-secondary)' }}>
                    Simulates 1980s phosphor tube monitor
                  </div>
                </div>

                <NESButton
                  variant={crtEnabled ? 'accent' : 'ghost'}
                  onClick={toggleCrt}
                >
                  {crtEnabled ? '📺 ACTIVE' : 'OFF'}
                </NESButton>
              </div>

              {/* Text Speed */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--text-primary)' }}>
                    DIALOGUE TEXT SPEED
                  </div>
                  <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '17px', color: 'var(--text-secondary)' }}>
                    Speed of NPC typewriter text
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['slow', 'normal', 'fast'] as const).map(spd => (
                    <button
                      key={spd}
                      onClick={() => setTextSpeed(spd)}
                      className="nes-btn"
                      style={{
                        padding: '4px 8px',
                        fontSize: '9px',
                        backgroundColor: textSpeed === spd ? 'var(--color-gold)' : 'var(--bg-card-alt)',
                        color: textSpeed === spd ? '#111' : 'var(--text-primary)',
                      }}
                    >
                      {spd.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </NESCard>

          {/* Secret Konami Code Easter Egg */}
          <NESCard title="SECRET CHEAT CONSOLE" variant="gold">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)' }}>
                INPUT THE LEGENDARY KONAMI CODE FOR INFINITE LIVES & GLORY:
              </p>

              {cheatUnlocked ? (
                <div style={{ padding: '12px', backgroundColor: 'rgba(0, 200, 0, 0.2)', border: '2px solid var(--color-green)' }}>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '12px', color: 'var(--color-green)' }}>
                    🌟 GOD MODE ACTIVATED: +99,999 SCORE & 99 COINS UNLOCKED!
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {['UP', 'DOWN', 'LEFT', 'RIGHT', 'B', 'A'].map(btn => (
                      <NESButton
                        key={btn}
                        size="sm"
                        variant="default"
                        onClick={() => handleKonamiPress(btn)}
                      >
                        {btn}
                      </NESButton>
                    ))}
                  </div>

                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--text-dim)', marginTop: '4px' }}>
                    CURRENT BUFFER: [{cheatInput.join(' ')}]
                  </div>
                </>
              )}
            </div>
          </NESCard>
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NESButton size="sm" variant="ghost" onClick={() => setCurrentStage('contact')}>
          ← PREV: CONTACT
        </NESButton>
        <NESButton size="sm" variant="gold" onClick={() => setCurrentStage('start')}>
          RETURN TO START SCREEN ★
        </NESButton>
      </div>
    </div>
  );
};
