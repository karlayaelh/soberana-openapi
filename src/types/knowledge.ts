/**
 * Atlas Karla — Core Knowledge Model
 * ----------------------------------
 * The Atlas separates FACTS from INTERPRETATION.
 *
 * Every piece of information in the Atlas belongs to exactly one of four
 * epistemic categories. This is the single most important rule of the system:
 *
 *   1. Observation            — a fact. Never overwritten.
 *   2. Hypothesis             — a conjecture. Has a lifecycle and is preserved
 *                               even after being discarded.
 *   3. Evidence               — something lived that supports or refutes a
 *                               hypothesis.
 *   4. Provisional Conclusion — the current best understanding. Always
 *                               revisable.
 *
 * No interpretation (hypothesis / conclusion) may overwrite an observation.
 */

export type KnowledgeCategory =
  | 'observation'
  | 'hypothesis'
  | 'evidence'
  | 'provisional_conclusion';

/** The nine data domains of the Atlas. */
export type Domain =
  | 'natal'
  | 'astrocartography'
  | 'locations'
  | 'relocation'
  | 'transits'
  | 'hypotheses'
  | 'evidence'
  | 'activations'
  | 'timeline';

/** Lifecycle of a research question / hypothesis. Nothing is ever deleted. */
export type ResearchStatus =
  | 'open'
  | 'investigating'
  | 'validated'
  | 'rejected';

export type EvidenceStrength = 'weak' | 'moderate' | 'strong';

/** Fields shared by every knowledge item, regardless of category. */
export interface KnowledgeBase {
  id: string;
  category: KnowledgeCategory;
  domain: Domain;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  tags?: string[];
}

/**
 * OBSERVATION — a fact.
 * Observations are immutable by contract: the system must never let an
 * interpretation overwrite them. Corrections are made by adding a NEW
 * observation, not by mutating the old one.
 */
export interface Observation extends KnowledgeBase {
  category: 'observation';
  statement: string;
  /** Where the fact comes from (ephemeris, birth certificate, map, etc.). */
  source: string;
  /** Observations are append-only — the UI must render them read-only. */
  immutable: true;
}

/**
 * HYPOTHESIS — a conjecture under test.
 * Preserved across its whole life, including after rejection. When a
 * hypothesis is replaced by a better one, link the new id via `supersededBy`
 * rather than deleting — the history of discarded ideas is part of the Atlas.
 */
export interface Hypothesis extends KnowledgeBase {
  category: 'hypothesis';
  question: string;
  statement: string;
  status: ResearchStatus;
  /** 0–1 subjective confidence in the hypothesis at this moment. */
  confidence: number;
  /** Observations this hypothesis tries to explain. */
  basedOnObservations: string[];
  /** If retired in favour of a newer hypothesis, points at it. */
  supersededBy?: string;
}

/**
 * EVIDENCE — something lived.
 * Evidence is anchored in time and (often) place, and it points at the
 * hypotheses it supports or refutes. Evidence never proves; it shifts
 * confidence.
 */
export interface Evidence extends KnowledgeBase {
  category: 'evidence';
  description: string;
  date: string; // ISO date the thing happened
  strength: EvidenceStrength;
  /** Single source of truth: reference a location by id, never inline it. */
  locationId?: string;
  /** Hypothesis ids this evidence supports / refutes. */
  supports: string[];
  refutes: string[];
}

/**
 * PROVISIONAL CONCLUSION — current best understanding.
 * Always revisable. Carries the evidence and hypotheses it rests on so it can
 * be re-evaluated when new evidence arrives.
 */
export interface ProvisionalConclusion extends KnowledgeBase {
  category: 'provisional_conclusion';
  statement: string;
  confidence: number; // 0–1
  /** Evidence + hypothesis ids supporting this conclusion. */
  basedOn: string[];
}

export type KnowledgeItem =
  | Observation
  | Hypothesis
  | Evidence
  | ProvisionalConclusion;

/** Human-facing labels + accent colors for each category. */
export const CATEGORY_META: Record<
  KnowledgeCategory,
  { label: string; short: string; description: string; color: string }
> = {
  observation: {
    label: 'Observation',
    short: 'Obs',
    description: 'A fact. Never overwritten.',
    color: '#3b82f6', // blue
  },
  hypothesis: {
    label: 'Hypothesis',
    short: 'Hyp',
    description: 'A conjecture under test. Preserved even when discarded.',
    color: '#a855f7', // purple
  },
  evidence: {
    label: 'Evidence',
    short: 'Ev',
    description: 'Something lived that supports or refutes a hypothesis.',
    color: '#10b981', // emerald
  },
  provisional_conclusion: {
    label: 'Provisional Conclusion',
    short: 'Concl',
    description: 'Current best understanding. Always revisable.',
    color: '#f59e0b', // amber
  },
};

export const STATUS_META: Record<
  ResearchStatus,
  { label: string; color: string }
> = {
  open: { label: 'Open', color: '#64748b' },
  investigating: { label: 'Investigating', color: '#f59e0b' },
  validated: { label: 'Validated', color: '#10b981' },
  rejected: { label: 'Rejected', color: '#ef4444' },
};
