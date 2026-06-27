import { Hammer } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CATEGORY_META } from '@/types/knowledge';
import type { NavItem } from '@/components/Sidebar';

/**
 * Placeholder for chapters not yet built. Phase A delivered the data model +
 * Dashboard; these pages are the next increments. The page still reflects the
 * Atlas philosophy so it never feels empty.
 */
export function ChapterPlaceholder({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <header className="flex items-center gap-3 animate-in">
        <div className="grid place-items-center w-11 h-11 rounded-2xl surface-sunken">
          <Icon size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{item.label}</h1>
          <p className="text-sm text-muted">Capítulo en construcción</p>
        </div>
      </header>

      <Card index={0}>
        <div className="flex items-start gap-3">
          <Hammer size={18} className="text-faint mt-0.5 shrink-0" />
          <div>
            <p className="text-sm leading-relaxed">
              El modelo de datos para esta sección ya existe y está tipado. La vista
              se construirá en el siguiente incremento, leyendo de la misma fuente de
              verdad que alimenta el Dashboard.
            </p>
            <p className="text-sm text-muted leading-relaxed mt-3">
              Todo lo que se registre aquí se clasificará en una de las cuatro
              categorías epistémicas del Atlas:
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {Object.values(CATEGORY_META).map((m) => (
                <span
                  key={m.label}
                  className="pill"
                  style={{ color: m.color, borderColor: `${m.color}66` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
