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

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default:  { background: 'var(--t-surface-alt)', color: 'var(--t-text-sec)', border: '1px solid var(--t-border)' },
  success:  { background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' },
  warning:  { background: 'rgba(245,158,11,0.1)', color: '#D97706', border: '1px solid rgba(245,158,11,0.2)' },
  danger:   { background: 'rgba(239,68,68,0.1)',  color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' },
  info:     { background: 'rgba(59,130,246,0.1)',  color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' },
  accent:   { background: 'var(--t-accent-soft)',  color: 'var(--t-accent)', border: '1px solid transparent' },
  'pilar-1': { background: 'rgba(59,130,246,0.1)',  color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' },
  'pilar-2': { background: 'rgba(139,92,246,0.1)',  color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.2)' },
  'pilar-3': { background: 'rgba(16,185,129,0.1)',  color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' },
  'pilar-4': { background: 'rgba(245,158,11,0.1)',  color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' },
  'pilar-5': { background: 'rgba(239,68,68,0.1)',   color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' },
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
        'transition-colors duration-200',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
};

export default Badge;
