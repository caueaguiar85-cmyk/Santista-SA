import React, { useState, useRef } from 'react';
import { Play, ChevronDown, Clock } from 'lucide-react';
import { useDiagnosticoStore } from '../../store/diagnosticoStore';
import type { AgentRun, PillarScore, DiagnosticReport } from '../../types/diagnostico';
import type { PillarType } from '../../types/interview';
import { PILLAR_LABELS } from '../../types/interview';
import { CMMI_LEVELS } from '../../types/diagnostico';
import Button from '../ui/Button';
import Card from '../ui/Card';
import AgentProgress from './AgentProgress';

// ----------------------------
// Mock data generators
// ----------------------------
const MOCK_SCORES: Record<PillarType, number> = {
  processos: 2.1,
  sistemas: 1.8,
  operacoes: 2.5,
  organizacao: 2.0,
  roadmap: 1.5,
};

const AGENT_NAMES = [
  'AS-IS Analyst',
  'Risk Assessor',
  'Recommender',
  'Value Estimator',
  'Roadmap Builder',
  'KPI Definer',
  'RACI Builder',
  'Market Benchmarker',
  'Executive Synthesizer',
] as const;

const AGENT_PREVIEWS: string[] = [
  'Mapeamento AS-IS concluido. Identificados 47 processos criticos na cadeia de suprimentos. Nivel de maturidade medio estimado em 2.0 no modelo CMMI.',
  'Avaliacao de riscos finalizada. 12 riscos de alta criticidade identificados. Exposicao financeira estimada em R$ 4.2M anuais.',
  'Recomendacoes geradas com base nos gaps identificados. 23 iniciativas priorizadas por impacto e esforco de implementacao.',
  'Estimativa de valor concluida. Potencial de ganho de R$ 8.7M em 24 meses com payback medio de 14 meses para as top 5 iniciativas.',
  'Roadmap de transformacao estruturado em 3 ondas: Estabilizacao (0-6m), Otimizacao (6-18m) e Transformacao (18-36m).',
  'KPIs definidos para cada pilar. 34 indicadores mapeados com baselines atuais e metas para 12 e 24 meses.',
  'Matriz RACI construida com 18 iniciativas. Responsabilidades distribuidas entre Logistica, TI, Comercial e Operacoes.',
  'Benchmark setorial concluido. Empresa se posiciona abaixo da media do setor em 4 dos 5 pilares avaliados.',
  'Relatorio executivo sintetizado. Principais insights: urgencia em Sistemas & Dados e Roadmap. Potencial transformacional identificado.',
];

