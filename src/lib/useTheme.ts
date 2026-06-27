import { useEffect, useState } from 'react';

/** Tracks whether the `.dark` class is on <html>, reacting to live changes. */
export function useIsDark(): boolean {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  );

  useEffect(() => {
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      setDark(root.classList.contains('dark'));
    });
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return dark;
}
