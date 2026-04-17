import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  return (
    <div
      role="tablist"
      aria-label="Navegacao por abas"
      className={clsx(
        'flex items-end gap-0 overflow-x-auto scrollbar-none border-b border-border',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'relative inline-flex items-center gap-2 shrink-0',
              'px-4 pb-3 pt-2',
              'font-body text-sm font-medium',
              'transition-all duration-150',
              'focus-visible:outline-none',
              'rounded-t-md',
              isActive
                ? 'text-accent'
                : 'text-text-tertiary hover:text-text-secondary hover:bg-surface-3',
            )}
          >
            {tab.icon && (
              <span className="shrink-0" aria-hidden="true">
                {tab.icon}
              </span>
            )}

            {tab.label}

            {/* Underline indicator */}
            <span
              className={clsx(
                'absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-200',
                isActive ? 'bg-accent opacity-100' : 'bg-transparent opacity-0',
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
