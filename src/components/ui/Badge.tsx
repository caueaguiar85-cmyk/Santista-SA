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
  success:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning:  'bg-amber-50 text-amber-700 border border-amber-200',
  danger:   'bg-red-50 text-red-700 border border-red-200',
  info:     'bg-sky-50 text-sky-700 border border-sky-200',
  accent:   'bg-accent/15 text-primary border border-accent/30',
  'pilar-1': 'bg-violet-50 text-violet-700 border border-violet-200',
  'pilar-2': 'bg-blue-50 text-blue-700 border border-blue-200',
  'pilar-3': 'bg-teal-50 text-teal-700 border border-teal-200',
  'pilar-4': 'bg-orange-50 text-orange-700 border border-orange-200',
  'pilar-5': 'bg-pink-50 text-pink-700 border border-pink-200',
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
