import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Lightbulb,
  Map,
  Settings,
} from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/projeto',        icon: LayoutDashboard, label: 'Projeto'        },
  { to: '/entrevistas',   icon: Users,            label: 'Entrevistas'   },
  { to: '/diagnostico',   icon: BarChart3,        label: 'Diagnostico'   },
  { to: '/insights',      icon: Lightbulb,        label: 'Insights'      },
  { to: '/roadmap',       icon: Map,              label: 'Roadmap'       },
  { to: '/configuracoes', icon: Settings,         label: 'Configuracoes' },
];

const Sidebar: React.FC = () => {
  const project = useProjectStore((s) => s.project);
  const completion = project?.completionPercent ?? 0;

  return (
    <aside className="bg-surface-2 border-r border-border w-64 fixed top-0 left-0 h-screen flex flex-col z-40 transition-colors duration-200">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center font-heading font-bold text-white text-sm">
            S
          </div>
          <div className="leading-tight">
            <p className="font-heading text-[15px] font-bold text-text">
              Santista S.A.
            </p>
            <p className="text-[11px] font-medium text-text-tertiary">
              Stoken Advisory
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-border" />

      {/* Nav label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">
          Menu
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-accent-soft text-accent font-semibold'
                  : 'text-text-secondary hover:text-text hover:bg-surface-3',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className={clsx(
                    'shrink-0',
                    isActive ? 'text-accent' : 'text-text-tertiary',
                  )}
                  aria-hidden="true"
                />
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Progress */}
      <div className="px-4 py-4">
        <div className="bg-surface-3 border border-border rounded-xl p-4 transition-colors duration-200">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold text-text-secondary">
              Progresso do Projeto
            </span>
            <span className="text-[11px] font-bold tabular-nums text-accent">
              {completion}%
            </span>
          </div>

          <div
            className="w-full h-1.5 rounded-full overflow-hidden bg-surface-3 border border-border-subtle"
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>

          {project && (
            <p className="mt-2 text-[11px] text-text-tertiary">
              Fase {project.currentPhase} de 3
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
