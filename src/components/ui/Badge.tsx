import { CATEGORY_META, STATUS_META } from '@/types/knowledge';
import type { KnowledgeCategory, ResearchStatus } from '@/types/knowledge';

export function CategoryBadge({ category }: { category: KnowledgeCategory }) {
  const m = CATEGORY_META[category];
  return (
    <span
      className="pill"
      style={{ color: m.color, borderColor: m.color, background: `${m.color}14` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
      {m.label}
    </span>
  );
}

export function StatusBadge({ status }: { status: ResearchStatus }) {
  const m = STATUS_META[status];
  return (
    <span className="pill" style={{ color: m.color, borderColor: `${m.color}66` }}>
      {m.label}
    </span>
  );
}

export function Dot({ color }: { color: string }) {
  return <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />;
}
