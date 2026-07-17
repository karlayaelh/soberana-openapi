import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { currentLocation, ageYears } from '@/lib/atlas';

export function LocationCard({ index = 0 }: { index?: number }) {
  const loc = currentLocation();

  return (
    <Card title="Current Location" icon={<MapPin size={15} />} index={index}>
      {loc ? (
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-semibold tracking-tight">{loc.city}</h3>
            <span className="text-sm text-muted">{loc.country}</span>
          </div>
          <div className="text-xs text-faint tabular-nums mt-0.5">
            {loc.lat.toFixed(2)}, {loc.lon.toFixed(2)} · capítulo de vida a los {ageYears()} años
          </div>

          <div className="mt-3">
            <div className="text-[11px] uppercase tracking-wider text-faint mb-1.5">
              Líneas cercanas
            </div>
            <div className="flex flex-wrap gap-1.5">
              {loc.nearbyLines.map((line) => (
                <span key={line} className="pill">
                  {line}
                </span>
              ))}
            </div>
          </div>

          {loc.lessons.length > 0 && (
            <div className="mt-3 surface-sunken p-3">
              <div className="text-[11px] uppercase tracking-wider text-faint mb-1">Lección</div>
              <p className="text-sm italic">“{loc.lessons[0]}”</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <Mini label="Proyectos" value={loc.projectsStarted.length} />
            <Mini label="Evidencia" value={loc.evidenceIds.length} />
            <Mini label="Hipótesis" value={loc.hypothesisIds.length} />
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Ubicación actual sin definir.</p>
      )}
    </Card>
  );
}

function Mini({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface-sunken py-2">
      <div className="text-lg font-semibold tabular-nums leading-none">{value}</div>
      <div className="text-[11px] text-faint mt-1">{label}</div>
    </div>
  );
}
