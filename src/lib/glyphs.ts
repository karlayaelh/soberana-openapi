/** Astrological glyphs + display helpers. */

import type { PlanetId, ZodiacSign, AspectType, Element } from '@/types/atlas';

export const PLANET_GLYPH: Record<PlanetId, string> = {
  sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂',
  jupiter: '♃', saturn: '♄', uranus: '♅', neptune: '♆', pluto: '♇',
  chiron: '⚷', northNode: '☊',
};

export const PLANET_NAME: Record<PlanetId, string> = {
  sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
  jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune',
  pluto: 'Pluto', chiron: 'Chiron', northNode: 'North Node',
};

export const SIGN_GLYPH: Record<ZodiacSign, string> = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
  leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
  sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};

export const SIGN_NAME: Record<ZodiacSign, string> = {
  aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
  leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
  sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius',
  pisces: 'Pisces',
};

export const ASPECT_GLYPH: Record<AspectType, string> = {
  conjunction: '☌', sextile: '⚹', square: '□', trine: '△', opposition: '☍',
};

export const ELEMENT_META: Record<Element, { label: string; color: string }> = {
  fire: { label: 'Fire', color: '#ef4444' },
  earth: { label: 'Earth', color: '#a3a35b' },
  air: { label: 'Air', color: '#38bdf8' },
  water: { label: 'Water', color: '#6366f1' },
};

export function formatDegree(degree: number, sign: ZodiacSign): string {
  const d = Math.floor(degree);
  const m = Math.round((degree - d) * 60);
  return `${d}°${m.toString().padStart(2, '0')}' ${SIGN_GLYPH[sign]}`;
}

export function planetLabel(p: PlanetId): string {
  return `${PLANET_GLYPH[p]} ${PLANET_NAME[p]}`;
}
