import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { HUD } from './components/layout/HUD';
import { Navigation } from './components/layout/Navigation';
import { WorldMap } from './components/layout/WorldMap';
import { StartScreen } from './pages/StartScreen';
import { AboutMe } from './pages/AboutMe';
import { Skills } from './pages/Skills';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { Settings } from './pages/Settings';
import { CRTOverlay } from './components/common/CRTOverlay';
import { VisitCounter } from './components/common/VisitCounter';
import { PauseModal } from './components/modals/PauseModal';
import { sound } from './utils/audio';

const AppContent: React.FC = () => {
  const {
    currentStage,
    setCurrentStage,
    toggleSound,
    toggleCrt,
    isPaused,
    setIsPaused,
    addCoin,
  } = useTheme();

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const key = e.key.toLowerCase();

      if (e.key === '1') setCurrentStage('start');
      else if (e.key === '2') setCurrentStage('about');
      else if (e.key === '3') setCurrentStage('skills');
      else if (e.key === '4') setCurrentStage('experience');
      else if (e.key === '5') setCurrentStage('projects');
      else if (e.key === '6') setCurrentStage('contact');
      else if (e.key === '7') setCurrentStage('settings');
      else if (key === 'm') setCurrentStage('map');
      else if (key === 's') toggleSound();
      else if (key === 't') toggleCrt();
      else if (key === 'c') addCoin();
      else if (e.key === 'Escape') {
        sound.playPause();
        setIsPaused(!isPaused);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStage, setCurrentStage, toggleSound, toggleCrt, isPaused, setIsPaused, addCoin]);

  const renderStage = () => {
    switch (currentStage) {
      case 'start':
        return <StartScreen />;
      case 'about':
        return <AboutMe />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      case 'settings':
        return <Settings />;
      case 'map':
        return <WorldMap />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <div className="app-container">
      {/* Retro CRT Scanline Shader */}
      <CRTOverlay />

      {/* Retro Top Status HUD */}
      <HUD />

      {/* Main Container */}
      <div style={{ width: '100%', marginTop: '16px' }}>
        {/* Stage Controller Navigation */}
        <Navigation />

        {/* Current Active Page */}
        <main className="main-content" id="main-content">
          {renderStage()}
        </main>
      </div>

      {/* Pause Menu Modal (ESC) */}
      <PauseModal />

      {/* Retro Footer */}
      <footer
        style={{
          borderTop: '3px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
          padding: '16px 20px',
          textAlign: 'center',
          fontFamily: 'var(--font-pixel)',
          fontSize: '9px',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span>© 2026 ROSHAN BINOJ</span>
          <span>•</span>
          <span>8-BIT RETRO AESTHETIC</span>
          <span>•</span>
          <button
            onClick={() => setCurrentStage('settings')}
            style={{
              color: 'var(--color-gold)',
              textDecoration: 'underline',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
            }}
          >
            THEME SETTINGS
          </button>
        </div>
        <div style={{ color: 'var(--text-dim)' }}>
          PRESS [1-7] TO JUMP STAGES • [M] OVERWORLD MAP • [ESC] PAUSE • [S] SFX • [C] COIN
        </div>
        <VisitCounter />
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
