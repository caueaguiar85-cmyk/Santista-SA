import React from 'react';
import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-border">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-text leading-tight truncate tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-text-muted font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="shrink-0 flex items-center gap-3">
          {actions}
        </div>
      )}
    </header>
  );
};

export default Header;
