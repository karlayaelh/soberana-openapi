import { StatusStrip } from '@/components/dashboard/StatusStrip';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { EpistemicBalance } from '@/components/dashboard/EpistemicBalance';
import { HeadlineTransitCard } from '@/components/dashboard/HeadlineTransitCard';
import { ResearchCard } from '@/components/dashboard/ResearchCard';
import { EvidenceCard } from '@/components/dashboard/EvidenceCard';
import { RecentChaptersCard } from '@/components/dashboard/RecentChaptersCard';
import { LocationCard } from '@/components/dashboard/LocationCard';
import { NatalSnapshot } from '@/components/dashboard/NatalSnapshot';
import { atlas } from '@/lib/atlas';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Buenas noches';
  if (h < 13) return 'Buenos días';
  if (h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

export function Dashboard() {
  const fullDate = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-3 animate-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {greeting()}, {atlas.profile.name}
          </h1>
          <p className="text-sm text-muted capitalize">{fullDate}</p>
        </div>
        <p className="text-sm text-faint max-w-sm text-right hidden md:block">
          Un sistema de navegación vital — no un horóscopo.
        </p>
      </header>

      <StatusStrip />

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <ProgressCard index={1} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <HeadlineTransitCard index={2} />
            <ResearchCard index={3} />
          </div>
          <EvidenceCard index={4} />
        </div>

        <div className="flex flex-col gap-5">
          <LocationCard index={2} />
          <EpistemicBalance index={3} />
          <NatalSnapshot index={4} />
          <RecentChaptersCard index={5} />
        </div>
      </div>
    </div>
  );
}
