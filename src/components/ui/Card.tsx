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
  md: 'p-6',
  lg: 'p-8',
};

const headerPaddingClasses: Record<CardPadding, string> = {
  sm: 'px-4 pt-4 pb-3',
  md: 'px-6 pt-6 pb-4',
  lg: 'px-8 pt-8 pb-5',
};

const bodyPaddingClasses: Record<CardPadding, string> = {
  sm: 'px-4 pb-4',
  md: 'px-6 pb-6',
  lg: 'px-8 pb-8',
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
        'bg-surface-2 rounded-xl border border-border shadow-sm',
        'transition-shadow duration-300',
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
              <h3 className="font-heading text-lg font-semibold text-primary leading-tight truncate">
                {title}
              </h3>
              {subtitle && (
                <p className="font-body text-sm text-primary/60 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="shrink-0">{headerAction}</div>
            )}
          </div>

          <div className="border-t border-border" />

          <div className={bodyPaddingClasses[padding]}>{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;
