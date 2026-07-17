import { Orbit, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { activeTransits, upcomingTransits, headlineTransit } from '@/lib/atlas';
import { PLANET_GLYPH, PLANET_NAME, ASPECT_GLYPH } from '@/lib/glyphs';
import { formatDate, relativeDays } from '@/lib/format';

export function HeadlineTransitCard({ index = 0 }: { index?: number }) {
  const headline = headlineTransit();
  const active = activeTransits();
  const upcoming = upcomingTransits().slice(0, 2);

  return (
    <Card title="Current Transit" icon={<Orbit size={15} />} index={index}>
      {headline ? (
        <>
          <div className="surface-sunken p-4 mb-4">
            <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <span>{PLANET_GLYPH[headline.transiting]}</span>
              <span className="text-base text-muted">{PLANET_NAME[headline.transiting]}</span>
              <span className="text-muted mx-0.5">{ASPECT_GLYPH[headline.aspect]}</span>
              <span>{PLANET_GLYPH[headline.natalPlanet]}</span>
              <span className="text-base text-muted">{PLANET_NAME[headline.natalPlanet]}</span>
              <span className="pill ml-auto capitalize">{headline.scope}</span>
            </div>
            <p className="text-sm text-muted mt-2.5 leading-relaxed">{headline.theme}</p>
            {headline.exact && (
              <p className="text-xs text-faint mt-2">
                Exacto: {formatDate(headline.exact)} · ventana hasta {formatDate(headline.end)}
              </p>
            )}
          </div>

          {active.length > 1 && (
            <div className="mb-3">
              <div className="text-[11px] uppercase tracking-wider text-faint mb-2">
                Otros activos
              </div>
              <div className="flex flex-col gap-1.5">
                {active
                  .filter((t) => t.id !== headline.id)
                  .map((t) => (
                    <div key={t.id} className="flex items-center gap-2 text-sm">
                      <span className="tabular-nums">
                        {PLANET_GLYPH[t.transiting]} {ASPECT_GLYPH[t.aspect]}{' '}
                        {PLANET_GLYPH[t.natalPlanet]}
                      </span>
                      <span className="text-faint text-xs capitalize">{t.scope}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {upcoming.length > 0 && (
            <div>
              <div className="text-[11px] uppercase tracking-wider text-faint mb-2">Próximos</div>
              <div className="flex flex-col gap-1.5">
                {upcoming.map((t) => (
                  <div key={t.id} className="flex items-center gap-2 text-sm text-muted">
                    <ArrowRight size={13} className="text-faint" />
                    <span className="tabular-nums">
                      {PLANET_GLYPH[t.transiting]} {ASPECT_GLYPH[t.aspect]}{' '}
                      {PLANET_GLYPH[t.natalPlanet]}
                    </span>
                    <span className="text-faint text-xs ml-auto">{relativeDays(t.start)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-muted">Sin tránsitos activos en este momento.</p>
      )}
    </Card>
  );
}
