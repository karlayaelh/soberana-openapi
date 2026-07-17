import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(
    () => document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('atlas-theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="focusable surface-sunken grid place-items-center w-9 h-9 hover:scale-105 active:scale-95"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
