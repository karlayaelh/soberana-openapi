import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CategoryBadge } from '@/components/ui/Badge';
import { latestEvidence, getLocation, getHypothesis } from '@/lib/atlas';
import { formatDate } from '@/lib/format';

const STRENGTH_DOTS = { weak: 1, moderate: 2, strong: 3 } as const;

export function EvidenceCard({ index = 0 }: { index?: number }) {
  const evidence = latestEvidence(4);

  return (
    <Card title="Latest Evidence" icon={<Sparkles size={15} />} index={index}>
      <ul className="flex flex-col gap-3">
        {evidence.map((e) => {
          const loc = getLocation(e.locationId);
          const links = [...e.supports, ...e.refutes].map(getHypothesis).filter(Boolean);
          return (
            <li key={e.id} className="surface-sunken p-3.5">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <CategoryBadge category="evidence" />
                <span className="text-[11px] text-faint shrink-0">{formatDate(e.date)}</span>
              </div>
              <p className="text-sm leading-snug">{e.description}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-faint">
                {loc && <span>📍 {loc.city}</span>}
                <span className="flex items-center gap-1">
                  fuerza
                  <span className="flex gap-0.5">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background:
                            n <= STRENGTH_DOTS[e.strength]
                              ? 'var(--color-accent)'
                              : 'var(--border)',
                        }}
                      />
                    ))}
                  </span>
                </span>
                {links.length > 0 && (
                  <span>
                    → {links.length} hipótesis
                    {e.refutes.length > 0 && <span className="text-red-500"> (refuta)</span>}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
