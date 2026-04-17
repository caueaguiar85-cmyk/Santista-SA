import React from 'react';
import type { ReactNode } from 'react';

type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  padding?: CardPadding;
}

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

const headerPaddingClasses: Record<CardPadding, string> = {
  sm: 'px-4 pt-4 pb-3',
  md: 'px-5 pt-5 pb-4',
  lg: 'px-6 pt-6 pb-5',
};

const bodyPaddingClasses: Record<CardPadding, string> = {
  sm: 'px-4 pb-4',
  md: 'px-5 pb-5',
  lg: 'px-6 pb-6',
};

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  headerAction,
  padding = 'md',
}) => {
  const hasHeader = Boolean(title);

  return (
    <div
      className={[
        't-card t-transition',
        !hasHeader ? paddingClasses[padding] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {hasHeader ? (
        <>
          <div
            className={[
              'flex items-start justify-between gap-4',
              headerPaddingClasses[padding],
            ].join(' ')}
          >
            <div className="min-w-0 flex-1">
              <h3
                className="font-heading text-base font-semibold leading-tight truncate"
                style={{ color: 'var(--t-text)' }}
              >
                {title}
              </h3>
              {subtitle && (
                <p className="font-body text-sm mt-0.5" style={{ color: 'var(--t-text-ter)' }}>
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="shrink-0">{headerAction}</div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--t-border)' }} />

          <div className={bodyPaddingClasses[padding]}>{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;
