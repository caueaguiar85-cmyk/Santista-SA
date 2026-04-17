import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

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
  default:   'bg-surface-3 text-text-secondary border border-border',
  success:   'bg-success/10 text-success border border-success/20',
  warning:   'bg-warning/10 text-warning border border-warning/20',
  danger:    'bg-danger/10 text-danger border border-danger/20',
  info:      'bg-info/10 text-info border border-info/20',
  accent:    'bg-accent-soft text-accent',
  'pilar-1': 'bg-pilar-1/10 text-pilar-1 border border-pilar-1/20',
  'pilar-2': 'bg-pilar-2/10 text-pilar-2 border border-pilar-2/20',
  'pilar-3': 'bg-pilar-3/10 text-pilar-3 border border-pilar-3/20',
  'pilar-4': 'bg-pilar-4/10 text-pilar-4 border border-pilar-4/20',
  'pilar-5': 'bg-pilar-5/10 text-pilar-5 border border-pilar-5/20',
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
      className={clsx(
        'inline-flex items-center gap-1 font-body font-medium rounded-full',
        'transition-colors duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
