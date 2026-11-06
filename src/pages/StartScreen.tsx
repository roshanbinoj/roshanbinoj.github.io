import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { NESButton } from '../components/common/NESButton';
import { NESCard } from '../components/common/NESCard';
import { HERO_PROFILE } from '../data/portfolioData';
import { launchPixelConfetti } from '../utils/confetti';
import { sound } from '../utils/audio';

export const StartScreen: React.FC = () => {
  const { setCurrentStage, addCoin, score, coins } = useTheme();
  const [selectedClass, setSelectedClass] = useState<string>('mage');

  const handlePressStart = () => {
    sound.playStart();
    launchPixelConfetti();
    setTimeout(() => {
      setCurrentStage('about');
    }, 600);
  };

  const handleOpenMap = () => {
    sound.playSelect();
    setCurrentStage('map');
  };

  const handleInsertCoin = () => {
    addCoin();
    launchPixelConfetti();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        padding: '20px 0',
      }}
    >
      {/* Retro Game Title Banner */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '850px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            padding: '4px 12px',
            fontFamily: 'var(--font-pixel)',
            fontSize: '10px',
            marginBottom: '16px',
            border: '2px solid #ffffff',
            boxShadow: '3px 3px 0 #000',
            letterSpacing: '2px',
          }}
        >
          ★ 8-BIT SINGLE PAGE APPLICATION PORTFOLIO ★
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 'clamp(20px, 4.5vw, 32px)',
            textWrap: 'balance',
            color: 'var(--color-gold)',
            lineHeight: '1.4',
            textShadow: '4px 4px 0 #000, -2px -2px 0 var(--color-primary)',
            letterSpacing: '2px',
            marginBottom: '16px',
          }}
        >
          ROSHAN BINOJ: DEV QUEST
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-terminal)',
            fontSize: '24px',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: '1.4',
          }}
        >
          {HERO_PROFILE.title} • {HERO_PROFILE.guild}
        </p>
      </div>

      {/* Main Arcade Frame */}
      <div
        className="pixel-box-primary"
        style={{
          width: '100%',
          maxWidth: '750px',
          backgroundColor: 'var(--bg-card)',
          padding: '28px 20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Animated 8-bit Character Avatar */}
        <div
          className="float-anim"
          style={{
            width: '110px',
            height: '110px',
            backgroundColor: 'var(--bg-card-alt)',
            border: '4px solid var(--border-color)',
            boxShadow: '4px 4px 0 #000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '48px' }}>
            {selectedClass === 'mage' ? '🧙‍♂️' : selectedClass === 'knight' ? '🛡️' : '🏹'}
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '-12px',
              backgroundColor: 'var(--color-gold)',
              color: '#000',
              fontFamily: 'var(--font-pixel)',
              fontSize: '8px',
              padding: '2px 6px',
              border: '2px solid #000',
            }}
          >
            LV. {HERO_PROFILE.level}
          </span>
        </div>

        {/* Character Class Select */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '10px',
              color: 'var(--text-secondary)',
              marginBottom: '10px',
            }}
          >
            CHOOSE HERO SPECIALIZATION:
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'mage', label: 'FULL-STACK MAGE', icon: '🧙‍♂️' },
              { id: 'knight', label: 'SYSTEMS GUARDIAN', icon: '🛡️' },
              { id: 'archer', label: 'AI ARCHER', icon: '🏹' },
            ].map(cls => (
              <button
                key={cls.id}
                onClick={() => {
                  sound.playHover();
                  setSelectedClass(cls.id);
                }}
                className="nes-btn"
                style={{
                  fontSize: '9px',
                  padding: '6px 12px',
                  backgroundColor: selectedClass === cls.id ? 'var(--color-primary)' : 'var(--bg-card-alt)',
                  color: selectedClass === cls.id ? '#ffffff' : 'var(--text-primary)',
                }}
              >
                {selectedClass === cls.id && <span className="blink">► </span>}
                {cls.icon} {cls.label}
              </button>
            ))}
          </div>
        </div>

        {/* Big Flashing PRESS START CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}>
          <NESButton
            variant="gold"
            size="lg"
            soundType="start"
            onClick={handlePressStart}
            style={{
              fontSize: '16px',
              padding: '16px 36px',
              letterSpacing: '2px',
            }}
          >
            <span className="blink">►</span> PRESS START [ENTER]
          </NESButton>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <NESButton
              variant="accent"
              size="md"
              soundType="select"
              onClick={handleOpenMap}
            >
              🗺️ EXPLORE OVERWORLD MAP
            </NESButton>

            <NESButton
              variant="green"
              size="md"
              soundType="coin"
              onClick={handleInsertCoin}
            >
              🪙 INSERT COIN (+100 PTS)
            </NESButton>
          </div>
        </div>

        {/* Live HUD Quick Readout */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '480px',
            borderTop: '2px solid var(--border-subtle)',
            paddingTop: '16px',
            fontFamily: 'var(--font-pixel)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
          }}
        >
          <div>SCORE: <span style={{ color: 'var(--color-gold)' }}>{score}</span></div>
          <div>COINS: <span style={{ color: 'var(--color-gold)' }}>{coins}</span></div>
          <div>STATUS: <span style={{ color: 'var(--color-green)' }}>ONLINE</span></div>
        </div>
      </div>

      {/* Stage Shortcut Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <NESCard title="QUICK JUMP: ABOUT ME" badge="LORE" variant="default">
          <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Read my background, education, and achievements.
          </p>
          <NESButton size="sm" variant="primary" onClick={() => setCurrentStage('about')}>
            ENTER ABOUT ME →
          </NESButton>
        </NESCard>

        <NESCard title="QUICK JUMP: SKILLS" badge="TECH TREE" variant="default">
          <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Inspect my languages, frameworks, AI tools, and databases, and where I have used them.
          </p>
          <NESButton size="sm" variant="accent" onClick={() => setCurrentStage('skills')}>
            INSPECT SKILLS →
          </NESButton>
        </NESCard>

        <NESCard title="QUICK JUMP: PROJECTS" badge="ARCADE" variant="default">
          <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Browse my projects as game cartridges, with live demos, write-ups, and repos.
          </p>
          <NESButton size="sm" variant="gold" onClick={() => setCurrentStage('projects')}>
            PLAY PROJECTS →
          </NESButton>
        </NESCard>
      </div>
    </div>
  );
};
