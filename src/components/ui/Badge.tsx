import React from 'react';
import type { ReactNode } from 'react';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'
  | 'pilar-1'
  | 'pilar-2'
  | 'pilar-3'
  | 'pilar-4'
  | 'pilar-5';

type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  'bg-primary/10 text-primary border border-primary/20',
  success:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning:  'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  danger:   'bg-red-500/10 text-red-400 border border-red-500/20',
  info:     'bg-sky-500/10 text-sky-400 border border-sky-500/20',
  accent:   'bg-accent/15 text-accent-light border border-accent/30',
  'pilar-1': 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  'pilar-2': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  'pilar-3': 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  'pilar-4': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'pilar-5': 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
  size = 'md',
}) => {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 font-body font-medium rounded-full',
        'transition-colors duration-300',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};

export default Badge;
