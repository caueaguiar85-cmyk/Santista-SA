import React from 'react';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import InitiativeCard from './InitiativeCard';
import type { Initiative } from '../../types/diagnostico';

const WAVE_ORDER: Initiative['wave'][] = ['stabilize', 'optimize', 'transform'];

interface WaveConfig {
  label: string;
  period: string;
  headerBg: string;
  headerText: string;
  borderColor: string;
  bgColor: string;
  icon: string;
}

const WAVE_CONFIG: Record<Initiative['wave'], WaveConfig> = {
  stabilize: {
    label: 'Estabilizar',
    period: '0 – 6 meses',
    headerBg: '#EF4444',
    headerText: '#FFFFFF',
    borderColor: 'rgba(239,68,68,0.3)',
    bgColor: 'rgba(239,68,68,0.04)',
    icon: '🔧',
  },
  optimize: {
    label: 'Otimizar',
    period: '6 – 18 meses',
    headerBg: '#F59E0B',
    headerText: '#FFFFFF',
    borderColor: 'rgba(245,158,11,0.3)',
    bgColor: 'rgba(245,158,11,0.04)',
    icon: '⚙️',
  },
  transform: {
    label: 'Transformar',
    period: '18 – 36 meses',
    headerBg: '#10B981',
    headerText: '#FFFFFF',
    borderColor: 'rgba(16,185,129,0.3)',
    bgColor: 'rgba(16,185,129,0.04)',
    icon: '🚀',
  },
};

interface WaveSectionProps {
  wave: Initiative['wave'];
  initiatives: Initiative[];
}

const WaveSection: React.FC<WaveSectionProps> = ({ wave, initiatives }) => {
  const config = WAVE_CONFIG[wave];

  return (
    <section
      className="rounded-xl overflow-hidden shadow-sm"
      style={{ border: `2px solid ${config.borderColor}` }}
    >
      {/* Wave header */}
      <div
        className="px-6 py-4 flex items-center justify-between gap-4"
        style={{ background: config.headerBg }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-hidden>
            {config.icon}
          </span>
          <div>
            <h2
              className="font-heading text-xl font-bold leading-tight"
              style={{ color: config.headerText }}
            >
              {config.label}
            </h2>
            <p className="text-sm" style={{ color: config.headerText, opacity: 0.8 }}>{config.period}</p>
          </div>
        </div>
        <span
          className="shrink-0 inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold"
          style={{ background: 'rgba(255,255,255,0.2)', color: config.headerText }}
        >
          {initiatives.length} iniciativa{initiatives.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Initiative cards */}
      <div className="p-6" style={{ background: config.bgColor }}>
        {initiatives.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: 'var(--t-text-sec)' }}>
            Nenhuma iniciativa nesta onda ainda.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {initiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const RoadmapTimeline: React.FC = () => {
  const report = useDiagnosticoStore((s) => s.report);
  const initiatives: Initiative[] = report?.initiatives ?? [];

  return (
    <div className="space-y-6">
      {WAVE_ORDER.map((wave) => {
        const waveInitiatives = initiatives.filter((i) => i.wave === wave);
        return (
          <WaveSection key={wave} wave={wave} initiatives={waveInitiatives} />
        );
      })}
    </div>
  );
};

export default RoadmapTimeline;
