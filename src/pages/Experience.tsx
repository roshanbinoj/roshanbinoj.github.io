import React, { useState } from 'react';
import { EXPERIENCE_QUESTS } from '../data/portfolioData';
import { NESCard } from '../components/common/NESCard';
import { NESButton } from '../components/common/NESButton';
import { NESBadge } from '../components/common/NESBadge';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';

export const Experience: React.FC = () => {
  const { addScore, setCurrentStage } = useTheme();
  const [claimedQuests, setClaimedQuests] = useState<Record<string, boolean>>({});

  const handleClaimReward = (stage: string) => {
    if (claimedQuests[stage]) return;
    sound.playVictory();
    setClaimedQuests(prev => ({ ...prev, [stage]: true }));
    addScore(500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '20px', color: 'var(--color-gold)', marginBottom: '6px' }}>
            STAGE 3-1: QUEST LOG // WORK HISTORY
          </h2>
          <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-secondary)' }}>
            WORK HISTORY & KEY WINS
          </p>
        </div>

        <NESBadge variant="gold">
          {EXPERIENCE_QUESTS.length} {EXPERIENCE_QUESTS.length === 1 ? 'QUEST' : 'QUESTS'} CLEARED
        </NESBadge>
      </div>

      {/* Quest Log Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {EXPERIENCE_QUESTS.map(quest => {
          const isClaimed = !!claimedQuests[quest.stage];

          return (
            <NESCard
              key={quest.stage}
              title={quest.stage}
              badge={quest.levelTitle.toUpperCase()}
              variant="default"
              headerAction={
                <NESButton
                  size="sm"
                  variant={isClaimed ? 'ghost' : 'green'}
                  disabled={isClaimed}
                  onClick={() => handleClaimReward(quest.stage)}
                >
                  {isClaimed ? '✓ LOOT CLAIMED' : '🎁 CLAIM EXP (+500)'}
                </NESButton>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Role and Guild */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '24px' }}>{quest.icon}</span>
                      <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '15px', color: 'var(--text-primary)' }}>
                        {quest.role}
                      </h3>
                    </div>
                    <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--color-gold)', marginTop: '4px' }}>
                      GUILD: <strong>{quest.guild}</strong> • {quest.location}
                    </div>
                  </div>

                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--text-dim)', textAlign: 'right' }}>
                    {quest.period}
                  </div>
                </div>

                {/* Boss Defeated Callout */}
                <div
                  style={{
                    backgroundColor: 'rgba(216, 40, 0, 0.12)',
                    border: '2px solid var(--color-primary)',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>💀</span>
                  <div>
                    <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--color-primary)', display: 'block' }}>
                      RAID BOSS DEFEATED:
                    </span>
                    <strong style={{ fontFamily: 'var(--font-retro)', fontSize: '11px', color: 'var(--text-primary)' }}>
                      {quest.bossDefeated}
                    </strong>
                  </div>
                </div>

                {/* Quest Accomplishments */}
                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    KEY CAMPAIGN ACHIEVEMENTS:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {quest.questLog.map((logItem, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontFamily: 'var(--font-terminal)',
                          fontSize: '19px',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <span style={{ color: 'var(--color-green)' }}>▶</span>
                        <span>{logItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Loot Dropped (Tech stack) */}
                <div>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--text-dim)', marginBottom: '6px' }}>
                    LOOT DROPPED / TECHNOLOGIES FORGED:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {quest.inventoryLoot.map(item => (
                      <span
                        key={item}
                        style={{
                          backgroundColor: 'var(--bg-card-alt)',
                          border: '1px solid var(--border-subtle)',
                          padding: '3px 8px',
                          fontFamily: 'var(--font-pixel)',
                          fontSize: '9px',
                          color: 'var(--color-gold)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </NESCard>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NESButton size="sm" variant="ghost" onClick={() => setCurrentStage('skills')}>
          ← PREV: SKILLS
        </NESButton>
        <NESButton size="sm" variant="primary" onClick={() => setCurrentStage('projects')}>
          NEXT: PROJECTS ARCADE →
        </NESButton>
      </div>
    </div>
  );
};
