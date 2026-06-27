import { FlaskConical } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { openResearch, getHypothesis } from '@/lib/atlas';

export function ResearchCard({ index = 0 }: { index?: number }) {
  const questions = openResearch();

  return (
    <Card
      title="Open Research Questions"
      icon={<FlaskConical size={15} />}
      index={index}
      action={<span className="pill tabular-nums">{questions.length}</span>}
    >
      <ul className="flex flex-col divide-y divide-[var(--border)] -my-1">
        {questions.map((q) => {
          const hyp = q.hypothesisIds.map(getHypothesis).filter(Boolean);
          const avgConf =
            hyp.length > 0
              ? Math.round(
                  (hyp.reduce((a, h) => a + (h?.confidence ?? 0), 0) / hyp.length) * 100,
                )
              : null;
          return (
            <li key={q.id} className="py-3 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug">{q.question}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] text-faint capitalize">{q.domain}</span>
                  {avgConf !== null && (
                    <span className="text-[11px] text-faint">· confianza {avgConf}%</span>
                  )}
                </div>
              </div>
              <StatusBadge status={q.status} />
            </li>
          );
        })}
        {questions.length === 0 && (
          <li className="py-3 text-sm text-muted">No hay preguntas abiertas.</li>
        )}
      </ul>
    </Card>
  );
}