function buildMockReport(): DiagnosticReport {
  const pillars: PillarType[] = ['processos', 'sistemas', 'operacoes', 'organizacao', 'roadmap'];
  const scores = pillars.map<PillarScore>((pillar) => {
    const score = MOCK_SCORES[pillar];
    const levelNum = Math.round(score) as 1 | 2 | 3 | 4 | 5;
    return {
      pillar,
      score,
      level: CMMI_LEVELS[levelNum] ?? 'Inicial',
      asIs: `Analise do pilar ${PILLAR_LABELS[pillar]} indica nivel de maturidade ${score.toFixed(1)} no modelo CMMI. Existem oportunidades significativas de melhoria nos processos de planejamento, execucao e controle. A organizacao opera de forma reativa, sem processos padronizados amplamente adotados. Os dados disponiveis sao fragmentados e nao suportam tomada de decisao estruturada. A capacitacao tecnica da equipe e variavel, com alta dependencia de pessoas-chave.`,
      keyFindings: [
        'Processos nao padronizados geram retrabalho e inconsistencias',
        'Baixa visibilidade sobre KPIs operacionais em tempo real',
        'Sistemas legados dificultam integracao e analise de dados',
        'Capacitacao da equipe abaixo do nivel necessario para transformacao',
      ],
      criticalGaps: [
        'Ausencia de torre de controle integrada para monitoramento',
        'Falta de processo formal de S&OP (Sales & Operations Planning)',
        'Integracao limitada entre ERP e operacoes do armazem',
      ],
      risks: [
        {
          id: `risk-${pillar}-1`,
          title: 'Ruptura de estoque por planejamento inadequado',
          description: 'A ausencia de processos de previsao de demanda estruturados eleva o risco de rupturas e impacto em vendas.',
          category: 'Operacional',
          probability: 75,
          impact: 4,
          riskScore: 3.0,
          estimatedCost: 'R$ 1.2M/ano',
          source: 'Analise operacional',
          mitigation: 'Implementar processo de S&OP com revisao mensal e ferramentas de forecasting.',
        },
      ],
      recommendations: [
        {
          id: `rec-${pillar}-1`,
          title: 'Implementar processo de S&OP',
          description: 'Estruturar ciclo mensal de planejamento integrado de vendas e operacoes com participacao multifuncional.',
          priority: 'Alta',
          effort: 'M',
          impact: 4,
          pillar,
          type: 'strategic',
        },
        {
          id: `rec-${pillar}-2`,
          title: 'Padronizar KPIs operacionais',
          description: 'Definir conjunto basico de indicadores com owners, frequencia de medicao e metas para os proximos 12 meses.',
          priority: 'Alta',
          effort: 'P',
          impact: 3,
          pillar,
          type: 'quick_win',
        },
      ],
      estimatedGains: {
        totalEstimatedGain: 'R$ 1.8M',
        byInitiative: [
          { name: 'S&OP estruturado', gain: 'R$ 900k', confidence: 'Media' },
          { name: 'Reducao de estoque', gain: 'R$ 600k', confidence: 'Alta' },
          { name: 'Eficiencia logistica', gain: 'R$ 300k', confidence: 'Baixa' },
        ],
        paybackMonths: 14,
      },
      status: 'draft',
    };
  });

  const overall = scores.reduce((acc, s) => acc + s.score, 0) / scores.length;

  return {
    projectId: 'santista-001',
    generatedAt: new Date().toISOString(),
    overallScore: parseFloat(overall.toFixed(2)),
    pillarScores: scores,
    executiveSummary:
      'O diagnostico identifica que a Santista S.A. opera em nivel de maturidade medio-baixo (2.0/5.0) na cadeia de suprimentos. As principais oportunidades estao nos pilares de Sistemas & Dados e Roadmap de Transformacao. O potencial de ganho estimado e de R$ 8.7M em 24 meses, com foco em eficiencia operacional, reducao de perdas e melhoria do nivel de servico.',
    kpis: [],
    raciMatrix: [],
    marketBenchmark: {
      companyScore: overall,
      sectorAverage: 3.12,
      topQuartile: 4.1,
      byPillar: scores.map((s) => ({
        pillar: s.pillar,
        company: s.score,
        sector: 3.0 + Math.random() * 0.5,
        topQuartile: 3.8 + Math.random() * 0.4,
      })),
      references: ['Gartner Supply Chain Top 25 2024', 'ILOS Benchmarking Brasil 2024'],
    },
    initiatives: [],
  };
}

// ----------------------------
// Individual agent runner
// ----------------------------
const AGENT_NAMES_LIST: string[] = [...AGENT_NAMES];

const INDIVIDUAL_AGENTS = AGENT_NAMES_LIST.map((name, i) => ({
  id: `agent-${i + 1}`,
  name,
}));

// ----------------------------
// Log entry type
// ----------------------------
interface LogEntry {
  timestamp: string;
  message: string;
}

