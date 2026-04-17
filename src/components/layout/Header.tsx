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
      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-surface-3 border border-border text-text-secondary hover:text-text transition-colors duration-150"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-border">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-text tracking-tight font-heading leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-text-secondary">
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
