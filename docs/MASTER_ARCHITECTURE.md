# Atlas Karla — Master Architecture Document (v1.0)

> Documento de visión. Define el destino; el código en `src/` implementa los
> incrementos hacia él. La v0.1 entrega el **modelo de datos** y el
> **dashboard ejecutivo**.

## Project Vision

Atlas Karla is a living astrocartography and life-navigation system. Its purpose
is **not** to generate astrological readings. Its purpose is to become a
longitudinal decision-support system integrating:

- Natal Astrology
- Astrocartography
- Relocation Charts
- Planetary Transits
- Personal Evidence
- Historical Timeline
- Symbolic Activations
- Executive Dashboard

The Atlas behaves as a **knowledge repository** rather than a static document.

## Core Philosophy

The Atlas separates facts from interpretation. Every piece of information
belongs to one of four categories:

1. Observation
2. Hypothesis
3. Evidence
4. Provisional Conclusion

No interpretation should overwrite observations. The system preserves historical
hypotheses, including those later discarded.

> Implementado en `src/types/knowledge.ts`.

## Data Domains

```
data/
├── natal/            relocation/        evidence/
├── astrocartography/ transits/          activations/
├── locations/        hypotheses/        timeline/
```

> Modelados en `src/types/atlas.ts`, con datos semilla en `src/data/`.

## Dashboard

The landing page behaves as an executive dashboard:

- Current Version
- Current Location
- Current Transit
- Current Chapter
- Atlas Progress
- Open Research Questions
- Latest Evidence
- Recently Updated Chapters

## Permanent Chapters

- **I — Natal Chart:** birth data, planetary table, houses, elements,
  modalities, dominants, aspects, chart geometry, life architecture.
- **II — Astrocartography:** one page per planet (meaning, AC/DC/MC/IC,
  countries, cities, evidence, notes, research).
- **III — Locations:** one page per city (nearby lines, relocation chart,
  evidence, timeline, observations, projects, people, lessons, hypotheses).
- **IV — Relocation Charts:** one page per location.
- **V — Transits:** daily / weekly / monthly / annual + transit history.
- **VI — Symbolic Activations:** countries, architecture, art, language, music,
  people, food, remote activation notes.
- **VII — Timeline:** chronological; date, location, decision, evidence,
  hypotheses modified.
- **VIII — Research:** every unresolved question (open / investigating /
  validated / rejected).

## Data Philosophy

The Atlas does not duplicate information. Every piece of information has one
source of truth. The birth date lives once; every module references it.

## Versioning

Semantic versions, each with a changelog:

- `v0.x` → Building
- `v1.x` → Stable
- `v2.x` → Expansion

## Technology

React · TypeScript · TailwindCSS · Vite. JSON as the initial datastore, with a
future migration to Supabase. Leaflet or Mapbox for interactive
astrocartography maps. Chart.js (or bespoke SVG) for analytics.

## Design Principles

Apple-like simplicity. Minimal, elegant, fast. No unnecessary animations. White
space, readable typography, dark and light mode, responsive.

## Future AI Layer

The Atlas should eventually include an AI Navigation Engine. Instead of asking
"What does Venus mean?", the user says "I am considering moving to Lisbon next
year." The AI analyses the natal chart, astrocartography, relocation, current
transits, past evidence, timeline, previous similar decisions and current
hypotheses, then generates a strategic report.

## Project Principle

The Atlas is not a horoscope. It is a continuously evolving knowledge system
designed to support long-term navigation, reflection and strategic
decision-making.
