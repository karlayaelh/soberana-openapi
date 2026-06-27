import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar, NAV } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Dashboard } from '@/pages/Dashboard';
import { ChapterPlaceholder } from '@/pages/ChapterPlaceholder';
import { atlas } from '@/lib/atlas';

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [mobileNav, setMobileNav] = useState(false);

  const activeItem = NAV.find((n) => n.id === active) ?? NAV[0];

  return (
    <div className="flex min-h-screen">
      <Sidebar active={active} onNavigate={setActive} version={atlas.meta.version} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[var(--bg)]/70 border-b">
          <div className="flex items-center gap-3 px-5 lg:px-8 h-14">
            <button
              type="button"
              className="lg:hidden focusable surface-sunken grid place-items-center w-9 h-9"
              onClick={() => setMobileNav((v) => !v)}
              aria-label="Menú"
            >
              <Menu size={16} />
            </button>
            <div className="text-sm font-medium lg:hidden">Atlas Karla</div>
            <div className="ml-auto flex items-center gap-2">
              <span className="pill hidden sm:inline-flex">
                {atlas.meta.phase} · v{atlas.meta.version}
              </span>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile nav drawer */}
          {mobileNav && (
            <nav className="lg:hidden border-t px-3 py-2 grid grid-cols-2 gap-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActive(item.id);
                      setMobileNav(false);
                    }}
                    className={`focusable flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-left
                      ${item.id === active ? 'bg-[var(--bg-sunken)] font-medium' : 'text-muted'}`}
                  >
                    <Icon size={15} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        <main className="flex-1 px-5 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
          {active === 'dashboard' ? (
            <Dashboard />
          ) : (
            <ChapterPlaceholder item={activeItem} />
          )}
        </main>
      </div>
    </div>
  );
}
