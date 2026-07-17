import { History } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { recentlyUpdatedChapters } from '@/lib/atlas';
import { relativeDays } from '@/lib/format';

export function RecentChaptersCard({ index = 0 }: { index?: number }) {
  const chapters = recentlyUpdatedChapters(5);

  return (
    <Card title="Recently Updated" icon={<History size={15} />} index={index}>
      <ul className="flex flex-col -my-1 divide-y divide-[var(--border)]">
        {chapters.map((c) => (
          <li key={c.id} className="py-2.5 flex items-center gap-3">
            <div className="grid place-items-center w-7 h-7 rounded-lg surface-sunken text-xs font-medium">
              {c.numeral}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{c.title}</div>
            </div>
            <span className="text-[11px] text-faint shrink-0">{relativeDays(c.updatedAt)}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
