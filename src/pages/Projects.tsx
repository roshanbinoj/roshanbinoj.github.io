import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { ProjectModal } from '../components/modals/ProjectModal';
import { NESButton } from '../components/common/NESButton';
import { NESBadge } from '../components/common/NESBadge';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

export const Projects: React.FC = () => {
  const { setCurrentStage } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.genre.toLowerCase().includes(selectedFilter));

  const handleOpenModal = (project: Project) => {
    sound.playSelect();
    setActiveModalProject(project);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '20px', color: 'var(--color-gold)', marginBottom: '6px' }}>
            STAGE 4-1: CARTRIDGE ARCADE // PROJECTS
          </h2>
          <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-secondary)' }}>
            SELECT A GAME CARTRIDGE TO INSPECT THE ARCHITECTURE OR PLAY THE DEMO
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'ALL CARTRIDGES' },
            { id: 'full-stack', label: 'FULL-STACK' },
            { id: 'systems', label: 'SYSTEMS' },
            { id: 'ai', label: 'AI' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playHover();
                setSelectedFilter(tab.id);
              }}
              className="nes-btn"
              style={{
                fontSize: '9px',
                padding: '6px 12px',
                backgroundColor: selectedFilter === tab.id ? 'var(--color-gold)' : 'var(--bg-card-alt)',
                color: selectedFilter === tab.id ? '#111' : 'var(--text-primary)',
              }}
            >
              {selectedFilter === tab.id && '► '}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cartridge Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="pixel-box"
            style={{
              backgroundColor: '#1b1d2c',
              border: '3px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '6px 6px 0 #080910',
              transition: 'transform 0.15s ease',
            }}
          >
            {/* Top Cartridge Grip Ridges */}
            <div
              style={{
                height: '18px',
                backgroundColor: '#12131e',
                borderBottom: '2px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0 12px',
              }}
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ width: '12px', height: '6px', backgroundColor: '#26293d', border: '1px solid #000' }} />
              ))}
            </div>

            {/* Cartridge Sticker Frame */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Sticker Art Header */}
              <div
                style={{
                  backgroundColor: '#0c0d16',
                  border: `3px solid ${project.cartridgeColor}`,
                  padding: '12px',
                  boxShadow: 'inset 0 0 12px rgba(0,0,0,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <NESBadge variant="gold" size="sm">{project.genre}</NESBadge>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--text-dim)' }}>
                    {project.period}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '13px',
                    color: '#ffffff',
                    marginTop: '4px',
                    lineHeight: '1.4',
                  }}
                >
                  {project.title}
                </h3>
              </div>

              {/* Tagline & Specs */}
              <p
                style={{
                  fontFamily: 'var(--font-terminal)',
                  fontSize: '18px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4',
                  flex: 1,
                }}
              >
                {project.tagline}
              </p>

              {/* Tech Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.techStack.slice(0, 4).map(tech => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '8px',
                      backgroundColor: 'var(--bg-card-alt)',
                      padding: '2px 6px',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--text-dim)', alignSelf: 'center' }}>
                    +{project.techStack.length - 4} MORE
                  </span>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <NESButton
                  variant="gold"
                  size="sm"
                  fullWidth
                  soundType="select"
                  onClick={() => handleOpenModal(project)}
                >
                  📖 READ MANUAL
                </NESButton>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ flex: 1 }}
                  >
                    <NESButton variant="primary" size="sm" fullWidth soundType="start">
                      🚀 DEMO
                    </NESButton>
                  </a>
                )}
              </div>
            </div>

            {/* Bottom Gold Cartridge Pins Contact Strip */}
            <div
              style={{
                height: '14px',
                backgroundColor: '#0a0a10',
                borderTop: '2px solid #000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {[...Array(14)].map((_, i) => (
                <div key={i} style={{ width: '4px', height: '8px', backgroundColor: '#fcb000' }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NESButton size="sm" variant="ghost" onClick={() => setCurrentStage('experience')}>
          ← PREV: QUEST LOG
        </NESButton>
        <NESButton size="sm" variant="primary" onClick={() => setCurrentStage('contact')}>
          NEXT: TRANSMISSION TOWER →
        </NESButton>
      </div>
    </div>
  );
};
