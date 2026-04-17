import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  X,
  Sparkles,
  Loader2,
  CalendarDays,
  User,
  UserCheck,
  Briefcase,
  Building2,
  Layers,
  Tag,
  CheckCircle2,
  TrendingUp,
  MessageSquareText,
} from 'lucide-react';
import type { Interview, AIInsights, PillarType } from '../../types/interview';
import { PILLAR_LABELS, HIERARCHY_LABELS } from '../../types/interview';
import { useInterviewStore } from '../../store/interviewStore';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

type BadgeVariant = 'pilar-1' | 'pilar-2' | 'pilar-3' | 'pilar-4' | 'pilar-5';

const PILLAR_BADGE_VARIANT: Record<PillarType, BadgeVariant> = {
  processos:   'pilar-1',
  sistemas:    'pilar-2',
  operacoes:   'pilar-3',
  organizacao: 'pilar-4',
  roadmap:     'pilar-5',
};

const STATUS_LABEL: Record<string, string> = {
  scheduled: 'Agendada',
  completed: 'Concluida',
  analyzed:  'Analisada',
};

const STATUS_VARIANT: Record<string, 'warning' | 'info' | 'success'> = {
  scheduled: 'warning',
  completed: 'info',
  analyzed:  'success',
};

const SENTIMENT_CONFIG: Record<
  AIInsights['sentiment'],
  { label: string; className: string }
> = {
  positive: { label: 'Positivo',  className: 'bg-success/10 text-success border border-success/20' },
  neutral:  { label: 'Neutro',    className: 'bg-info/10 text-info border border-info/20' },
  negative: { label: 'Negativo',  className: 'bg-danger/10 text-danger border border-danger/20' },
};

