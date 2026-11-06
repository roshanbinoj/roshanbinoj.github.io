import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ThemeId, ThemeConfig, PageId } from '../types';
import { THEMES } from './themeData';
import { sound } from '../utils/audio';

export interface ThemeContextType {
  theme: ThemeId;
  currentThemeConfig: ThemeConfig;
  setTheme: (theme: ThemeId) => void;
  themes: ThemeConfig[];
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  crtEnabled: boolean;
  setCrtEnabled: (enabled: boolean) => void;
  toggleCrt: () => void;
  score: number;
  addScore: (pts: number) => void;
  coins: number;
  addCoin: () => void;
  currentStage: PageId;
  setCurrentStage: (stage: PageId) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  textSpeed: 'slow' | 'normal' | 'fast';
  setTextSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nes_theme');
      if (saved && THEMES.some(t => t.id === saved)) return saved as ThemeId;
    }
    return 'nes';
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nes_sound');
      if (saved !== null) return saved === 'true';
    }
    return true;
  });

  // Always starts off on page load; the toggle only lasts for the current visit
  const [crtEnabled, setCrtEnabledState] = useState<boolean>(false);

  const [score, setScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nes_score');
      if (saved) return parseInt(saved, 10);
    }
    return 13370;
  });

  const [coins, setCoins] = useState<number>(42);
  const [currentStage, setCurrentStageState] = useState<PageId>('start');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [textSpeed, setTextSpeedState] = useState<'slow' | 'normal' | 'fast'>('normal');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nes_theme', theme);
  }, [theme]);

  useEffect(() => {
    sound.setEnabled(soundEnabled);
    localStorage.setItem('nes_sound', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('nes_score', String(score));
  }, [score]);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    sound.playPowerup();
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabledState(next);
    if (next) sound.playCoin();
  };

  const setCrtEnabled = (enabled: boolean) => {
    setCrtEnabledState(enabled);
  };

  const toggleCrt = () => {
    setCrtEnabledState(prev => !prev);
    sound.playLaser();
  };

  const addScore = (pts: number) => {
    setScore(prev => prev + pts);
  };

  const addCoin = () => {
    setCoins(prev => prev + 1);
    addScore(100);
    sound.playCoin();
  };

  const setCurrentStage = (stage: PageId) => {
    setCurrentStageState(stage);
    sound.playSelect();
  };

  const setTextSpeed = (speed: 'slow' | 'normal' | 'fast') => {
    setTextSpeedState(speed);
    sound.playHover();
  };

  const currentThemeConfig = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        currentThemeConfig,
        setTheme,
        themes: THEMES,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        crtEnabled,
        setCrtEnabled,
        toggleCrt,
        score,
        addScore,
        coins,
        addCoin,
        currentStage,
        setCurrentStage,
        isPaused,
        setIsPaused,
        textSpeed,
        setTextSpeed,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
