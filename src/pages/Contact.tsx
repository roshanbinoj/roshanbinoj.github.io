import React, { useState } from 'react';
import { NESCard } from '../components/common/NESCard';
import { NESButton } from '../components/common/NESButton';
import { NESBadge } from '../components/common/NESBadge';
import { useTheme } from '../context/ThemeContext';
import { sound } from '../utils/audio';
import { launchPixelConfetti } from '../utils/confetti';
import { CONTACT } from '../data/portfolioData';
import type { ContactMessage } from '../types';

const PURPOSE_LABELS: Record<ContactMessage['questCategory'], string> = {
  hire: 'Job or internship opportunity',
  freelance: 'Freelance or contract work',
  quest: 'Project collaboration',
  greeting: 'Saying hello',
};

export const Contact: React.FC = () => {
  const { addScore, setCurrentStage } = useTheme();

  const [formData, setFormData] = useState<ContactMessage>({
    adventurerName: '',
    pigeonEmail: '',
    questCategory: 'hire',
    scrollMessage: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactMessage, string>>>({});
  const [transmitting, setTransmitting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  const mailtoHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    `${PURPOSE_LABELS[formData.questCategory]} - ${formData.adventurerName.trim()}`
  )}&body=${encodeURIComponent(`${formData.scrollMessage.trim()}\n\nFrom: ${formData.adventurerName.trim()} (${formData.pigeonEmail.trim()})`)}`;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactMessage, string>> = {};

    if (!formData.adventurerName.trim()) {
      errs.adventurerName = 'ADVENTURER NAME CANNOT BE BLANK!';
    } else if (formData.adventurerName.trim().length < 2) {
      errs.adventurerName = 'NAME TOO SHORT (MIN 2 CHARS)';
    }

    if (!formData.pigeonEmail.trim()) {
      errs.pigeonEmail = 'PIGEON EMAIL ADDRESS REQUIRED!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.pigeonEmail.trim())) {
      errs.pigeonEmail = 'INVALID TRANSMISSION FREQUENCY (CHECK EMAIL FORMAT)';
    }

    if (!formData.scrollMessage.trim()) {
      errs.scrollMessage = 'MESSAGE SCROLL CANNOT BE EMPTY!';
    } else if (formData.scrollMessage.trim().length < 10) {
      errs.scrollMessage = 'MESSAGE TOO BRIEF (MIN 10 CHARS)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      sound.playError();
      return;
    }

    // Short 8-bit animation before handing the message to the visitor's email app
    sound.playLaser();
    setTransmitting(true);
    setProgress(10);
    setStatusMessage('ROLLING UP YOUR SCROLL...');

    setTimeout(() => {
      setProgress(40);
      setStatusMessage('ADDRESSING IT TO ROSHAN...');
      sound.playHover();
    }, 600);

    setTimeout(() => {
      setProgress(75);
      setStatusMessage('PACKING THE PIGEON...');
      sound.playHover();
    }, 1200);

    setTimeout(() => {
      setProgress(100);
      setStatusMessage('READY TO SEND!');
      setTransmitting(false);
      setSentSuccess(true);
      sound.playVictory();
      launchPixelConfetti();
      addScore(1000);
    }, 1900);
  };

  const handleReset = () => {
    sound.playSelect();
    setSentSuccess(false);
    setProgress(0);
    setFormData({
      adventurerName: '',
      pigeonEmail: '',
      questCategory: 'hire',
      scrollMessage: '',
    });
    setErrors({});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '20px', color: 'var(--color-gold)', marginBottom: '6px' }}>
          STAGE 5-1: BEACON CITADEL // CONTACT
        </h2>
        <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '20px', color: 'var(--text-secondary)' }}>
          SEND A MESSAGE TO ROSHAN BINOJ
        </p>
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Left: Contact Form Terminal */}
        <NESCard
          title="TRANSMISSION CONSOLE"
          badge="RADIO ONLINE"
          variant="primary"
        >
          {sentSuccess ? (
            <div
              style={{
                textAlign: 'center',
                padding: '24px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '48px' }}>📡✨</div>
              <h3
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '15px',
                  color: 'var(--color-gold)',
                  letterSpacing: '1px',
                }}
              >
                ONE LAST STEP!
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-terminal)',
                  fontSize: '20px',
                  color: 'var(--text-primary)',
                  maxWidth: '420px',
                }}
              >
                Your message is ready, <strong>{formData.adventurerName}</strong>. It hasn't been sent yet: open it in
                your email app and press send to reach Roshan.
              </p>
              <NESBadge variant="green">+1,000 EXP REWARD CLAIMED!</NESBadge>

              <a href={mailtoHref} style={{ marginTop: '12px' }}>
                <NESButton variant="gold" soundType="start">
                  ✉️ OPEN IN EMAIL APP
                </NESButton>
              </a>

              <NESButton variant="ghost" size="sm" onClick={handleReset}>
                WRITE A NEW MESSAGE
              </NESButton>
            </div>
          ) : transmitting ? (
            <div
              style={{
                textAlign: 'center',
                padding: '36px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div className="blink-fast" style={{ fontSize: '36px' }}>
                📶
              </div>
              <h4 style={{ fontFamily: 'var(--font-pixel)', fontSize: '13px', color: 'var(--color-primary)' }}>
                {statusMessage}
              </h4>

              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  height: '18px',
                  backgroundColor: '#0a0a10',
                  border: '3px solid var(--border-color)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-gold)',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--text-secondary)' }}>
                {progress}% COMPLETE
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
              {/* Adventurer Name */}
              <div>
                <label
                  htmlFor="adventurerName"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '10px',
                    color: 'var(--color-gold)',
                    marginBottom: '6px',
                  }}
                >
                  ADVENTURER / GUILD NAME: *
                </label>
                <input
                  id="adventurerName"
                  type="text"
                  placeholder="e.g. Jane Doe, Tech Recruiter"
                  value={formData.adventurerName}
                  onChange={e => setFormData({ ...formData, adventurerName: e.target.value })}
                  className="nes-input"
                />
                {errors.adventurerName && (
                  <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-pixel)', fontSize: '9px', marginTop: '4px' }}>
                    ⚠ {errors.adventurerName}
                  </div>
                )}
              </div>

              {/* Pigeon Email */}
              <div>
                <label
                  htmlFor="pigeonEmail"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '10px',
                    color: 'var(--color-gold)',
                    marginBottom: '6px',
                  }}
                >
                  PIGEON RETURN EMAIL: *
                </label>
                <input
                  id="pigeonEmail"
                  type="email"
                  placeholder="e.g. you@company.com"
                  value={formData.pigeonEmail}
                  onChange={e => setFormData({ ...formData, pigeonEmail: e.target.value })}
                  className="nes-input"
                />
                {errors.pigeonEmail && (
                  <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-pixel)', fontSize: '9px', marginTop: '4px' }}>
                    ⚠ {errors.pigeonEmail}
                  </div>
                )}
              </div>

              {/* Quest Category */}
              <div>
                <label
                  htmlFor="questCategory"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '10px',
                    color: 'var(--color-gold)',
                    marginBottom: '6px',
                  }}
                >
                  TRANSMISSION PURPOSE:
                </label>
                <select
                  id="questCategory"
                  value={formData.questCategory}
                  onChange={e => setFormData({ ...formData, questCategory: e.target.value as ContactMessage['questCategory'] })}
                  className="nes-select"
                >
                  <option value="hire">JOB / INTERNSHIP OPPORTUNITY</option>
                  <option value="freelance">FREELANCE / CONTRACT FORGE</option>
                  <option value="quest">PROJECT COLLABORATION</option>
                  <option value="greeting">FRIENDLY ADVENTURER GREETING</option>
                </select>
              </div>

              {/* Scroll Message */}
              <div>
                <label
                  htmlFor="scrollMessage"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '10px',
                    color: 'var(--color-gold)',
                    marginBottom: '6px',
                  }}
                >
                  SCROLL MESSAGE: *
                </label>
                <textarea
                  id="scrollMessage"
                  rows={4}
                  placeholder="Describe your quest, project parameters, or questions..."
                  value={formData.scrollMessage}
                  onChange={e => setFormData({ ...formData, scrollMessage: e.target.value })}
                  className="nes-textarea"
                />
                {errors.scrollMessage && (
                  <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-pixel)', fontSize: '9px', marginTop: '4px' }}>
                    ⚠ {errors.scrollMessage}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <NESButton variant="gold" fullWidth size="lg" type="submit" soundType="start">
                ⚡ PREPARE SCROLL (+1,000 PTS)
              </NESButton>
            </form>
          )}
        </NESCard>

        {/* Right: Direct Channels & Social Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <NESCard title="DIRECT FREQUENCIES" variant="gold">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'DIRECT EMAIL', value: CONTACT.email, icon: '✉️', link: `mailto:${CONTACT.email}` },
                { label: 'GITHUB VAULT', value: CONTACT.github.replace('https://', ''), icon: '🐙', link: CONTACT.github },
                { label: 'LINKEDIN NETWORK', value: CONTACT.linkedin.replace('https://www.', ''), icon: '💼', link: CONTACT.linkedin },
              ].map(ch => (
                <a
                  key={ch.label}
                  href={ch.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-card-alt)',
                    padding: '10px 14px',
                    border: '2px solid var(--border-subtle)',
                    transition: 'transform 0.1s ease',
                  }}
                  onMouseEnter={() => sound.playHover()}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{ch.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--color-primary)' }}>
                        {ch.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-terminal)', fontSize: '18px', color: 'var(--text-primary)' }}>
                        {ch.value}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--color-gold)' }}>
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </NESCard>

          <NESCard title="BASE OF OPERATIONS" variant="default">
            <p style={{ fontFamily: 'var(--font-terminal)', fontSize: '19px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              ✦ Based in {CONTACT.location}.
              <br />
              ✦ B.Tech at IIIT Kottayam, finishing April 2027.
              <br />
              ✦ Focused on full-stack development, AI, and systems.
            </p>
          </NESCard>

          {/* Navigation Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <NESButton size="sm" variant="ghost" onClick={() => setCurrentStage('projects')}>
              ← PREV: PROJECTS
            </NESButton>
            <NESButton size="sm" variant="primary" onClick={() => setCurrentStage('settings')}>
              NEXT: SETTINGS CONFIG →
            </NESButton>
          </div>
        </div>
      </div>
    </div>
  );
};
