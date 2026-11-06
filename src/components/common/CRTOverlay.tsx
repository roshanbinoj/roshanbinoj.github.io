import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CRTOverlay: React.FC = () => {
  const { crtEnabled } = useTheme();

  if (!crtEnabled) return null;

  return (
    <>
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
    </>
  );
};
