import React from 'react';
import type { ReactNode } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      className="inline-flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-105"
      style={{
        background: 'var(--t-surface-alt)',
        border: '1px solid var(--t-border)',
        color: 'var(--t-text-sec)',
      }}
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="flex items-center justify-between gap-4 pb-6 mb-6" style={{ borderBottom: '1px solid var(--t-border)' }}>
      <div className="min-w-0">
        <h1
          className="text-2xl font-bold leading-tight truncate tracking-tight"
          style={{ color: 'var(--t-text)', fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm font-normal" style={{ color: 'var(--t-text-sec)' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="shrink-0 flex items-center gap-3">
        {actions}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
