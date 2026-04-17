import React from 'react';
import Card from '../ui/Card';
import { useProjectStore } from '../../store/projectStore';
import type { TeamMember } from '../../types/project';

// Generate initials from name
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Deterministic color from name for avatar background
const avatarColors = [
  '#2563EB',
  '#7C3AED',
  '#059669',
  '#D97706',
  '#E11D48',
  '#0D9488',
  '#4F46E5',
  '#EA580C',
];

const getAvatarColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

// Allocation label
const allocationLabel = (pct: number): string => {
  if (pct >= 100) return 'Dedicacao integral';
  if (pct >= 75) return 'Alta dedicacao';
  if (pct >= 50) return 'Dedicacao parcial';
  return 'Baixa dedicacao';
};

const allocationBadgeStyle = (pct: number): React.CSSProperties => {
  if (pct >= 100) return { color: '#10B981' };
  if (pct >= 75) return { color: 'var(--t-accent)' };
  if (pct >= 50) return { color: '#3B82F6' };
  return { color: 'var(--t-text-sec)' };
};

interface MemberRowProps {
  member: TeamMember;
}

const MemberRow: React.FC<MemberRowProps> = ({ member }) => {
  const initials = getInitials(member.name);
  const avatarBg = getAvatarColor(member.name);
  const clampedAlloc = Math.min(Math.max(member.allocation, 0), 100);

  return (
    <div className="py-3" style={{ borderBottom: '1px solid var(--t-border)' }}>
      <div className="flex items-center gap-3 mb-2">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: avatarBg }}
          aria-label={member.name}
        >
          <span className="font-body text-xs font-bold text-white">{initials}</span>
        </div>

        {/* Name & role */}
        <div className="flex-1 min-w-0">
          <p className="font-body text-sm font-semibold leading-tight truncate" style={{ color: 'var(--t-text)' }}>
            {member.name}
          </p>
          <p className="font-body text-xs truncate" style={{ color: 'var(--t-text-sec)' }}>{member.role}</p>
        </div>

        {/* Allocation % */}
        <span
          className="font-body text-xs font-bold shrink-0"
          style={allocationBadgeStyle(member.allocation)}
        >
          {clampedAlloc}%
        </span>
      </div>

      {/* Allocation bar */}
      <div className="flex items-center gap-2">
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ background: 'var(--t-surface-alt)', border: '1px solid var(--t-border)' }}
          role="progressbar"
          aria-valuenow={clampedAlloc}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Alocacao de ${member.name}: ${clampedAlloc}%`}
        >
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-in-out"
            style={{ width: `${clampedAlloc}%`, background: 'var(--t-accent)' }}
          />
        </div>
        <span className="font-body text-xs w-28 shrink-0" style={{ color: 'var(--t-text-sec)' }}>
          {allocationLabel(member.allocation)}
        </span>
      </div>
    </div>
  );
};

const TeamPanel: React.FC = () => {
  const project = useProjectStore((s) => s.project);

  if (!project) return null;

  const { team } = project;
  const avgAllocation =
    team.length > 0
      ? Math.round(team.reduce((sum, m) => sum + m.allocation, 0) / team.length)
      : 0;

  return (
    <Card
      title="Equipe do Projeto"
      subtitle={
        team.length > 0
          ? `${team.length} membro${team.length !== 1 ? 's' : ''} · media ${avgAllocation}% alocacao`
          : 'Nenhum membro cadastrado'
      }
    >
      {team.length === 0 ? (
        <div className="text-center py-6">
          <p className="font-body text-sm" style={{ color: 'var(--t-text-sec)' }}>
            Nenhum membro adicionado a este projeto.
          </p>
        </div>
      ) : (
        <div>
          {team.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default TeamPanel;
