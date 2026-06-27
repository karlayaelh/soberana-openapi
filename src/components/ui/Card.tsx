import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
  /** Stagger index for the entrance animation. */
  index?: number;
}

export function Card({ title, icon, action, className = '', children, index = 0 }: CardProps) {
  return (
    <section
      className={`surface p-5 animate-in ${className}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {(title || action) && (
        <header className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            {icon && <span className="text-muted">{icon}</span>}
            {title}
          </h2>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
