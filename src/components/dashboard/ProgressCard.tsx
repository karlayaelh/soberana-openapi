import { Gauge } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Ring } from '@/components/ui/Ring';
import { atlas, atlasProgress } from '@/lib/atlas';
import { clampPct } from '@/lib/format';

export function ProgressCard({ index = 0 }: { index?: number }) {
  const progress = atlasProgress();
  const chapters = atlas.meta.chapters;

  return (
    <Card title="Atlas Progress" icon={<Gauge size={15} />} index={index}>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Ring value={progress} label={`${clampPct(progress)}%`} sublabel="completo" />

        <div className="flex-1 w-full flex flex-col gap-2.5">
          {chapters.map((c) => (
            <div key={c.id} className="flex items-center gap-3">
              <div className="w-6 text-xs text-faint tabular-nums text-right">{c.numeral}</div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="truncate">{c.title}</span>
                  <span className="text-faint tabular-nums">{clampPct(c.completeness)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--bg-sunken)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent)]"
                    style={{
                      width: `${clampPct(c.completeness)}%`,
                      transition: 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
