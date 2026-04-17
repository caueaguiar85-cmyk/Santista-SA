import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Lightbulb,
  Map,
  Settings,
  Hexagon,
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
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col z-40 border-r border-border bg-surface-2 backdrop-blur-xl"
      style={{ width: 260 }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_16px_rgba(227,30,36,0.3)]">
            <Hexagon size={16} className="text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold text-text tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Stoken Advisory
          </span>
        </div>

        <div className="pl-0.5">
          <p className="text-sm font-medium text-text">
            Santista S.A.
          </p>
          <p className="text-xs text-text-muted">
            Assessment 2026
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-border" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium',
                'transition-all duration-200',
                isActive
                  ? 'bg-accent/10 text-accent border-r-2 border-accent'
                  : 'text-text-muted hover:text-text hover:bg-white/[0.03]',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className="shrink-0"
                  style={{ color: isActive ? 'var(--color-accent)' : undefined }}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Project Progress */}
      <div className="px-4 py-4">
        <div className="rounded-xl border border-border p-3.5 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-muted">
              Progresso
            </span>
            <span className="text-xs font-semibold tabular-nums text-accent">
              {completion}%
            </span>
          </div>

          <div
            className="w-full rounded-full overflow-hidden bg-white/[0.06]"
            style={{ height: 4 }}
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full transition-all duration-500 bg-accent shadow-[0_0_8px_rgba(227,30,36,0.4)]"
              style={{ width: `${completion}%` }}
            />
          </div>

          {project && (
            <p className="mt-2 text-[11px] text-text-muted">
              Fase {project.currentPhase} de 3
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
