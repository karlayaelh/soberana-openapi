/** Small formatting helpers. */

const MONTHS_ES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
];

/** "14 feb 2026" */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
}

/** Relative-ish label like "hace 3 días" / "hoy". */
export function relativeDays(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  const days = Math.round((now.getTime() - then.getTime()) / 86_400_000);
  if (days === 0) return 'hoy';
  if (days === 1) return 'ayer';
  if (days > 1 && days < 30) return `hace ${days} días`;
  if (days < 0 && days > -30) return `en ${Math.abs(days)} días`;
  return formatDate(iso);
}

export function clampPct(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n * 100)));
}
