import React from 'react';
import { NavLink } from 'react-router-dom';
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
    <aside
      className="fixed top-0 left-0 h-screen flex flex-col z-40 t-transition"
      style={{
        width: 256,
        background: 'var(--t-surface)',
        borderRight: '1px solid var(--t-border)',
      }}
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-heading font-bold text-white text-sm"
            style={{ background: 'var(--t-accent)' }}
          >
            S
          </div>
          <div className="leading-tight">
            <p className="font-heading text-[15px] font-bold" style={{ color: 'var(--t-text)' }}>
              Santista S.A.
            </p>
            <p className="text-[11px] font-medium" style={{ color: 'var(--t-text-ter)' }}>
              Stoken Advisory
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px" style={{ background: 'var(--t-border)' }} />

      {/* Nav label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--t-text-ter)' }}>
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
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium',
                'transition-all duration-150',
                isActive
                  ? 'font-semibold'
                  : '',
              ].join(' ')
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--t-accent-soft)' : 'transparent',
              color: isActive ? 'var(--t-accent)' : 'var(--t-text-sec)',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className="shrink-0"
                  style={{ color: isActive ? 'var(--t-accent)' : 'var(--t-text-ter)' }}
                  aria-hidden="true"
                />
                <span>{label}</span>
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--t-accent)' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Progress */}
      <div className="px-4 py-4">
        <div
          className="rounded-xl p-4 t-transition"
          style={{
            background: 'var(--t-surface-alt)',
            border: '1px solid var(--t-border)',
          }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-semibold" style={{ color: 'var(--t-text-sec)' }}>
              Progresso do Projeto
            </span>
            <span className="text-[11px] font-bold tabular-nums" style={{ color: 'var(--t-accent)' }}>
              {completion}%
            </span>
          </div>

          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 5, background: 'var(--t-border)' }}
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${completion}%`, background: 'var(--t-accent)' }}
            />
          </div>

          {project && (
            <p className="mt-2 text-[11px]" style={{ color: 'var(--t-text-ter)' }}>
              Fase {project.currentPhase} de 3
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
