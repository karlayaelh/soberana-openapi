import { X } from 'lucide-react';
import { LAYERS, LAYER_MAP } from '@/lib/layers';
import type { LayerId, PlaceLayers } from '@/lib/layers';
import { LayerIcon } from './LayerIcon';
import { CategoryBadge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/format';
import type { KnowledgeCategory } from '@/types/knowledge';

interface PlacePanelProps {
  place: PlaceLayers;
  activeLayers: Set<LayerId>;
  activeCategories: Set<KnowledgeCategory>;
  onClose: () => void;
}

export function PlacePanel({ place, activeLayers, activeCategories, onClose }: PlacePanelProps) {
  const { location, items } = place;

  const visible = items.filter(
    (i) => activeLayers.has(i.layer) && (!i.category || activeCategories.has(i.category)),
  );

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-[380px] z-[1000] animate-in">
      <div className="surface h-full rounded-none sm:rounded-l-2xl sm:m-0 flex flex-col overflow-hidden border-l">
        {/* Header */}
        <div className="p-5 border-b">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{location.city}</h2>
              <p className="text-sm text-muted">{location.country}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="focusable surface-sunken grid place-items-center w-8 h-8 shrink-0"
            >
              <X size={15} />
            </button>
          </div>
          <div className="text-xs text-faint tabular-nums mt-1">
            {location.lat.toFixed(3)}, {location.lon.toFixed(3)}
          </div>

          {/* Layer chips with counts */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {LAYERS.map((l) => {
              const n = place.counts[l.id];
              const on = activeLayers.has(l.id);
              return (
                <span
                  key={l.id}
                  className="pill"
                  style={{
                    color: on ? l.color : 'var(--text-faint)',
                    borderColor: on ? `${l.color}66` : 'var(--border)',
                    opacity: n === 0 ? 0.4 : 1,
                  }}
                >
                  <LayerIcon name={l.icon} size={12} />
                  {l.label} {n > 0 && <span className="tabular-nums">{n}</span>}
                </span>
              );
            })}
          </div>
        </div>

        {/* Items grouped by layer */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
          {LAYERS.filter((l) => activeLayers.has(l.id)).map((l) => {
            const layerItems = visible.filter((i) => i.layer === l.id);
            if (layerItems.length === 0) return null;
            return <LayerGroup key={l.id} layer={l.id} items={layerItems} />;
          })}

          {visible.length === 0 && (
            <p className="text-sm text-muted">
              No hay elementos visibles con los filtros actuales.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function LayerGroup({ layer, items }: { layer: LayerId; items: PlaceLayers['items'] }) {
  const meta = LAYER_MAP[layer];
  return (
    <section>
      <div className="flex items-center gap-2 mb-2.5">
        <span
          className="grid place-items-center w-6 h-6 rounded-lg"
          style={{ background: `${meta.color}1f`, color: meta.color }}
        >
          <LayerIcon name={meta.icon} size={13} />
        </span>
        <h3 className="text-sm font-semibold tracking-tight">{meta.label}</h3>
        <span className="text-xs text-faint tabular-nums ml-auto">{items.length}</span>
      </div>
      <ul className="flex flex-col gap-2 pl-1">
        {items.map((i, idx) => (
          <li key={idx} className="surface-sunken p-3">
            <p className="text-sm leading-snug">{i.text}</p>
            <div className="flex items-center gap-2 mt-1.5">
              {i.category && <CategoryBadge category={i.category} />}
              {i.date && <span className="text-[11px] text-faint">{formatDate(i.date)}</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
