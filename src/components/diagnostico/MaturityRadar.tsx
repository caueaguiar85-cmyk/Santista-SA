import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Activity } from 'lucide-react';
import type { DiagnosticReport } from '../../types/diagnostico';
import type { PillarType } from '../../types/interview';
import { PILLAR_LABELS } from '../../types/interview';

// ----------------------------
// Types
// ----------------------------
interface MaturityRadarProps {
  report: DiagnosticReport | null;
}

// ----------------------------
// Constants
// ----------------------------
const PILLAR_ORDER: PillarType[] = ['processos', 'sistemas', 'operacoes', 'organizacao', 'roadmap'];

const MOCK_SANTISTA: Record<PillarType, number> = {
  processos: 2.1,
  sistemas: 1.8,
  operacoes: 2.5,
  organizacao: 2.0,
  roadmap: 1.5,
};

const MOCK_BENCHMARK: Record<PillarType, number> = {
  processos: 3.2,
  sistemas: 3.5,
  operacoes: 3.0,
  organizacao: 2.8,
  roadmap: 3.1,
};

// ----------------------------
// Custom tooltip
// ----------------------------
interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg shadow-lg p-3 font-body" style={{ background: 'var(--t-surface)', border: '1px solid var(--t-border)' }}>
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--t-text)' }}>{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span style={{ color: 'var(--t-text-sec)' }}>{entry.name}:</span>
          <span className="font-semibold" style={{ color: 'var(--t-text)' }}>{entry.value.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
};

// ----------------------------
// Score display
// ----------------------------
function overallScore(report: DiagnosticReport | null, useMock: boolean): number {
  if (!useMock && report) return report.overallScore;
  const vals = Object.values(MOCK_SANTISTA);
  return parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1));
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 4
      ? '#10B981'
      : score >= 3
      ? '#3B82F6'
      : score >= 2
      ? '#F59E0B'
      : '#EF4444';

  return (
    <div className="text-center">
      <span className="font-heading text-5xl font-bold" style={{ color }}>
        {score.toFixed(1)}
      </span>
      <span className="font-body text-lg ml-1" style={{ color: 'var(--t-text-ter)' }}>/5.0</span>
      <p className="font-body text-xs mt-1" style={{ color: 'var(--t-text-sec)' }}>Score de Maturidade Geral</p>
    </div>
  );
}

// ----------------------------
// Main component
// ----------------------------
const MaturityRadar: React.FC<MaturityRadarProps> = ({ report }) => {
  const useMock = !report;

  const chartData = PILLAR_ORDER.map((pillar) => {
    const santistaScore =
      !useMock && report
        ? (report.pillarScores.find((ps) => ps.pillar === pillar)?.score ?? MOCK_SANTISTA[pillar])
        : MOCK_SANTISTA[pillar];

    const benchmarkScore =
      !useMock && report?.marketBenchmark
        ? (report.marketBenchmark.byPillar.find((b) => b.pillar === pillar)?.sector ??
          MOCK_BENCHMARK[pillar])
        : MOCK_BENCHMARK[pillar];

    return {
      pillar: PILLAR_LABELS[pillar],
      Santista: santistaScore,
      'Benchmark Setor': benchmarkScore,
    };
  });

  const score = overallScore(report, useMock);

  return (
    <div className="space-y-6">
      {/* Header with score */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <ScoreBadge score={score} />
        </div>
        <div className="flex-1 min-w-0">
          {useMock && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}
            >
              <Activity size={14} style={{ color: '#F59E0B' }} />
              <span className="font-body text-xs font-medium" style={{ color: '#F59E0B' }}>
                Dados de demonstracao — execute o diagnostico para ver resultados reais
              </span>
            </div>
          )}
          <p className="font-body text-sm" style={{ color: 'var(--t-text-sec)' }}>
            Comparativo de maturidade nos 5 pilares da cadeia de suprimentos versus o benchmark do setor de alimentos & bebidas.
          </p>
        </div>
      </div>

      {/* Radar chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid
              stroke="var(--t-border)"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="pillar"
              tick={{
                fontSize: 11,
                fontFamily: 'var(--font-body, sans-serif)',
                fill: 'var(--t-text-sec)',
              }}
              tickLine={false}
            />

            {/* Benchmark — dashed line, gold */}
            <Radar
              name="Benchmark Setor"
              dataKey="Benchmark Setor"
              stroke="#D4AF37"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="#D4AF37"
              fillOpacity={0.05}
              dot={{ r: 3, fill: '#D4AF37', strokeWidth: 0 }}
            />

            {/* Santista — solid fill, red accent */}
            <Radar
              name="Santista"
              dataKey="Santista"
              stroke="#E31E24"
              strokeWidth={2}
              fill="#E31E24"
              fillOpacity={0.15}
              dot={{ r: 4, fill: '#E31E24', strokeWidth: 0 }}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: '12px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Pillar score table */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {PILLAR_ORDER.map((pillar) => {
          const santistaScore =
            !useMock && report
              ? (report.pillarScores.find((ps) => ps.pillar === pillar)?.score ?? MOCK_SANTISTA[pillar])
              : MOCK_SANTISTA[pillar];
          const benchScore = MOCK_BENCHMARK[pillar];
          const gap = benchScore - santistaScore;

          return (
            <div
              key={pillar}
              className="rounded-lg p-3 text-center"
              style={{ background: 'var(--t-surface-alt)', border: '1px solid var(--t-border)' }}
            >
              <p className="font-body text-xs mb-1 leading-tight" style={{ color: 'var(--t-text-ter)' }}>
                {PILLAR_LABELS[pillar].split(' ')[0]}
              </p>
              <p className="font-heading text-xl font-bold" style={{ color: 'var(--t-text)' }}>
                {santistaScore.toFixed(1)}
              </p>
              <p className="font-body text-xs font-medium text-red-500">
                -{gap.toFixed(1)} vs setor
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaturityRadar;
