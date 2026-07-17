interface RingProps {
  /** 0–1 */
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
}

/** A clean SVG progress ring. */
export function Ring({
  value,
  size = 132,
  stroke = 10,
  color = 'var(--color-accent)',
  trackColor = 'var(--bg-sunken)',
  label,
  sublabel,
}: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  const offset = c * (1 - clamped);

  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            {label && <div className="text-2xl font-semibold tracking-tight">{label}</div>}
            {sublabel && <div className="text-xs text-faint mt-0.5">{sublabel}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
