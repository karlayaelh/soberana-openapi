import type { ComponentType, ReactNode } from 'react';
import { GitBranch, MapPin, Orbit, BookOpen } from 'lucide-react';
import { atlas, currentChapter, currentLocation, headlineTransit } from '@/lib/atlas';
import { PLANET_GLYPH, PLANET_NAME, ASPECT_GLYPH } from '@/lib/glyphs';

interface StatProps {
  icon: ComponentType<{ size?: number | string }>;
  label: string;
  value: ReactNode;
  detail?: string;
  index: number;
}

function Stat({ icon: Icon, label, value, detail, index }: StatProps) {
  return (
    <div
      className="surface p-4 animate-in flex flex-col gap-2"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-2 text-faint">
        <Icon size={14} />
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-lg font-semibold tracking-tight leading-snug">{value}</div>
      {detail && <div className="text-xs text-muted truncate">{detail}</div>}
    </div>
  );
}

export function StatusStrip() {
  const loc = currentLocation();
  const chapter = currentChapter();
  const transit = headlineTransit();

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      <Stat
        index={0}
        icon={GitBranch}
        label="Current Version"
        value={`v${atlas.meta.version}`}
        detail={`Phase: ${atlas.meta.phase}`}
      />
      <Stat
        index={1}
        icon={MapPin}
        label="Current Location"
        value={loc ? loc.city : '—'}
        detail={loc ? loc.country : undefined}
      />
      <Stat
        index={2}
        icon={Orbit}
        label="Current Transit"
        value={
          transit ? (
            <span>
              {PLANET_GLYPH[transit.transiting]} {PLANET_NAME[transit.transiting]}{' '}
              <span className="text-muted">{ASPECT_GLYPH[transit.aspect]}</span>{' '}
              {PLANET_GLYPH[transit.natalPlanet]}
            </span>
          ) : (
            '—'
          )
        }
        detail={transit ? `${transit.scope} · activo` : 'sin tránsitos activos'}
      />
      <Stat
        index={3}
        icon={BookOpen}
        label="Current Chapter"
        value={chapter ? `${chapter.numeral}. ${chapter.title}` : '—'}
        detail={chapter ? `${Math.round(chapter.completeness * 100)}% completo` : undefined}
      />
    </div>
  );
}
