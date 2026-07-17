/**
 * Atlas Karla — Domain Model
 * --------------------------
 * Structural types for the eight permanent chapters.
 *
 * SINGLE SOURCE OF TRUTH: every fact lives in exactly one place and is
 * referenced by id everywhere else. The canonical example: the birth data
 * lives once, on `Profile`. Natal, relocation and transit modules all
 * reference it — they never copy it.
 */

import type {
  Domain,
  Evidence,
  Hypothesis,
  Observation,
  ProvisionalConclusion,
  ResearchStatus,
} from './knowledge';

export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Modality = 'cardinal' | 'fixed' | 'mutable';

export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type PlanetId =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto'
  | 'chiron' | 'northNode';

/** The four astrocartography angles. */
export type Angle = 'AC' | 'DC' | 'MC' | 'IC';

/* ------------------------------------------------------------------ */
/* SINGLE SOURCE OF TRUTH                                              */
/* ------------------------------------------------------------------ */

/** The one and only home of the birth data. Everything references this. */
export interface Profile {
  name: string;
  /** ISO datetime of birth, including timezone offset. Lives ONLY here. */
  birthDateTime: string;
  birthPlace: {
    label: string;
    lat: number;
    lon: number;
    timezone: string;
  };
  /** id of the Location the user currently lives in (references locations). */
  currentLocationId: string;
}

/* ------------------------------------------------------------------ */
/* CHAPTER I — NATAL                                                   */
/* ------------------------------------------------------------------ */

export interface PlanetPosition {
  planet: PlanetId;
  sign: ZodiacSign;
  /** Degrees within the sign, 0–29.99. */
  degree: number;
  house: number; // 1–12
  retrograde: boolean;
}

export interface HousePlacement {
  house: number; // 1–12
  sign: ZodiacSign;
  /** Degree on the cusp. */
  cusp: number;
}

export type AspectType =
  | 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';

export interface Aspect {
  a: PlanetId;
  b: PlanetId;
  type: AspectType;
  /** Orb in degrees. */
  orb: number;
}

export interface NatalChart {
  /** Derived from Profile.birthDateTime — not duplicated, referenced. */
  positions: PlanetPosition[];
  houses: HousePlacement[];
  aspects: Aspect[];
  /** Counts used by the Elements / Modalities widgets. */
  elements: Record<Element, number>;
  modalities: Record<Modality, number>;
  dominants: {
    planet?: PlanetId;
    sign?: ZodiacSign;
    element?: Element;
  };
}

/* ------------------------------------------------------------------ */
/* CHAPTER II — ASTROCARTOGRAPHY                                       */
/* ------------------------------------------------------------------ */

/** One page per planet. */
export interface AstroLine {
  planet: PlanetId;
  meaning: string;
  /** Angle → free-text meaning of that line for this planet. */
  angles: Partial<Record<Angle, string>>;
  countries: string[];
  cities: string[];
  /** Knowledge references (ids) instead of inlined text. */
  evidenceIds: string[];
  hypothesisIds: string[];
  notes?: string;
}

/* ------------------------------------------------------------------ */
/* CHAPTER III — LOCATIONS  (single source of truth for places)       */
/* ------------------------------------------------------------------ */

export interface Location {
  id: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  /** Astro lines that pass near this city, e.g. "Venus MC". */
  nearbyLines: string[];
  /** id of the relocation chart computed for this city. */
  relocationChartId?: string;
  evidenceIds: string[];
  timelineEventIds: string[];
  observations: string[];
  projectsStarted: string[];
  people: string[];
  lessons: string[];
  /** Patrimonial layer — property, assets, financial ties to this place. */
  patrimonial?: string[];
  /** Spiritual layer — practices, meaningful experiences, sense of place. */
  spiritual?: string[];
  /** Open hypotheses currently attached to this place. */
  hypothesisIds: string[];
}

/* ------------------------------------------------------------------ */
/* CHAPTER IV — RELOCATION                                             */
/* ------------------------------------------------------------------ */

export interface RelocationChart {
  id: string;
  /** References a Location — never re-stores the city's coordinates. */
  locationId: string;
  /** How the natal angles shift when relocated here. */
  angleShifts: Partial<Record<Angle, { sign: ZodiacSign; planet?: PlanetId }>>;
  notableLines: string[];
  summary: string;
}

/* ------------------------------------------------------------------ */
/* CHAPTER V — TRANSITS                                                */
/* ------------------------------------------------------------------ */

export type TransitScope = 'daily' | 'weekly' | 'monthly' | 'annual';

export interface Transit {
  id: string;
  scope: TransitScope;
  transiting: PlanetId;
  aspect: AspectType;
  natalPlanet: PlanetId;
  start: string; // ISO date
  exact?: string; // ISO date of exactness
  end: string; // ISO date
  theme: string;
  /** Whether this transit window includes "today". Computed in the lib. */
  active?: boolean;
}

/* ------------------------------------------------------------------ */
/* CHAPTER VI — SYMBOLIC ACTIVATIONS                                   */
/* ------------------------------------------------------------------ */

export type ActivationKind =
  | 'country' | 'architecture' | 'art' | 'language'
  | 'music' | 'people' | 'food';

export interface Activation {
  id: string;
  kind: ActivationKind;
  title: string;
  note: string;
  /** Optional link to the place this activation is "remote" to. */
  locationId?: string;
  date?: string;
}

/* ------------------------------------------------------------------ */
/* CHAPTER VII — TIMELINE                                              */
/* ------------------------------------------------------------------ */

export interface TimelineEvent {
  id: string;
  date: string; // ISO date
  title: string;
  /** References a Location by id. Single source of truth. */
  locationId?: string;
  decision?: string;
  evidenceIds: string[];
  /** Hypotheses created, modified or retired by this event. */
  hypothesesModified: string[];
}

/* ------------------------------------------------------------------ */
/* CHAPTER VIII — RESEARCH                                             */
/* ------------------------------------------------------------------ */

export interface ResearchQuestion {
  id: string;
  question: string;
  status: ResearchStatus;
  domain: Domain;
  /** Hypotheses spawned to answer this question. */
  hypothesisIds: string[];
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* META — versioning + chapter progress (drives the Dashboard)        */
/* ------------------------------------------------------------------ */

export interface ChapterMeta {
  id: string;
  /** Roman-numeral chapter label, e.g. "I". */
  numeral: string;
  title: string;
  /** 0–1 completeness, used by Atlas Progress. */
  completeness: number;
  updatedAt: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  notes: string[];
}

export interface AtlasMeta {
  version: string;
  phase: 'building' | 'stable' | 'expansion';
  /** id of the chapter the user is currently focused on. */
  currentChapterId: string;
  chapters: ChapterMeta[];
  changelog: ChangelogEntry[];
}

/* ------------------------------------------------------------------ */
/* The whole Atlas, as loaded into memory.                            */
/* ------------------------------------------------------------------ */

export interface Atlas {
  profile: Profile;
  meta: AtlasMeta;
  natal: NatalChart;
  astrocartography: AstroLine[];
  locations: Location[];
  relocation: RelocationChart[];
  transits: Transit[];
  activations: Activation[];
  timeline: TimelineEvent[];
  research: ResearchQuestion[];
  /** Flat pool of every knowledge item, referenced by id from above. */
  knowledge: {
    observations: Observation[];
    hypotheses: Hypothesis[];
    evidence: Evidence[];
    conclusions: ProvisionalConclusion[];
  };
}
