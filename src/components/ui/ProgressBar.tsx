import React from 'react';

type ProgressVariant = 'primary' | 'accent' | 'success' | 'warning' | 'danger';
type ProgressSize = 'sm' | 'md';

interface ProgressBarProps {
  value: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showLabel?: boolean;
  className?: string;
  label?: string;
}

const trackClasses: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

const fillClasses: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  accent:  'bg-accent',
  success: 'bg-emerald-500',
  warning: 'bg-amber-400',
  danger:  'bg-red-500',
};

const labelColorClasses: Record<ProgressVariant, string> = {
  primary: 'text-primary',
  accent:  'text-primary',
  success: 'text-emerald-700',
  warning: 'text-amber-700',
  danger:  'text-red-700',
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className = '',
  label,
}) => {
  const clamped = clamp(value, 0, 100);
  const percentage = Math.round(clamped);

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="font-body text-sm font-medium text-primary/70">
              {label}
            </span>
          )}
          {showLabel && (
            <span
              className={[
                'font-body text-sm font-semibold ml-auto',
                labelColorClasses[variant],
              ].join(' ')}
            >
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `${percentage}% completo`}
        className={[
          'w-full rounded-full bg-surface overflow-hidden border border-border/50',
          trackClasses[size],
        ].join(' ')}
      >
        <div
          className={[
            'h-full rounded-full',
            'transition-[width] duration-500 ease-in-out',
            fillClasses[variant],
          ].join(' ')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
