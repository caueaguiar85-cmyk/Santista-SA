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

const trackHeight: Record<ProgressSize, number> = {
  sm: 4,
  md: 6,
};

const fillColors: Record<ProgressVariant, string> = {
  primary: 'var(--t-text)',
  accent:  'var(--t-accent)',
  success: '#10B981',
  warning: '#F59E0B',
  danger:  '#EF4444',
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
            <span className="font-body text-sm font-medium" style={{ color: 'var(--t-text-sec)' }}>
              {label}
            </span>
          )}
          {showLabel && (
            <span
              className="font-body text-sm font-semibold ml-auto"
              style={{ color: fillColors[variant] }}
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
        className="w-full rounded-full overflow-hidden"
        style={{ height: trackHeight[size], background: 'var(--t-border)' }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-in-out"
          style={{ width: `${clamped}%`, background: fillColors[variant] }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
