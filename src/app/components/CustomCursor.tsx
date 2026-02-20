// 📁 src/app/components/CustomCursor.tsx
// Mira de francotirador que detecta el fondo y cambia de color automáticamente

import { useEffect, useRef, useState, useCallback } from 'react';

type CursorTheme = 'light' | 'dark';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const sampleRafRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [theme, setTheme] = useState<CursorTheme>('light');
  const [shooting, setShooting] = useState(false);
  const [shots, setShots] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  // ── Muestrea el pixel bajo el cursor para decidir el color ──
  const sampleBackground = useCallback(() => {
    const { x, y } = posRef.current;
    if (x < 0 || y < 0) return;

    // Busca el elemento debajo del cursor
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!el) return;

    // Sube por el DOM buscando un background no transparente
    let target: HTMLElement | null = el;
    let bgColor = '';
    while (target && target !== document.body) {
      const computed = window.getComputedStyle(target);
      const bg = computed.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        bgColor = bg;
        break;
      }
      target = target.parentElement;
    }

    if (!bgColor) {
      bgColor = window.getComputedStyle(document.body).backgroundColor;
    }

    // Parsear rgb/rgba
    const match = bgColor.match(/[\d.]+/g);
    if (!match || match.length < 3) return;
    const [r, g, b] = match.map(Number);

    // Luminancia relativa (fórmula WCAG)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Fondo claro → cursor oscuro; fondo oscuro → cursor claro
    setTheme(luminance > 0.5 ? 'dark' : 'light');

    sampleRafRef.current = requestAnimationFrame(sampleBackground);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    // Loop de posición
    const animatePosition = () => {
      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x - 28}px, ${posRef.current.y - 28}px)`;
      }
      rafRef.current = requestAnimationFrame(animatePosition);
    };

    // Disparo al hacer click
    const onMouseDown = (e: MouseEvent) => {
      setShooting(true);
      const shotId = Date.now();
      setShots(prev => [...prev, { id: shotId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setShooting(false), 280);
      setTimeout(() => setShots(prev => prev.filter(s => s.id !== shotId)), 700);
    };

    // Hover en elementos clicables
    const attachHovers = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    rafRef.current = requestAnimationFrame(animatePosition);
    sampleRafRef.current = requestAnimationFrame(sampleBackground);
    attachHovers();

    const observer = new MutationObserver(attachHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(sampleRafRef.current);
      observer.disconnect();
    };
  }, [sampleBackground]);

  // Colores según tema
  const mainColor   = theme === 'light' ? 'rgba(220,38,38,0.95)'   : 'rgba(255,255,255,0.92)';
  const accentColor = theme === 'light' ? 'rgba(220,38,38,1)'       : 'rgba(255,255,255,1)';
  const glowColor   = theme === 'light' ? 'rgba(220,38,38,0.6)'     : 'rgba(255,255,255,0.4)';

  // Tamaño: más grande en hover
  const size = isHovering ? 64 : 56;
  const cx = size / 2;

  return (
    <>
      {/* ── Mira de francotirador ── */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform"
        style={{ width: size, height: size, transition: 'width 0.15s, height 0.15s' }}
      >
        <svg
          width={size} height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: shooting
              ? `drop-shadow(0 0 10px ${glowColor}) drop-shadow(0 0 20px ${glowColor})`
              : `drop-shadow(0 0 4px ${glowColor})`,
            transition: 'filter 0.15s, all 0.2s',
          }}
        >
          {/* Anillo exterior rotatorio */}
          <circle
            cx={cx} cy={cx} r={cx - 4}
            stroke={mainColor}
            strokeWidth={shooting ? 2 : 1.2}
            strokeDasharray={shooting ? '3 3' : '5 4'}
            fill="none"
            style={{ transition: 'stroke 0.2s, stroke-width 0.1s' }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${cx} ${cx}`}
              to={`360 ${cx} ${cx}`}
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Anillo interior (estático) */}
          <circle
            cx={cx} cy={cx} r={cx * 0.38}
            stroke={mainColor}
            strokeWidth="0.8"
            fill="none"
            style={{ transition: 'stroke 0.2s' }}
          />

          {/* Punto central */}
          <circle
            cx={cx} cy={cx} r={shooting ? 3.5 : 1.8}
            fill={accentColor}
            style={{ transition: 'r 0.1s, fill 0.2s' }}
          />

          {/* Cruz — 4 líneas */}
          {/* izquierda */}
          <line x1="2" y1={cx} x2={cx * 0.55} y2={cx} stroke={mainColor} strokeWidth="1.2" style={{ transition: 'stroke 0.2s' }} />
          {/* derecha */}
          <line x1={cx * 1.45} y1={cx} x2={size - 2} y2={cx} stroke={mainColor} strokeWidth="1.2" style={{ transition: 'stroke 0.2s' }} />
          {/* arriba */}
          <line x1={cx} y1="2" x2={cx} y2={cx * 0.55} stroke={mainColor} strokeWidth="1.2" style={{ transition: 'stroke 0.2s' }} />
          {/* abajo */}
          <line x1={cx} y1={cx * 1.45} x2={cx} y2={size - 2} stroke={mainColor} strokeWidth="1.2" style={{ transition: 'stroke 0.2s' }} />

          {/* Marcas de esquina (rangefinder) */}
          {([[1, 1], [-1, 1], [1, -1], [-1, -1]] as [number, number][]).map(([dx, dy], i) => (
            <g key={i} transform={`translate(${cx + dx * (cx * 0.62)}, ${cx + dy * (cx * 0.62)})`}>
              <line x1="0" y1="0" x2={dx * 4} y2="0" stroke={mainColor} strokeWidth="1" opacity="0.55" />
              <line x1="0" y1="0" x2="0" y2={dy * 4} stroke={mainColor} strokeWidth="1" opacity="0.55" />
            </g>
          ))}
        </svg>

        {/* Label "TARGET" en hover */}
        {isHovering && (
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-[0.2em] whitespace-nowrap uppercase"
            style={{ color: accentColor, textShadow: `0 0 8px ${glowColor}`, transition: 'color 0.2s' }}
          >
            TARGET
          </div>
        )}
      </div>

      {/* ── Efectos de disparo ── */}
      {shots.map(shot => (
        <ShotEffect key={shot.id} x={shot.x} y={shot.y} theme={theme} />
      ))}
    </>
  );
}

function ShotEffect({ x, y, theme }: { x: number; y: number; theme: CursorTheme }) {
  const color = theme === 'light' ? 'rgb(220,38,38)' : 'rgba(255,255,255,0.9)';
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[99998]"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <div className="absolute rounded-full border" style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderColor: color, animation: 'shotRing 0.65s ease-out forwards' }} />
      <div className="absolute rounded-full border" style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, borderColor: color, animation: 'shotRing 0.65s ease-out 0.12s forwards', opacity: 0.5 }} />
      <div className="absolute rounded-full" style={{ width: 6, height: 6, marginLeft: -3, marginTop: -3, backgroundColor: color, animation: 'shotFlash 0.3s ease-out forwards' }} />
    </div>
  );
}