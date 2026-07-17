import {
  LayoutDashboard, Orbit, Building2, MapPin, Map, Activity,
  Sparkles, FlaskConical, CalendarClock, Settings, Compass, Globe2,
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number | string }>;
}

export const NAV: NavItem[] = [
  { id: 'map', label: 'Mapa', icon: Globe2 },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'natal', label: 'Natal Chart', icon: Orbit },
  { id: 'architecture', label: 'Architecture of Life', icon: Building2 },
  { id: 'astrocartography', label: 'Astrocartography', icon: Compass },
  { id: 'locations', label: 'Locations', icon: MapPin },
  { id: 'relocation', label: 'Relocation Charts', icon: Map },
  { id: 'transits', label: 'Transits', icon: Activity },
  { id: 'activations', label: 'Symbolic Activations', icon: Sparkles },
  { id: 'evidence', label: 'Evidence', icon: FlaskConical },
  { id: 'timeline', label: 'Timeline', icon: CalendarClock },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  version: string;
}

export function Sidebar({ active, onNavigate, version }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r px-3 py-5">
      <div className="flex items-center gap-2.5 px-2 mb-7">
        <div className="grid place-items-center w-8 h-8 rounded-xl bg-[var(--color-accent)] text-white">
          <Compass size={18} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Atlas Karla</div>
          <div className="text-[11px] text-faint">v{version}</div>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 overflow-y-auto -mr-1 pr-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`focusable flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-left
                ${isActive
                  ? 'bg-[var(--bg-sunken)] font-medium text-[var(--text)]'
                  : 'text-muted hover:bg-[var(--bg-sunken)] hover:text-[var(--text)]'}`}
            >
              <Icon size={16} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-2 pt-4 text-[11px] text-faint">
        Living knowledge system · {new Date().getFullYear()}
      </div>
    </aside>
  );
}