// ----------------------------
// Component
// ----------------------------
const AgentControls: React.FC = () => {
  const { agentRuns, isRunning, setAgentRuns, updateAgentRun, setIsRunning, setReport, initializeAgentRuns } =
    useDiagnosticoStore();

  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    setLogs((prev) => [...prev, { timestamp, message }]);
  };

  const runAllAgents = async () => {
    if (isRunning) return;

    setIsRunning(true);
    initializeAgentRuns();

    const initialRuns: AgentRun[] = AGENT_NAMES_LIST.map((name, i) => ({
      id: `agent-${i + 1}`,
      name,
      status: 'waiting',
    }));
    setAgentRuns(initialRuns);
    addLog('Iniciando diagnostico completo com 9 agentes...');

    for (let i = 0; i < AGENT_NAMES_LIST.length; i++) {
      const agentId = `agent-${i + 1}`;
      const startedAt = new Date().toISOString();

      updateAgentRun(agentId, { status: 'running', startedAt });
      addLog(`[Agente ${i + 1}/9] ${AGENT_NAMES_LIST[i]} — executando...`);

      const duration = 1200 + Math.random() * 800;
      await new Promise<void>((resolve) => setTimeout(resolve, duration));

      const completedAt = new Date().toISOString();
      updateAgentRun(agentId, {
        status: 'completed',
        completedAt,
        preview: AGENT_PREVIEWS[i],
      });
      addLog(`[Agente ${i + 1}/9] ${AGENT_NAMES_LIST[i]} — concluido com sucesso.`);
    }

    const report = buildMockReport();
    setReport(report);
    addLog('Diagnostico completo finalizado. Relatorio disponivel.');
    setIsRunning(false);
  };

  const runSingleAgent = async (agentIndex: number) => {
    if (isRunning) return;
    setShowAgentDropdown(false);

    const agentId = `agent-${agentIndex + 1}`;
    const agentName = AGENT_NAMES_LIST[agentIndex];

    setIsRunning(true);

    // Ensure runs are initialized
    if (agentRuns.length === 0) {
      const initialRuns: AgentRun[] = AGENT_NAMES_LIST.map((name, i) => ({
        id: `agent-${i + 1}`,
        name,
        status: 'waiting',
      }));
      setAgentRuns(initialRuns);
    }

    const startedAt = new Date().toISOString();
    updateAgentRun(agentId, { status: 'running', startedAt });
    addLog(`Executando agente individual: ${agentName}...`);

    const duration = 1500 + Math.random() * 1000;
    await new Promise<void>((resolve) => setTimeout(resolve, duration));

    const completedAt = new Date().toISOString();
    updateAgentRun(agentId, {
      status: 'completed',
      completedAt,
      preview: AGENT_PREVIEWS[agentIndex],
    });
    addLog(`${agentName} — concluido.`);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Control buttons */}
      <Card title="Controles de Execucao">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            icon={<Play size={16} />}
            onClick={runAllAgents}
            disabled={isRunning}
            loading={isRunning}
          >
            {isRunning ? 'Executando...' : 'Rodar Diagnostico Completo'}
          </Button>

          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              icon={<ChevronDown size={16} />}
              onClick={() => !isRunning && setShowAgentDropdown((v) => !v)}
              disabled={isRunning}
            >
              Rodar Agente Individual
            </Button>

            {showAgentDropdown && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-surface-2 border border-border rounded-lg shadow-lg z-20 py-1 overflow-hidden">
                {INDIVIDUAL_AGENTS.map((agent, i) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => runSingleAgent(i)}
                    className="w-full text-left px-4 py-2.5 font-body text-sm text-primary hover:bg-surface transition-colors"
                  >
                    <span className="text-primary/40 mr-2 font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                    {agent.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {isRunning && (
          <p className="font-body text-xs text-primary/50 mt-3">
            Agentes em execucao — nao feche esta pagina.
          </p>
        )}
      </Card>

      {/* Agent progress */}
      <Card title="Status dos Agentes">
        <AgentProgress agentRuns={agentRuns} />
      </Card>

      {/* Log panel */}
      {logs.length > 0 && (
        <Card
          title="Log de Execucao"
          headerAction={
            <button
              type="button"
              onClick={() => setLogs([])}
              className="font-body text-xs text-primary/40 hover:text-primary/70 transition-colors"
            >
              Limpar
            </button>
          }
        >
          <div className="bg-surface rounded-lg border border-border p-3 font-mono text-xs space-y-1.5 max-h-52 overflow-y-auto">
            {logs.map((entry, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-primary/30 shrink-0 flex items-center gap-1">
                  <Clock size={10} />
                  {entry.timestamp}
                </span>
                <span className="text-primary/70">{entry.message}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AgentControls;
