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
  'bg-blue-600',
  'bg-violet-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-teal-600',
  'bg-indigo-600',
  'bg-orange-600',
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

const allocationBadgeColor = (pct: number): string => {
  if (pct >= 100) return 'text-emerald-400';
  if (pct >= 75) return 'text-accent';
  if (pct >= 50) return 'text-blue-400';
  return 'text-text-muted';
};

interface MemberRowProps {
  member: TeamMember;
}

const MemberRow: React.FC<MemberRowProps> = ({ member }) => {
  const initials = getInitials(member.name);
  const avatarBg = getAvatarColor(member.name);
  const clampedAlloc = Math.min(Math.max(member.allocation, 0), 100);

  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3 mb-2">
        {/* Avatar */}
        <div
          className={[
            'w-9 h-9 rounded-full flex items-center justify-center shrink-0',
            avatarBg,
          ].join(' ')}
          aria-label={member.name}
        >
          <span className="font-body text-xs font-bold text-white">{initials}</span>
        </div>

        {/* Name & role */}
        <div className="flex-1 min-w-0">
          <p className="font-body text-sm font-semibold text-primary leading-tight truncate">
            {member.name}
          </p>
          <p className="font-body text-xs text-text-muted truncate">{member.role}</p>
        </div>

        {/* Allocation % */}
        <span
          className={[
            'font-body text-xs font-bold shrink-0',
            allocationBadgeColor(member.allocation),
          ].join(' ')}
        >
          {clampedAlloc}%
        </span>
      </div>

      {/* Allocation bar */}
      <div className="flex items-center gap-2">
        <div
          className="flex-1 h-1.5 rounded-full bg-surface border border-border/50 overflow-hidden"
          role="progressbar"
          aria-valuenow={clampedAlloc}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Alocacao de ${member.name}: ${clampedAlloc}%`}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500 ease-in-out"
            style={{ width: `${clampedAlloc}%` }}
          />
        </div>
        <span className="font-body text-xs text-text-muted w-28 shrink-0">
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
          <p className="font-body text-sm text-text-muted">
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