// Pillar-specific AI analysis
function simulateAIAnalysis(interview: Interview): Promise<AIInsights> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pillarFindings: Record<PillarType, { findings: string[]; indicators: string[]; tags: string[] }> = {
        processos: {
          findings: [
            'Processo de S&OP carece de validacao estrategica — decisoes de mix sem respaldo de margem',
            'Planejamento de producao dependente de Excel — sistema Intex subutilizado por lentidao',
            'Custeio manual fragmentado entre multiplas fontes — ciclo de 20-25 dias para 1500 SKUs',
            'Ausencia de ficha tecnica unica — 4 versoes concorrentes entre BDI, Intex, PeopleSoft e Standard',
            'Previsao de demanda com erro (MAPE) elevado — sem modelos estatisticos ou machine learning',
            'Concentracao de 40% das vendas nos ultimos 4 dias do mes impacta toda a cadeia',
          ],
          indicators: [
            'S&OP sem filtro estrategico — reuniao de homologacao, nao de decisao',
            'Custeio manual sem integracao — impossibilidade de margem por cliente/pedido',
            'Governanca de KPIs fragil — 200 indicadores proliferando sem priorizacao',
          ],
          tags: ['S&OP', 'custeio', 'planejamento', 'Excel', 'ficha-tecnica', 'MAPE'],
        },
        sistemas: {
          findings: [
            'Landscape de 39 sistemas com baixa integracao — transferencia de dados via Excel e FTP',
            'PeopleSoft ERP com risco de descontinuidade no Brasil em 2027',
            'Intex 20 versoes desatualizado — acumula funcoes de ERP e MES sem atender bem nenhuma',
            'Ausencia de Data Warehouse ou Data Lake — dados dispersos em 17+ bases sem governanca',
            'Cyberseguranca OT com controles basicos — pen-drives como meio de transferencia de dados',
            'QlikSense com MCP embarcado representa oportunidade de IA generativa',
          ],
          indicators: [
            'CMMI Nivel 1 em Gestao de Dados — sem politica formal de governanca',
            'Arquitetura ponto-a-ponto com 200+ integracoes sem documentacao',
            'Budget de TI 70% comprometido com manutencao do legado',
          ],
          tags: ['ERP', 'Intex', 'cyberseguranca', 'Data-Lake', 'integracao', 'legado'],
        },
        operacoes: {
          findings: [
            'Coleta de dados 90% manual — 40+ formularios em papel no chao de fabrica',
            'Defeitos de qualidade detectados com ate 25 dias de atraso por inspecao visual',
            'Gap critico ISA-95 Nivel 3 — ausencia de MES, PIMS e LIMS',
            'OEE abaixo do benchmark setorial — paradas nao planejadas como principal causa',
            'Diferenca de rendimento de 15% entre turnos sem ferramenta de analise',
            'Gasto energetico de R$ 70M/ano sem sistema de gerenciamento ou medicao digital',
          ],
          indicators: [
            'Automacao restrita — BMS cobre apenas tecelagem, sem escrita para maquinas',
            'Manutencao reativa predominante — Engeman sem integracao com dados de processo',
            'Controle estatistico de processo (SPC) inexistente',
          ],
          tags: ['MES', 'PIMS', 'IoT', 'qualidade', 'energia', 'ISA-95', 'OEE'],
        },
        organizacao: {
          findings: [
            'Turnover elevado (~2.5% ao mes) com dificuldade crescente de atracao e retencao',
            'Capacitacao de novos funcionarios sem trilha estruturada — dependencia de treinamento informal',
            'Perfil analitico escasso — Excel como principal ferramenta de analytics em toda a empresa',
            'Gestao de mudanca inexistente como area formal — projetos anteriores (TPM) nao alcancaram resultado',
            'Base de 2500 padroes no SoftExpert mas pouco utilizada — alta nao-conformidade por descumprimento',
          ],
          indicators: [
            'Ausencia de area de Change Management — risco critico para transformacao digital',
            'Literacia digital dos gestores baixa — 12% com certificacao minima',
            'Dependencia de conhecimento tacito — risco de perda com turnover',
          ],
          tags: ['turnover', 'capacitacao', 'change-management', 'cultura', 'analytics'],
        },
        roadmap: {
          findings: [
            'Escritorio de Transformacao recente — mandato e poderes ainda nao consolidados',
            'Meta de 40 km/per capita ate 2027 depende diretamente da transformacao digital',
            'CAPEX de R$ 300M aprovado mas 80% direcionado a hardware sem resolver gestao',
            'Piloto Vexia em Americana com resultados positivos (18% reducao paradas) mas escala incerta',
            'Iniciativa Polux de diversificacao profissional precisa de ambiente digital moderno',
          ],
          indicators: [
            'Roadmap de 4 horizontes definido: Agora (0-30d), Curto (30-90d), Medio (90-180d), Transformacao (6-18m)',
            'Priorizacao de 28 iniciativas em 3 ondas: Estabilizar, Otimizar, Transformar',
            'Quick wins identificados: Validacao Estrategica S&OP, MES caldeiras, IoT teares',
          ],
          tags: ['roadmap', 'transformacao', 'CAPEX', 'Polux', 'Vexia', 'quick-win'],
        },
      };

      const data = pillarFindings[interview.pillar];
      const shuffled = [...data.findings].sort(() => 0.5 - Math.random());
      const selectedFindings = shuffled.slice(0, Math.min(5, shuffled.length));

      const sentiments: AIInsights['sentiment'][] = ['negative', 'neutral', 'negative'];
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

      resolve({
        summary: `Entrevista com ${interview.intervieweeName} (${interview.role}, ${interview.area}) revelou insights relevantes sobre ${PILLAR_LABELS[interview.pillar]}. A analise indica gaps significativos que corroboram os achados do diagnostico Deloitte, com oportunidades concretas de melhoria identificadas no contexto da transformacao digital da Santista.`,
        keyFindings: selectedFindings,
        tags: data.tags,
        sentiment,
        maturityIndicators: data.indicators,
      });
    }, 2500);
  });
}

interface InterviewDetailProps {
  interview: Interview;
  onClose: () => void;
}

const SectionTitle: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="text-accent" aria-hidden="true">{icon}</span>
    <h3 className="font-heading font-semibold text-base text-text">{label}</h3>
  </div>
);

