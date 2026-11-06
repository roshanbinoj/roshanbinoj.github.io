import React from 'react';
import type { Project } from '../../types';
import { NESButton } from '../common/NESButton';
import { NESBadge } from '../common/NESBadge';
import { sound } from '../../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const handleClose = () => {
    sound.playSelect();
    onClose();
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={handleClose}
    >
      <div
        className="pixel-box-primary"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-card)',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Cartridge Title Bar */}
        <div className="dialogue-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: project.cartridgeColor }}>🕹️</span>
            <span style={{ fontWeight: 'bold' }}>{project.title}</span>
          </div>
          <button
            onClick={handleClose}
            className="nes-btn nes-btn-primary"
            style={{ padding: '4px 8px', fontSize: '9px' }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <NESBadge variant="gold">{project.genre}</NESBadge>
              <NESBadge variant="accent">{project.period}</NESBadge>
              {project.stars && (
                <NESBadge variant="green">⭐ {project.stars} STARS</NESBadge>
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--color-gold)' }}>
              {project.badge}
            </div>
          </div>

          {/* Cartridge Art Preview Banner */}
          <div
            style={{
              backgroundColor: '#0c0d16',
              border: '3px solid var(--border-color)',
              padding: '24px 16px',
              textAlign: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>👾</div>
            <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '6px' }}>
              {project.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-retro)', fontSize: '12px', color: 'var(--text-secondary)' }}>
              {project.tagline}
            </p>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--color-gold)', marginBottom: '8px' }}>
              QUEST BRIEF & ARCHITECTURE:
            </h4>
            <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '19px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
              {project.description}
            </p>
          </div>

          {/* Key Features / Boss Mechanics */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--color-primary)', marginBottom: '8px' }}>
              BOSS MECHANICS & FEATURES:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontFamily: 'var(--font-terminal)',
                    fontSize: '18px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <span style={{ color: 'var(--color-green)' }}>▶</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Inventory */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-pixel)', fontSize: '11px', color: 'var(--text-dim)', marginBottom: '8px' }}>
              EQUIPPED ARTIFACTS / TECH STACK:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    border: '2px solid var(--border-subtle)',
                    padding: '4px 8px',
                    fontSize: '10px',
                    fontFamily: 'var(--font-pixel)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              paddingTop: '12px',
              borderTop: '2px solid var(--border-subtle)',
              flexWrap: 'wrap',
            }}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <NESButton variant="gold" fullWidth soundType="start">
                  🚀 LAUNCH DEMO
                </NESButton>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{ flex: 1, minWidth: '160px' }}
              >
                <NESButton variant="primary" fullWidth soundType="laser">
                  📜 REPOSITORY
                </NESButton>
              </a>
            )}

            <NESButton variant="default" onClick={handleClose}>
              BACK
            </NESButton>
          </div>
        </div>
      </div>
    </div>
  );
};
