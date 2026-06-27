/**
 * GIS layer model.
 *
 * A "place" is a point on the map with several overlaid layers. The layers are
 * THEMES (what kind of thing happens here). The epistemic category
 * (observation / hypothesis / evidence / conclusion) is an ORTHOGONAL axis that
 * cuts across every layer — it is NOT a layer of its own. That distinction is
 * what keeps the Atlas a knowledge system and not just an annotated map.
 *
 * This module derives the layers for each place from the existing single
 * source of truth — it never duplicates data.
 */

import { atlas, getLocation } from '@/lib/atlas';
import type { Location } from '@/types/atlas';
import type { KnowledgeCategory } from '@/types/knowledge';

export type LayerId =
  | 'astro'
  | 'bio'
  | 'projects'
  | 'relationships'
  | 'patrimonial'
  | 'spiritual';

export interface LayerMeta {
  id: LayerId;
  label: string;
  icon: string; // lucide icon name, resolved in the component
  color: string;
}

export const LAYERS: LayerMeta[] = [
  { id: 'astro', label: 'Astrológica', icon: 'Compass', color: '#a855f7' },
  { id: 'bio', label: 'Biográfica', icon: 'CalendarClock', color: '#3b82f6' },
  { id: 'projects', label: 'Proyectos', icon: 'Rocket', color: '#f59e0b' },
  { id: 'relationships', label: 'Relaciones', icon: 'Users', color: '#ec4899' },
  { id: 'patrimonial', label: 'Patrimonial', icon: 'Landmark', color: '#10b981' },
  { id: 'spiritual', label: 'Espiritual', icon: 'Sparkles', color: '#8b5cf6' },
];

export const LAYER_MAP: Record<LayerId, LayerMeta> = Object.fromEntries(
  LAYERS.map((l) => [l.id, l]),
) as Record<LayerId, LayerMeta>;

/** A single item belonging to one layer of a place. */
export interface LayerItem {
  layer: LayerId;
  text: string;
  /** Transversal epistemic axis. Undefined = a neutral note, not yet classified. */
  category?: KnowledgeCategory;
  date?: string;
  /** id of the underlying knowledge / domain record. */
  refId?: string;
}

export interface PlaceLayers {
  location: Location;
  items: LayerItem[];
  counts: Record<LayerId, number>;
}

/** Build the layered view of one place from the canonical data. */
export function placeLayers(locationId: string): PlaceLayers | undefined {
  const location = getLocation(locationId);
  if (!location) return undefined;

  const items: LayerItem[] = [];

  // Astrológica — lines (facts) + hypotheses (interpretation) + conclusions.
  for (const line of location.nearbyLines) {
    items.push({ layer: 'astro', text: `Línea ${line}`, category: 'observation' });
  }
  for (const id of location.hypothesisIds) {
    const h = atlas.knowledge.hypotheses.find((x) => x.id === id);
    if (h) items.push({ layer: 'astro', text: h.statement, category: 'hypothesis', refId: h.id });
  }
  for (const c of atlas.knowledge.conclusions) {
    if (c.domain === 'locations' && c.basedOn.some((b) => location.observations.includes(b))) {
      items.push({ layer: 'astro', text: c.statement, category: 'provisional_conclusion', refId: c.id });
    }
  }

  // Biográfica — timeline events (facts) + lived evidence.
  for (const ev of atlas.timeline.filter((t) => t.locationId === locationId)) {
    items.push({ layer: 'bio', text: ev.title, category: 'observation', date: ev.date, refId: ev.id });
  }
  for (const id of location.evidenceIds) {
    const e = atlas.knowledge.evidence.find((x) => x.id === id);
    if (e) items.push({ layer: 'bio', text: e.description, category: 'evidence', date: e.date, refId: e.id });
  }

  // Proyectos.
  for (const p of location.projectsStarted) {
    items.push({ layer: 'projects', text: p, category: 'observation' });
  }

  // Relaciones.
  for (const person of location.people) {
    items.push({ layer: 'relationships', text: person, category: 'observation' });
  }

  // Patrimonial.
  for (const asset of location.patrimonial ?? []) {
    items.push({ layer: 'patrimonial', text: asset, category: 'observation' });
  }

  // Espiritual — practices + symbolic activations (neutral, not yet classified).
  for (const s of location.spiritual ?? []) {
    items.push({ layer: 'spiritual', text: s });
  }
  for (const a of atlas.activations.filter((x) => x.locationId === locationId)) {
    items.push({ layer: 'spiritual', text: `${a.title} — ${a.note}`, date: a.date, refId: a.id });
  }

  const counts = LAYERS.reduce(
    (acc, l) => ({ ...acc, [l.id]: items.filter((i) => i.layer === l.id).length }),
    {} as Record<LayerId, number>,
  );

  return { location, items, counts };
}

export function allPlaceLayers(): PlaceLayers[] {
  return atlas.locations
    .map((l) => placeLayers(l.id))
    .filter((p): p is PlaceLayers => Boolean(p));
}
