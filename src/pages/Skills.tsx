import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import type { SkillItem } from '../types';
import { NESCard } from '../components/common/NESCard';
import { NESButton } from '../components/common/NESButton';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

export const Skills: React.FC = () => {
  const { addScore, setCurrentStage } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(
    () => SKILL_CATEGORIES[0].skills.find(skill => skill.usedIn.length > 0) ?? SKILL_CATEGORIES[0].skills[0]
  );

  const filteredCategories = selectedCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(cat => cat.id === selectedCategory);

  const handleSelectSkill = (skill: SkillItem) => {
    setActiveSkill(skill);
    sound.playHover();
  };

  const handleCastSpell = (_skill: SkillItem) => {
    sound.playLaser();
    addScore(100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Stage Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '20px', color: 'var(--color-gold)', marginBottom: '6px' }}>
            STAGE 2-1: SPELLBOOK & TECH TREE // SKILLS
          </h2>
          <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-secondary)' }}>
            MY TECHNICAL TOOLKIT, AND WHERE I HAVE USED IT
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', ...SKILL_CATEGORIES.map(cat => cat.id)].map(catId => (
            <button
              key={catId}
              onClick={() => {
                sound.playHover();
                setSelectedCategory(catId);
              }}
              className="nes-btn"
              style={{
                fontSize: '9px',
                padding: '6px 12px',
                backgroundColor: selectedCategory === catId ? 'var(--color-gold)' : 'var(--bg-card-alt)',
                color: selectedCategory === catId ? '#111' : 'var(--text-primary)',
              }}
            >
              {selectedCategory === catId && '► '}
              {catId.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Skill Grid + Active Inspector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Left Column: Skill Category Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredCategories.map(category => (
            <NESCard
              key={category.id}
              title={`${category.icon} ${category.title.toUpperCase()}`}
              badge={`${category.skills.length} SPELLS`}
              variant="default"
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                {category.skills.map(skill => {
                  const isSelected = activeSkill.name === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => handleSelectSkill(skill)}
                      style={{
                        backgroundColor: isSelected ? 'var(--bg-card-alt)' : '#10111a',
                        border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                        boxShadow: isSelected ? '0 0 10px rgba(216,40,0,0.5)' : 'none',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        transition: 'all 0.1s ease',
                      }}
                    >
                      <strong style={{ fontFamily: 'var(--font-retro)', fontSize: '12px', color: isSelected ? 'var(--color-gold)' : 'var(--text-primary)' }}>
                        {skill.name}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </NESCard>
          ))}
        </div>

        {/* Right Column: Active Skill Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <NESCard
            title="SPELL INSPECTOR"
            variant="primary"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>✨</span>
                <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: 'var(--text-primary)' }}>
                  {activeSkill.name}
                </h3>
              </div>

              {/* Where this skill was used */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card-alt)',
                  border: '2px dashed var(--color-green)',
                  padding: '12px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--color-green)', marginBottom: '6px' }}>
                  EQUIPPED ON THESE QUESTS:
                </div>
                {activeSkill.usedIn.length > 0 ? (
                  activeSkill.usedIn.map(quest => (
                    <div key={quest} style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-primary)' }}>
                      ▶ {quest}
                    </div>
                  ))
                ) : (
                  <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-primary)' }}>
                    Part of my wider toolkit. Ask me about it!
                  </div>
                )}
              </div>

              {/* Action */}
              <NESButton
                variant="gold"
                fullWidth
                soundType="laser"
                onClick={() => handleCastSpell(activeSkill)}
              >
                💥 CAST SPELL (+100 PTS)
              </NESButton>
            </div>
          </NESCard>

          {/* Quick Stage Next CTA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <NESButton size="sm" variant="ghost" onClick={() => setCurrentStage('about')}>
              ← PREV: ABOUT ME
            </NESButton>
            <NESButton size="sm" variant="primary" onClick={() => setCurrentStage('experience')}>
              NEXT: QUEST LOG →
            </NESButton>
          </div>
        </div>
      </div>
    </div>
  );
};
