import { Compass, CalendarClock, Rocket, Users, Landmark, Sparkles } from 'lucide-react';
import type { ComponentType } from 'react';

const ICONS: Record<string, ComponentType<{ size?: number | string }>> = {
  Compass,
  CalendarClock,
  Rocket,
  Users,
  Landmark,
  Sparkles,
};

export function LayerIcon({ name, size = 15 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Compass;
  return <Icon size={size} />;
}
