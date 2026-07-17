import { Orbit } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { atlas } from '@/lib/atlas';
import { ELEMENT_META, SIGN_GLYPH, SIGN_NAME, PLANET_GLYPH, PLANET_NAME } from '@/lib/glyphs';
import type { Element, Modality } from '@/types/atlas';

const ELEMENTS: Element[] = ['fire', 'earth', 'air', 'water'];
const MODALITIES: Modality[] = ['cardinal', 'fixed', 'mutable'];

export function NatalSnapshot({ index = 0 }: { index?: number }) {
  const { natal } = atlas;
  const sun = natal.positions.find((p) => p.planet === 'sun');
  const moon = natal.positions.find((p) => p.planet === 'moon');
  const asc = natal.houses.find((h) => h.house === 1);
  const totalEl = ELEMENTS.reduce((a, e) => a + natal.elements[e], 0) || 1;
  const totalMod = MODALITIES.reduce((a, m) => a + natal.modalities[m], 0) || 1;

  return (
    <Card title="Natal Snapshot" icon={<Orbit size={15} />} index={index}>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <BigSign label="Sol" glyph={sun ? SIGN_GLYPH[sun.sign] : '—'} name={sun ? SIGN_NAME[sun.sign] : ''} />
        <BigSign label="Luna" glyph={moon ? SIGN_GLYPH[moon.sign] : '—'} name={moon ? SIGN_NAME[moon.sign] : ''} />
        <BigSign label="Asc" glyph={asc ? SIGN_GLYPH[asc.sign] : '—'} name={asc ? SIGN_NAME[asc.sign] : ''} />
      </div>

      <div className="text-[11px] uppercase tracking-wider text-faint mb-2">Elementos</div>
      <div className="flex flex-col gap-2 mb-4">
        {ELEMENTS.map((e) => (
          <div key={e} className="flex items-center gap-2">
            <span className="w-12 text-xs text-muted">{ELEMENT_META[e].label}</span>
            <div className="flex-1 h-2 rounded-full bg-[var(--bg-sunken)] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(natal.elements[e] / totalEl) * 100}%`,
                  background: ELEMENT_META[e].color,
                  transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            </div>
            <span className="text-xs tabular-nums text-faint w-4 text-right">{natal.elements[e]}</span>
          </div>
        ))}
      </div>

      <div className="text-[11px] uppercase tracking-wider text-faint mb-2">Modalidades</div>
      <div className="grid grid-cols-3 gap-2">
        {MODALITIES.map((m) => (
          <div key={m} className="surface-sunken py-2 text-center">
            <div className="text-base font-semibold tabular-nums leading-none">
              {Math.round((natal.modalities[m] / totalMod) * 100)}%
            </div>
            <div className="text-[11px] text-faint capitalize mt-1">{m}</div>
          </div>
        ))}
      </div>

      {natal.dominants.planet && (
        <div className="mt-4 text-xs text-muted">
          Dominante:{' '}
          <span className="text-[var(--text)] font-medium">
            {PLANET_GLYPH[natal.dominants.planet]} {PLANET_NAME[natal.dominants.planet]}
          </span>
        </div>
      )}
    </Card>
  );
}

function BigSign({ label, glyph, name }: { label: string; glyph: string; name: string }) {
  return (
    <div className="surface-sunken py-3 text-center">
      <div className="text-2xl leading-none">{glyph}</div>
      <div className="text-xs mt-1.5">{name}</div>
      <div className="text-[11px] text-faint">{label}</div>
    </div>
  );
}
