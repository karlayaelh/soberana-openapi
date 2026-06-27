import { Scale } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { knowledgeCounts } from '@/lib/atlas';
import { CATEGORY_META } from '@/types/knowledge';
import type { KnowledgeCategory } from '@/types/knowledge';

const ORDER: KnowledgeCategory[] = [
  'observation',
  'hypothesis',
  'evidence',
  'provisional_conclusion',
];

/**
 * The philosophical heart of the Atlas, made visible: how much of the system
 * is fact vs. interpretation. Facts (observations + evidence) should outweigh
 * interpretation (hypotheses + conclusions).
 */
export function EpistemicBalance({ index = 0 }: { index?: number }) {
  const counts = knowledgeCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const facts = counts.observation + counts.evidence;
  const factPct = Math.round((facts / total) * 100);

  return (
    <Card title="Epistemic Balance" icon={<Scale size={15} />} index={index}>
      <p className="text-xs text-muted mb-4 leading-relaxed">
        Hechos vs. interpretación. El Atlas separa lo observado de lo inferido —
        las observaciones nunca se sobrescriben.
      </p>

      {/* Stacked composition bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden mb-4">
        {ORDER.map((cat) => {
          const pct = (counts[cat] / total) * 100;
          if (pct === 0) return null;
          return (
            <div
              key={cat}
              style={{ width: `${pct}%`, background: CATEGORY_META[cat].color }}
              title={`${CATEGORY_META[cat].label}: ${counts[cat]}`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ORDER.map((cat) => (
          <div key={cat} className="surface-sunken px-3 py-2.5 flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: CATEGORY_META[cat].color }}
            />
            <div className="min-w-0">
              <div className="text-lg font-semibold leading-none tabular-nums">{counts[cat]}</div>
              <div className="text-[11px] text-faint truncate">{CATEGORY_META[cat].label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-muted">
        <span className="font-medium text-[var(--text)]">{factPct}%</span> del conocimiento es
        factual (observación + evidencia).
      </div>
    </Card>
  );
}
