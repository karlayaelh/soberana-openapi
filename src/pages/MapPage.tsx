import { useMemo, useState } from 'react';
import { Layers, Filter, Spline } from 'lucide-react';
import { MapView } from '@/components/map/MapView';
import { PlacePanel } from '@/components/map/PlacePanel';
import { LayerIcon } from '@/components/map/LayerIcon';
import { LAYERS } from '@/lib/layers';
import type { LayerId } from '@/lib/layers';
import { allPlaceLayers } from '@/lib/layers';
import { atlas } from '@/lib/atlas';
import { useIsDark } from '@/lib/useTheme';
import { CATEGORY_META } from '@/types/knowledge';
import type { KnowledgeCategory } from '@/types/knowledge';

const ALL_LAYERS = new Set<LayerId>(LAYERS.map((l) => l.id));
const ALL_CATS = new Set<KnowledgeCategory>(
  Object.keys(CATEGORY_META) as KnowledgeCategory[],
);

export function MapPage() {
  const dark = useIsDark();
  const places = useMemo(() => allPlaceLayers(), []);

  const [activeLayers, setActiveLayers] = useState<Set<LayerId>>(new Set(ALL_LAYERS));
  const [activeCats, setActiveCats] = useState<Set<KnowledgeCategory>>(new Set(ALL_CATS));
  const [showLines, setShowLines] = useState(true);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const selected = places.find((p) => p.location.id === selectedId);

  function toggleLayer(id: LayerId) {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleCat(id: KnowledgeCategory) {
    setActiveCats((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3 animate-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mapa</h1>
          <p className="text-sm text-muted">
            GIS personal — cada lugar es un punto con capas superpuestas.
          </p>
        </div>
        <p className="text-xs text-faint hidden md:block">
          {places.length} lugares · líneas astro ilustrativas
        </p>
      </header>

      <div
        className="relative surface overflow-hidden p-0"
        style={{ height: 'calc(100vh - 11rem)', minHeight: 480 }}
      >
        <MapView
          places={places}
          dark={dark}
          activeLayers={activeLayers}
          activeCategories={activeCats}
          currentLocationId={atlas.profile.currentLocationId}
          selectedId={selectedId}
          showAstroLines={showLines}
          onSelect={setSelectedId}
        />

        {/* Control panel */}
        <div className="absolute top-4 left-4 z-[1000] w-60 surface p-4 animate-in max-h-[calc(100%-2rem)] overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={15} className="text-muted" />
            <h2 className="text-sm font-semibold tracking-tight">Capas</h2>
          </div>
          <div className="flex flex-col gap-1">
            {LAYERS.map((l) => {
              const on = activeLayers.has(l.id);
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => toggleLayer(l.id)}
                  className="focusable flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-left hover:bg-[var(--bg-sunken)]"
                >
                  <span
                    className="grid place-items-center w-6 h-6 rounded-md shrink-0"
                    style={{
                      background: on ? l.color : 'var(--bg-sunken)',
                      color: on ? '#fff' : 'var(--text-faint)',
                    }}
                  >
                    <LayerIcon name={l.icon} size={13} />
                  </span>
                  <span className={on ? '' : 'text-faint'}>{l.label}</span>
                  <span
                    className="ml-auto w-2 h-2 rounded-full"
                    style={{ background: on ? l.color : 'var(--border)' }}
                  />
                </button>
              );
            })}
          </div>

          <div className="h-px bg-[var(--border)] my-3" />

          <div className="flex items-center gap-2 mb-2">
            <Filter size={14} className="text-muted" />
            <h2 className="text-sm font-semibold tracking-tight">Evidencia</h2>
          </div>
          <p className="text-[11px] text-faint mb-2.5 leading-relaxed">
            Eje transversal: filtra por categoría epistémica en todas las capas.
          </p>
          <div className="flex flex-col gap-1">
            {(Object.keys(CATEGORY_META) as KnowledgeCategory[]).map((cat) => {
              const m = CATEGORY_META[cat];
              const on = activeCats.has(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCat(cat)}
                  className="focusable flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-left hover:bg-[var(--bg-sunken)]"
                  style={{ opacity: on ? 1 : 0.5 }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: m.color, boxShadow: on ? `0 0 0 3px ${m.color}33` : 'none' }}
                  />
                  <span className={on ? '' : 'text-faint'}>{m.label}</span>
                </button>
              );
            })}
          </div>

          <div className="h-px bg-[var(--border)] my-3" />

          <button
            type="button"
            onClick={() => setShowLines((v) => !v)}
            className="focusable flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm w-full text-left hover:bg-[var(--bg-sunken)]"
            style={{ opacity: showLines ? 1 : 0.5 }}
          >
            <Spline size={15} className="shrink-0" style={{ color: '#a855f7' }} />
            <span>Líneas astro</span>
            <span
              className="ml-auto w-2 h-2 rounded-full"
              style={{ background: showLines ? '#a855f7' : 'var(--border)' }}
            />
          </button>
        </div>

        {/* Place detail */}
        {selected && (
          <PlacePanel
            place={selected}
            activeLayers={activeLayers}
            activeCategories={activeCats}
            onClose={() => setSelectedId(undefined)}
          />
        )}
      </div>
    </div>
  );
}