const InterviewDetail: React.FC<InterviewDetailProps> = ({ interview, onClose }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const updateAIInsights = useInterviewStore((s) => s.updateAIInsights);

  const {
    intervieweeName,
    role,
    area,
    level,
    pillar,
    date,
    status,
    transcript,
    aiInsights,
    tags,
  } = interview;

  let formattedDate = date;
  try {
    formattedDate = format(parseISO(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    // fallback
  }

  const handleAnalyze = async () => {
    if (analyzing) return;
    setAnalyzing(true);
    try {
      const insights = await simulateAIAnalysis(interview);
      updateAIInsights(interview.id, insights);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-heading text-xl font-semibold leading-tight text-text">
            {intervieweeName}
          </h2>
          <p className="font-body text-sm mt-1 text-text-secondary">
            {role} &middot; {area}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 text-text-tertiary"
        >
          <X size={18} />
        </button>
      </div>

      {/* Meta badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant={PILLAR_BADGE_VARIANT[pillar]}>
          {PILLAR_LABELS[pillar]}
        </Badge>
        <Badge variant="default">{HIERARCHY_LABELS[level]}</Badge>
        <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <User size={14} />,         label: 'Entrevistado',  value: intervieweeName },
          { icon: <UserCheck size={14} />,    label: 'Entrevistador', value: interview.interviewerName || 'Nao informado' },
          { icon: <Briefcase size={14} />,     label: 'Cargo',        value: role },
          { icon: <Building2 size={14} />,     label: 'Area',         value: area },
          { icon: <Layers size={14} />,        label: 'Nivel',        value: HIERARCHY_LABELS[level] },
          { icon: <CalendarDays size={14} />,  label: 'Data',         value: formattedDate },
        ].map(({ icon, label, value }) => (
          <div key={label} className="rounded-lg p-3 bg-surface-3 border border-border">
            <div className="flex items-center gap-1.5 mb-1 text-text-secondary">
              <span aria-hidden="true">{icon}</span>
              <span className="font-body text-xs">{label}</span>
            </div>
            <p className="font-body text-sm font-medium truncate text-text">{value}</p>
          </div>
        ))}
      </div>

      {/* Tags da entrevista */}
      {tags.length > 0 && (
        <div>
          <SectionTitle icon={<Tag size={15} />} label="Tags" />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="accent" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <div>
          <SectionTitle icon={<MessageSquareText size={15} />} label="Transcrição" />
          <div className="rounded-lg p-4 max-h-48 overflow-y-auto bg-surface-3 border border-border">
            <p className="font-body text-sm whitespace-pre-wrap leading-relaxed text-text">
              {transcript}
            </p>
          </div>
        </div>
      )}

      {/* AI Insights */}
      {aiInsights ? (
        <div className="flex flex-col gap-5 rounded-xl p-5 border border-success/15 bg-success/[0.04]">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-success" aria-hidden="true" />
            <h3 className="font-heading font-semibold text-base text-text">
              Analise de Inteligencia Artificial
            </h3>
          </div>

          {/* Summary */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide mb-1 text-text-secondary">
              Resumo
            </p>
            <p className="font-body text-sm leading-relaxed text-text">
              {aiInsights.summary}
            </p>
          </div>

          {/* Sentiment */}
          <div className="flex items-center gap-2">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-text-secondary">
              Sentimento:
            </p>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${SENTIMENT_CONFIG[aiInsights.sentiment].className}`}
            >
              {SENTIMENT_CONFIG[aiInsights.sentiment].label}
            </span>
          </div>

          {/* Key findings */}
          {aiInsights.keyFindings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={14} className="text-success" aria-hidden="true" />
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Principais achados
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {aiInsights.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm text-text">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Maturity indicators */}
          {aiInsights.maturityIndicators.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-success" aria-hidden="true" />
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Indicadores de maturidade
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {aiInsights.maturityIndicators.map((indicator, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500"
                      aria-hidden="true"
                    />
                    <span className="font-body text-sm text-text">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI tags */}
          {aiInsights.tags.length > 0 && (
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide mb-2 text-text-secondary">
                Tags da IA
              </p>
              <div className="flex flex-wrap gap-1.5">
                {aiInsights.tags.map((tag) => (
                  <Badge key={tag} variant="success" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Analyze button */
        <div className="flex flex-col items-center gap-3 py-6 rounded-xl border border-dashed border-border bg-surface-3">
          <Sparkles size={24} className="text-text-tertiary" aria-hidden="true" />
          <p className="font-body text-sm text-center text-text-secondary">
            {transcript
              ? 'Esta entrevista ainda nao foi analisada pela IA.'
              : 'Adicione uma transcricao para habilitar a analise de IA.'}
          </p>
          <Button
            variant="accent"
            size="sm"
            icon={analyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            loading={analyzing}
            disabled={!transcript || analyzing}
            onClick={handleAnalyze}
          >
            {analyzing ? 'Analisando...' : 'Analisar com IA'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterviewDetail;
