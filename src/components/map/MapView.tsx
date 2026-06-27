import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { PlaceLayers, LayerId } from '@/lib/layers';
import type { KnowledgeCategory } from '@/types/knowledge';

interface MapViewProps {
  places: PlaceLayers[];
  dark: boolean;
  activeLayers: Set<LayerId>;
  activeCategories: Set<KnowledgeCategory>;
  currentLocationId?: string;
  selectedId?: string;
  showAstroLines: boolean;
  onSelect: (id: string) => void;
}

const TILES = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/** Count of a place's items visible under the current filters. */
function visibleCount(
  place: PlaceLayers,
  layers: Set<LayerId>,
  cats: Set<KnowledgeCategory>,
): number {
  return place.items.filter(
    (i) => layers.has(i.layer) && (!i.category || cats.has(i.category)),
  ).length;
}

function makeIcon(opts: {
  count: number;
  current: boolean;
  selected: boolean;
  accent: string;
}): L.DivIcon {
  const base = 22;
  const size = base + Math.min(opts.count, 8) * 3;
  const ring = opts.current ? `box-shadow: 0 0 0 4px ${opts.accent}33;` : '';
  const border = opts.selected ? '#ffffff' : 'rgba(255,255,255,0.85)';
  const html = `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      background:${opts.accent};border:2px solid ${border};${ring}
      display:grid;place-items:center;color:#fff;font-weight:600;
      font-size:11px;font-family:Inter,sans-serif;
      transition:transform .15s ease;transform:scale(${opts.selected ? 1.15 : 1});
    ">${opts.count || ''}</div>`;
  return L.divIcon({
    html,
    className: 'atlas-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FitBounds({ places }: { places: PlaceLayers[] }) {
  const map = useMap();
  useEffect(() => {
    if (places.length === 0) return;
    const bounds = L.latLngBounds(
      places.map((p) => [p.location.lat, p.location.lon] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [80, 80], maxZoom: 5 });
  }, [map, places]);
  return null;
}

export function MapView({
  places,
  dark,
  activeLayers,
  activeCategories,
  currentLocationId,
  selectedId,
  showAstroLines,
  onSelect,
}: MapViewProps) {
  const accent = '#6366f1';

  const lines = useMemo(() => {
    if (!showAstroLines || !activeLayers.has('astro')) return [];
    return places.flatMap((p) =>
      p.location.nearbyLines.map((line) => ({
        id: `${p.location.id}-${line}`,
        lng: p.location.lon,
        label: `${p.location.city} · ${line}`,
      })),
    );
  }, [places, showAstroLines, activeLayers]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2}
      worldCopyJump
      className="h-full w-full"
      style={{ background: dark ? '#08080a' : '#e8e8ec' }}
    >
      <TileLayer key={dark ? 'dark' : 'light'} url={dark ? TILES.dark : TILES.light} attribution={ATTRIBUTION} />

      {/* Illustrative astrocartography meridians (approximate — not computed). */}
      {lines.map((l) => (
        <Polyline
          key={l.id}
          positions={[
            [-78, l.lng],
            [78, l.lng],
          ]}
          pathOptions={{ color: '#a855f7', weight: 1.5, opacity: 0.45, dashArray: '4 6' }}
        >
          <Tooltip sticky>{l.label} (ilustrativo)</Tooltip>
        </Polyline>
      ))}

      {places.map((p) => {
        const count = visibleCount(p, activeLayers, activeCategories);
        return (
          <Marker
            key={p.location.id}
            position={[p.location.lat, p.location.lon]}
            icon={makeIcon({
              count,
              current: p.location.id === currentLocationId,
              selected: p.location.id === selectedId,
              accent,
            })}
            eventHandlers={{ click: () => onSelect(p.location.id) }}
          >
            <Tooltip direction="top" offset={[0, -12]}>
              <span className="font-medium">{p.location.city}</span>
            </Tooltip>
          </Marker>
        );
      })}

      <FitBounds places={places} />
    </MapContainer>
  );
}
