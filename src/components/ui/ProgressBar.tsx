import React from 'react';
import clsx from 'clsx';

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

const trackHeightClasses: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-1.5',
};

const fillClasses: Record<ProgressVariant, string> = {
  primary: 'bg-text',
  accent:  'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
};

const labelClasses: Record<ProgressVariant, string> = {
  primary: 'text-text',
  accent:  'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
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
    <div className={clsx('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="font-body text-sm font-medium text-text-secondary">
              {label}
            </span>
          )}
          {showLabel && (
            <span className={clsx('font-body text-sm font-semibold ml-auto', labelClasses[variant])}>
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
        className={clsx(
          'w-full rounded-full overflow-hidden bg-surface-3 border border-border-subtle',
          trackHeightClasses[size],
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-[width] duration-500 ease-in-out',
            fillClasses[variant],
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
