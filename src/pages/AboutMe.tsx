import React, { useState } from 'react';
import { HERO_PROFILE } from '../data/portfolioData';
import { NESCard } from '../components/common/NESCard';
import { NESButton } from '../components/common/NESButton';
import { NESBadge } from '../components/common/NESBadge';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

export const AboutMe: React.FC = () => {
  const { addScore, setCurrentStage } = useTheme();
  const [activeTab, setActiveTab] = useState<'lore' | 'education' | 'achievements'>('lore');
  const [bonusLevels, setBonusLevels] = useState<number>(0);

  const handleLevelUp = () => {
    sound.playPowerup();
    setBonusLevels(prev => prev + 1);
    addScore(250);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '20px',
              color: 'var(--color-gold)',
              marginBottom: '6px',
            }}
          >
            STAGE 1-2: HERO DOSSIER // ABOUT ME
          </h2>
          <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-secondary)' }}>
            CHARACTER PROFILE, EDUCATION & ACHIEVEMENTS
          </p>
        </div>

        <NESButton variant="green" soundType="coin" onClick={handleLevelUp}>
          ⚡ LEVEL UP (+250 PTS)
        </NESButton>
      </div>

      {/* Main Grid Layout: Character Card Left, Tabbed Lore Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Left Column: Character Sheet Card */}
        <NESCard title="STATUS SCREEN" badge={`LV. ${HERO_PROFILE.level + bonusLevels}`} variant="primary">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Avatar & Key Info */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  backgroundColor: '#0c0d16',
                  border: '3px solid var(--border-color)',
                  boxShadow: '3px 3px 0 #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  flexShrink: 0,
                }}
              >
                🧙‍♂️
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {HERO_PROFILE.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--color-gold)' }}>
                  CLASS: {HERO_PROFILE.class}
                </div>
                <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '17px', color: 'var(--text-secondary)' }}>
                  GUILD: {HERO_PROFILE.guild}
                </div>
                <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '16px', color: 'var(--text-dim)' }}>
                  REALM: {HERO_PROFILE.location}
                </div>
              </div>
            </div>

            {/* HP / MP Gauges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: '9px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--color-green)' }}>HEALTH (HP)</span>
                  <span>{HERO_PROFILE.hp}</span>
                </div>
                <div className="pixel-bar-container" style={{ width: '100%', height: '14px' }}>
                  <div className="pixel-bar-fill" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: '9px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--color-accent)' }}>MANA (MP)</span>
                  <span>{HERO_PROFILE.mp}</span>
                </div>
                <div className="pixel-bar-container" style={{ width: '100%', height: '14px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: '90%',
                      background: 'repeating-linear-gradient(90deg, var(--color-accent), var(--color-accent) 6px, #0050b0 6px, #0050b0 8px)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Real Records */}
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--color-gold)', marginBottom: '8px' }}>
                HERO RECORDS:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {HERO_PROFILE.records.map(record => (
                  <div key={record.label} style={{ backgroundColor: '#10111a', padding: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '15px', color: 'var(--text-dim)' }}>{record.label}</div>
                    <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--color-gold)' }}>{record.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Banner */}
            <div
              style={{
                backgroundColor: 'var(--bg-card-alt)',
                border: '2px dashed var(--border-subtle)',
                padding: '10px',
                fontFamily: 'var(--font-terminal)',
                fontSize: '17px',
                color: 'var(--color-gold)',
                fontStyle: 'italic',
                textAlign: 'center',
              }}
            >
              {HERO_PROFILE.tagline}
            </div>
          </div>
        </NESCard>

        {/* Right Column: Interactive Tabbed Lore & Gear */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Sub-Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'lore', label: '📜 ORIGIN LORE' },
              { id: 'education', label: '🎓 EDUCATION' },
              { id: 'achievements', label: '🏆 ACHIEVEMENTS' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playHover();
                  setActiveTab(tab.id as 'lore' | 'education' | 'achievements');
                }}
                className="nes-btn"
                style={{
                  fontSize: '9px',
                  padding: '8px 14px',
                  backgroundColor: activeTab === tab.id ? 'var(--color-accent)' : 'var(--bg-card-alt)',
                  color: activeTab === tab.id ? '#ffffff' : 'var(--text-primary)',
                }}
              >
                {activeTab === tab.id && <span className="blink">► </span>}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Lore */}
          {activeTab === 'lore' && (
            <NESCard title="ORIGIN STORY // LOG ENTRY #001" variant="default">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                  {HERO_PROFILE.bio}
                </p>

                <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  {HERO_PROFILE.bioDetail}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <NESBadge variant="gold">FULL-STACK</NESBadge>
                  <NESBadge variant="accent">AI & ML</NESBadge>
                  <NESBadge variant="green">C++ SYSTEMS</NESBadge>
                </div>
              </div>
            </NESCard>
          )}

          {/* Tab 2: Education */}
          {activeTab === 'education' && (
            <NESCard title="TRAINING GROUNDS" variant="gold">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '12px', lineHeight: '1.5', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {HERO_PROFILE.education.school}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--color-gold)' }}>
                    {HERO_PROFILE.education.degree}
                  </div>
                  <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)' }}>
                    {HERO_PROFILE.education.period} • CGPA: {HERO_PROFILE.education.cgpa}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--color-primary)', marginBottom: '8px' }}>
                    COURSEWORK:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {HERO_PROFILE.education.coursework.map(course => (
                      <span
                        key={course}
                        style={{
                          backgroundColor: 'var(--bg-card-alt)',
                          border: '1px solid var(--border-subtle)',
                          padding: '3px 8px',
                          fontFamily: 'var(--font-terminal)',
                          fontSize: '18px',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </NESCard>
          )}

          {/* Tab 3: Leadership & Achievements */}
          {activeTab === 'achievements' && (
            <NESCard title="LEADERSHIP & ACHIEVEMENTS" variant="default">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {HERO_PROFILE.achievements.map(item => (
                  <div
                    key={item.title}
                    style={{
                      backgroundColor: 'var(--bg-card-alt)',
                      padding: '10px 14px',
                      borderLeft: '4px solid var(--color-primary)',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--color-gold)', marginBottom: '4px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </NESCard>
          )}

          {/* Quick Stage Next CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <NESButton size="sm" variant="ghost" onClick={() => setCurrentStage('start')}>
              ← PREV: START
            </NESButton>
            <NESButton size="sm" variant="primary" onClick={() => setCurrentStage('skills')}>
              NEXT: SKILLS TREE →
            </NESButton>
          </div>
        </div>
      </div>
    </div>
  );
};
