/**
 * Atlas data-access layer.
 *
 * Loads the JSON datastore into a single typed `Atlas` object and exposes
 * resolvers that honour the "single source of truth" rule: nothing here
 * duplicates data — it dereferences ids.
 *
 * When the Atlas migrates from JSON to Supabase, only this file changes.
 */

import type {
  Atlas,
  AtlasMeta,
  ChapterMeta,
  Location,
  NatalChart,
  Profile,
  Transit,
} from '@/types/atlas';
import type {
  Evidence,
  Hypothesis,
  KnowledgeItem,
} from '@/types/knowledge';

import profile from '@/data/profile.json';
import meta from '@/data/meta.json';
import natal from '@/data/natal.json';
import astrocartography from '@/data/astrocartography.json';
import locations from '@/data/locations.json';
import relocation from '@/data/relocation.json';
import transits from '@/data/transits.json';
import activations from '@/data/activations.json';
import timeline from '@/data/timeline.json';
import research from '@/data/research.json';
import knowledge from '@/data/knowledge.json';

export const atlas: Atlas = {
  profile: profile as Profile,
  meta: meta as AtlasMeta,
  natal: natal as NatalChart,
  astrocartography: astrocartography as Atlas['astrocartography'],
  locations: locations as Location[],
  relocation: relocation as Atlas['relocation'],
  transits: transits as Transit[],
  activations: activations as Atlas['activations'],
  timeline: timeline as Atlas['timeline'],
  research: research as Atlas['research'],
  knowledge: knowledge as Atlas['knowledge'],
};

/* ------------------------------------------------------------------ */
/* Reference resolvers — single source of truth in action.            */
/* ------------------------------------------------------------------ */

export function getLocation(id: string | undefined): Location | undefined {
  if (!id) return undefined;
  return atlas.locations.find((l) => l.id === id);
}

export function allKnowledge(): KnowledgeItem[] {
  const k = atlas.knowledge;
  return [...k.observations, ...k.hypotheses, ...k.evidence, ...k.conclusions];
}

export function getKnowledge(id: string): KnowledgeItem | undefined {
  return allKnowledge().find((k) => k.id === id);
}

export function getEvidence(id: string): Evidence | undefined {
  return atlas.knowledge.evidence.find((e) => e.id === id);
}

export function getHypothesis(id: string): Hypothesis | undefined {
  return atlas.knowledge.hypotheses.find((h) => h.id === id);
}

/* ------------------------------------------------------------------ */
/* Derived values for the Dashboard.                                  */
/* ------------------------------------------------------------------ */

function toDate(s: string): number {
  return new Date(s).getTime();
}

/** Today, overridable for deterministic demos/tests. */
export function today(): Date {
  return new Date();
}

/** Transits whose window contains `now`, sorted by exactness. */
export function activeTransits(now: Date = today()): Transit[] {
  const t = now.getTime();
  return atlas.transits
    .filter((tr) => toDate(tr.start) <= t && t <= toDate(tr.end))
    .map((tr) => ({ ...tr, active: true }))
    .sort((a, b) => scopeWeight(a.scope) - scopeWeight(b.scope));
}

/** Upcoming transits (start in the future), nearest first. */
export function upcomingTransits(now: Date = today()): Transit[] {
  const t = now.getTime();
  return atlas.transits
    .filter((tr) => toDate(tr.start) > t)
    .sort((a, b) => toDate(a.start) - toDate(b.start));
}

function scopeWeight(scope: Transit['scope']): number {
  return { daily: 0, weekly: 1, monthly: 2, annual: 3 }[scope];
}

/** The single most defining active transit (longest-range active one). */
export function headlineTransit(now: Date = today()): Transit | undefined {
  const active = activeTransits(now);
  if (active.length === 0) return undefined;
  // Prefer the widest scope that is active — it sets the chapter's tone.
  return [...active].sort((a, b) => scopeWeight(b.scope) - scopeWeight(a.scope))[0];
}

/** Overall Atlas completeness, the mean of chapter completeness. */
export function atlasProgress(): number {
  const cs = atlas.meta.chapters;
  if (cs.length === 0) return 0;
  return cs.reduce((acc, c) => acc + c.completeness, 0) / cs.length;
}

export function currentChapter(): ChapterMeta | undefined {
  return atlas.meta.chapters.find((c) => c.id === atlas.meta.currentChapterId);
}

export function currentLocation(): Location | undefined {
  return getLocation(atlas.profile.currentLocationId);
}

/** Research questions that still need work, most-recent first. */
export function openResearch() {
  return atlas.research
    .filter((r) => r.status === 'open' || r.status === 'investigating')
    .sort((a, b) => toDate(b.updatedAt) - toDate(a.updatedAt));
}

/** Latest evidence, most recent first. */
export function latestEvidence(limit = 5): Evidence[] {
  return [...atlas.knowledge.evidence]
    .sort((a, b) => toDate(b.date) - toDate(a.date))
    .slice(0, limit);
}

/** Chapters ordered by most-recently updated. */
export function recentlyUpdatedChapters(limit = 4): ChapterMeta[] {
  return [...atlas.meta.chapters]
    .sort((a, b) => toDate(b.updatedAt) - toDate(a.updatedAt))
    .slice(0, limit);
}

/** Count of each knowledge category — drives the epistemic balance widget. */
export function knowledgeCounts() {
  return {
    observation: atlas.knowledge.observations.length,
    hypothesis: atlas.knowledge.hypotheses.length,
    evidence: atlas.knowledge.evidence.length,
    provisional_conclusion: atlas.knowledge.conclusions.length,
  };
}

/** Age of the chart owner in whole years, derived from the single source. */
export function ageYears(now: Date = today()): number {
  const birth = new Date(atlas.profile.birthDateTime);
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}
