import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { OVERWORLD_NODES } from '../../data/portfolioData';
import type { OverworldNode, PageId } from '../../types';
import { NESButton } from '../common/NESButton';
import { NESCard } from '../common/NESCard';
import { sound } from '../../utils/audio';

export const WorldMap: React.FC = () => {
  const { currentStage, setCurrentStage, addScore } = useTheme();
  const [selectedNode, setSelectedNode] = useState<OverworldNode>(() => {
    return OVERWORLD_NODES.find(n => n.id === currentStage) || OVERWORLD_NODES[0];
  });

  const handleNodeClick = (node: OverworldNode) => {
    setSelectedNode(node);
    sound.playPowerup();
    addScore(50);
  };

  const handleTravel = (stageId: PageId) => {
    sound.playStart();
    setCurrentStage(stageId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Map Header */}
      <NESCard
        title="OVERWORLD REALM MAP - SELECT DESTINATION"
        badge="WARP SYSTEM ONLINE"
        variant="gold"
      >
        <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)' }}>
          Click any realm node to inspect the sector, or press <strong>WARP</strong> to immediately enter the stage. 
          Use your controller or mouse to explore the developer's quest archipelago.
        </p>
      </NESCard>

      {/* Interactive Map Visual */}
      <div
        className="pixel-box"
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          backgroundColor: '#0c1526', // Deep ocean retro blue
          backgroundImage: `
            radial-gradient(#1a2b4c 15%, transparent 16%),
            radial-gradient(#1a2b4c 15%, transparent 16%)
          `,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
          overflow: 'hidden',
          border: '4px solid var(--border-color)',
        }}
      >
        {/* Ocean waves / retro grid animation */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px)',
          }}
        />

        {/* SVG Path lines connecting the nodes */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {OVERWORLD_NODES.map((node, i) => {
            if (i === 0) return null;
            const prev = OVERWORLD_NODES[i - 1];
            return (
              <g key={`path-${i}`}>
                {/* Outer shadow line */}
                <line
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke="#000000"
                  strokeWidth="6"
                  strokeDasharray="8 6"
                />
                {/* Yellow pixel road */}
                <line
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke="#fcb000"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                />
              </g>
            );
          })}
        </svg>

        {/* Decorative Map Island Terrain Shapes */}
        <div
          style={{
            position: 'absolute',
            left: '8%',
            top: '55%',
            width: '110px',
            height: '80px',
            backgroundColor: '#1b4d2e',
            border: '3px solid #388e3c',
            boxShadow: '4px 4px 0 #072212',
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '40%',
            top: '50%',
            width: '130px',
            height: '90px',
            backgroundColor: '#1b4d2e',
            border: '3px solid #388e3c',
            boxShadow: '4px 4px 0 #072212',
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '70%',
            top: '40%',
            width: '150px',
            height: '100px',
            backgroundColor: '#4a2511',
            border: '3px solid #8d5027',
            boxShadow: '4px 4px 0 #1b0a04',
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        />

        {/* Overworld Stage Nodes */}
        {OVERWORLD_NODES.map(node => {
          const isSelected = selectedNode.id === node.id;
          const isCurrent = currentStage === node.id;

          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node)}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: isSelected ? 30 : 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Player Sprite walking marker if on this node */}
              {(isCurrent || isSelected) && (
                <div
                  className="float-anim"
                  style={{
                    marginBottom: '4px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '8px',
                    padding: '2px 6px',
                    border: '2px solid #ffffff',
                    boxShadow: '2px 2px 0 #000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span className="blink">▲</span>
                  <span>{isCurrent ? 'YOU ARE HERE' : 'TARGET'}</span>
                </div>
              )}

              {/* Node Icon Token */}
              <div
                style={{
                  width: isSelected ? '44px' : '36px',
                  height: isSelected ? '44px' : '36px',
                  backgroundColor: isSelected ? 'var(--color-gold)' : 'var(--bg-card)',
                  border: `3px solid ${isSelected ? '#ffffff' : 'var(--border-color)'}`,
                  boxShadow: '3px 3px 0 #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isSelected ? '20px' : '16px',
                  transition: 'all 0.15s ease',
                }}
              >
                {node.bossIcon}
              </div>

              {/* Label Pill */}
              <div
                style={{
                  marginTop: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  color: isSelected ? 'var(--color-gold)' : 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '2px 6px',
                  fontSize: '8px',
                  fontFamily: 'var(--font-pixel)',
                  whiteSpace: 'nowrap',
                }}
              >
                {node.title}
              </div>
            </div>
          );
        })}

        {/* Retro Map Legend */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            backgroundColor: 'rgba(10, 15, 25, 0.9)',
            border: '2px solid var(--border-color)',
            padding: '6px 10px',
            fontFamily: 'var(--font-pixel)',
            fontSize: '8px',
            color: 'var(--text-secondary)',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span>🚩 Spawn</span>
          <span>🧙 Lore</span>
          <span>⚡ Magic</span>
          <span>⚔️ Quests</span>
          <span>🕹️ Arcade</span>
          <span>📡 Beacon</span>
        </div>
      </div>

      {/* Selected Node Details & Warp Action */}
      <NESCard
        title={`SECTOR: ${selectedNode.zone}`}
        badge={selectedNode.title.toUpperCase()}
        variant="primary"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '24px' }}>{selectedNode.bossIcon}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: 'var(--text-primary)' }}>
                  {selectedNode.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-secondary)' }}>
                  {selectedNode.subTitle}
                </p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-retro)', fontSize: '12px', color: 'var(--text-dim)' }}>
              Location Coordinates: X: {selectedNode.x}% | Y: {selectedNode.y}% | Status: READY FOR EXPLORATION
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <NESButton
              variant="gold"
              size="lg"
              soundType="start"
              onClick={() => handleTravel(selectedNode.id)}
            >
              WARP TO STAGE ⚡
            </NESButton>
          </div>
        </div>
      </NESCard>
    </div>
  );
};
