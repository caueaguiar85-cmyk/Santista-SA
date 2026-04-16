import React from 'react';
import type { ReactNode } from 'react';

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
      className={[
        'flex items-end gap-0 border-b border-border overflow-x-auto',
        'scrollbar-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
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
            className={[
              'relative inline-flex items-center gap-2 shrink-0',
              'px-4 pb-3 pt-2',
              'font-body text-sm font-medium',
              'transition-all duration-300 ease-in-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-inset',
              'rounded-t-md',
              isActive
                ? 'text-accent'
                : 'text-primary/50 hover:text-primary hover:bg-surface/60',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {tab.icon && (
              <span
                className={[
                  'shrink-0 transition-colors duration-300',
                  isActive ? 'text-accent' : 'text-primary/40',
                ].join(' ')}
                aria-hidden="true"
              >
                {tab.icon}
              </span>
            )}

            {tab.label}

            {/* Underline indicator */}
            <span
              className={[
                'absolute bottom-0 left-0 right-0 h-0.5 rounded-full',
                'transition-all duration-300 ease-in-out',
                isActive ? 'bg-accent opacity-100' : 'bg-transparent opacity-0',
              ].join(' ')}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
