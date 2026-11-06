// 8-Bit Pixel Confetti Particle System

interface PixelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  gravity: number;
}

export function launchPixelConfetti() {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.id = 'pixel-confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#d82800', '#fcb000', '#0070ec', '#00e000', '#ffffff', '#fca044'];
  const particles: PixelParticle[] = [];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.45 + (Math.random() - 0.5) * 50,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 12 - 4,
      size: Math.floor(Math.random() * 6) + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      gravity: 0.35 + Math.random() * 0.2,
    });
  }

  let animationFrameId: number;
  const startTime = Date.now();

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= 0.008;

      if (p.alpha > 0 && p.y < canvas.height) {
        activeParticles++;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        // Draw crisp pixel squares
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
      }
    });

    if (activeParticles > 0 && Date.now() - startTime < 3500) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  }

  render();
}
