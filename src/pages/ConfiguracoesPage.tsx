import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useProjectStore } from '../store/projectStore';
import { useInterviewStore } from '../store/interviewStore';
import { useDiagnosticoStore } from '../store/diagnosticoStore';

/* ────────────────────────────────────────────
   Shared input style
   ──────────────────────────────────────────── */
const inputClass =
  'w-full text-sm border border-border rounded-lg px-3 py-2 bg-surface-2 text-text ' +
  'focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow';

const labelClass = 'block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1';

/* ────────────────────────────────────────────
   Section: Dados do Projeto
   ──────────────────────────────────────────── */
const DadosProjeto: React.FC = () => {
  const project = useProjectStore((s) => s.project);
  const setProject = useProjectStore((s) => s.setProject);

  const [form, setForm] = useState({
    client: project?.client ?? '',
    sector: project?.sector ?? '',
    revenue: project?.revenue ?? '',
    employees: String(project?.employees ?? ''),
    factories: String(project?.factories ?? ''),
  });
  const [saved, setSaved] = useState(false);

  // Sync if project changes externally
  useEffect(() => {
    if (project) {
      setForm({
        client: project.client,
        sector: project.sector,
        revenue: project.revenue,
        employees: String(project.employees),
        factories: String(project.factories),
      });
    }
  }, [project]);

  const handleSave = () => {
    if (!project) return;
    setProject({
      ...project,
      client: form.client,
      sector: form.sector,
      revenue: form.revenue,
      employees: parseInt(form.employees, 10) || project.employees,
      factories: parseInt(form.factories, 10) || project.factories,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card title="Dados do Projeto">
      {!project ? (
        <p className="text-sm text-text-muted">
          Nenhum projeto carregado. Crie um projeto na secao Projeto.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="cfg-client">
                Cliente
              </label>
              <input
                id="cfg-client"
                type="text"
                className={inputClass}
                value={form.client}
                onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                placeholder="Nome do cliente"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="cfg-sector">
                Setor
              </label>
              <input
                id="cfg-sector"
                type="text"
                className={inputClass}
                value={form.sector}
                onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))}
                placeholder="Ex: Alimenticio, Automotivo..."
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="cfg-revenue">
                Faturamento Anual
              </label>
              <input
                id="cfg-revenue"
                type="text"
                className={inputClass}
                value={form.revenue}
                onChange={(e) => setForm((f) => ({ ...f, revenue: e.target.value }))}
                placeholder="Ex: R$ 500M"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="cfg-employees">
                Numero de Funcionarios
              </label>
              <input
                id="cfg-employees"
                type="number"
                min="0"
                className={inputClass}
                value={form.employees}
                onChange={(e) => setForm((f) => ({ ...f, employees: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="cfg-factories">
                Numero de Plantas / Unidades
              </label>
              <input
                id="cfg-factories"
                type="number"
                min="0"
                className={inputClass}
                value={form.factories}
                onChange={(e) => setForm((f) => ({ ...f, factories: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button variant="primary" size="sm" onClick={handleSave}>
              Salvar dados
            </Button>
            {saved && (
              <span className="text-xs text-emerald-600 font-medium">
                Dados salvos com sucesso!
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

/* ────────────────────────────────────────────
   Section: Contexto para Agentes IA
   ──────────────────────────────────────────── */
const ContextoAgentes: React.FC = () => {
  const project = useProjectStore((s) => s.project);
  const updateContext = useProjectStore((s) => s.updateContext);

  const [context, setContext] = useState(project?.context ?? '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContext(project?.context ?? '');
  }, [project?.context]);

  const handleSave = () => {
    updateContext(context);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card title="Contexto para Agentes IA">
      <p className="text-xs text-text-muted mb-3">
        Descreva o contexto do projeto. Os agentes de IA usam este texto para personalizar a
        analise e as recomendacoes.
      </p>
      <textarea
        className={`${inputClass} resize-y`}
        rows={6}
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Descreva o contexto da empresa, desafios conhecidos, objetivos estrategicos, restricoes operacionais..."
        disabled={!project}
      />
      {!project && (
        <p className="text-xs text-text-muted mt-2">
          Crie um projeto primeiro para editar o contexto.
        </p>
      )}
      <div className="flex items-center gap-3 mt-3">
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={!project}
        >
          Salvar contexto
        </Button>
        {saved && (
          <span className="text-xs text-emerald-600 font-medium">Contexto salvo!</span>
        )}
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────────
   Section: Chave API Anthropic
   ──────────────────────────────────────────── */
const ChaveAPI: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>(
    () => localStorage.getItem('stoken-api-key') ?? ''
  );
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('stoken-api-key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const maskedKey =
    apiKey.length > 8
      ? apiKey.slice(0, 6) + '••••••••••••' + apiKey.slice(-4)
      : apiKey;

  return (
    <Card title="Chave API Anthropic">
      <p className="text-xs text-text-muted mb-3">
        A chave e armazenada apenas no localStorage do navegador e nunca enviada a terceiros.
      </p>
      <div className="flex gap-2">
        <input
          type={visible ? 'text' : 'password'}
          className={`${inputClass} flex-1 font-mono`}
          value={visible ? apiKey : maskedKey && apiKey ? maskedKey : ''}
          onChange={(e) => {
            setVisible(true);
            setApiKey(e.target.value);
          }}
          placeholder="sk-ant-..."
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="px-3 py-2 border border-border rounded-lg text-xs text-text-muted hover:text-text transition-colors bg-surface-2"
          title={visible ? 'Ocultar chave' : 'Mostrar chave'}
        >
          {visible ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <Button variant="primary" size="sm" onClick={handleSave} disabled={!apiKey.trim()}>
          Salvar chave
        </Button>
        {saved && (
          <span className="text-xs text-emerald-600 font-medium">Chave salva!</span>
        )}
        {apiKey && !saved && (
          <button
            type="button"
            onClick={() => {
              setApiKey('');
              localStorage.removeItem('stoken-api-key');
            }}
            className="text-xs text-danger underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Remover chave
          </button>
        )}
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────────
   Section: Calibracao dos Agentes
   ──────────────────────────────────────────── */
type Tone = 'formal' | 'consultivo' | 'tecnico';
type DetailLevel = 'resumido' | 'detalhado' | 'completo';

const TONE_OPTIONS: { value: Tone; label: string; desc: string }[] = [
  { value: 'formal', label: 'Formal', desc: 'Linguagem corporativa, terceira pessoa' },
  { value: 'consultivo', label: 'Consultivo', desc: 'Tom de parceiro estrategico' },
  { value: 'tecnico', label: 'Tecnico', desc: 'Detalhes tecnicos e metricas' },
];

const DETAIL_OPTIONS: { value: DetailLevel; label: string; desc: string }[] = [
  { value: 'resumido', label: 'Resumido', desc: 'Highlights e topicos principais' },
  { value: 'detalhado', label: 'Detalhado', desc: 'Analise aprofundada por secao' },
  { value: 'completo', label: 'Completo', desc: 'Relatorio exaustivo com evidencias' },
];

const CalibracacaoAgentes: React.FC = () => {
  const [tone, setTone] = useState<Tone>(
    () => (localStorage.getItem('stoken-tone') as Tone) ?? 'consultivo'
  );
  const [detail, setDetail] = useState<DetailLevel>(
    () => (localStorage.getItem('stoken-detail') as DetailLevel) ?? 'detalhado'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('stoken-tone', tone);
    localStorage.setItem('stoken-detail', detail);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card title="Calibracao dos Agentes">
      <p className="text-xs text-text-muted mb-4">
        Ajuste como os agentes de IA redigem os relatorios e insights.
      </p>

      <div className="space-y-5">
        {/* Tone */}
        <div>
          <label className={labelClass}>Tom de comunicacao</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {TONE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTone(opt.value)}
                className={[
                  'text-left px-3 py-2.5 rounded-lg border text-sm transition-all',
                  tone === opt.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-text hover:border-primary/40',
                ].join(' ')}
              >
                <span className="block font-semibold">{opt.label}</span>
                <span className="block text-xs text-text-muted mt-0.5">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail level */}
        <div>
          <label className={labelClass}>Nivel de detalhe</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DETAIL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDetail(opt.value)}
                className={[
                  'text-left px-3 py-2.5 rounded-lg border text-sm transition-all',
                  detail === opt.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border text-text hover:border-primary/40',
                ].join(' ')}
              >
                <span className="block font-semibold">{opt.label}</span>
                <span className="block text-xs text-text-muted mt-0.5">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={handleSave}>
            Salvar calibracao
          </Button>
          {saved && (
            <span className="text-xs text-emerald-600 font-medium">Calibracao salva!</span>
          )}
        </div>
      </div>
    </Card>
  );
};

/* ────────────────────────────────────────────
   Section: Status dos Dados
   ──────────────────────────────────────────── */
const StatusDados: React.FC = () => {
  const project = useProjectStore((s) => s.project);
  const interviews = useInterviewStore((s) => s.interviews);
  const insights = useDiagnosticoStore((s) => s.insights);
  const report = useDiagnosticoStore((s) => s.report);

  const rows = [
    {
      label: 'Projeto carregado',
      value: project ? project.name : 'Nenhum',
      ok: Boolean(project),
    },
    { label: 'Entrevistas', value: String(interviews.length), ok: interviews.length > 0 },
    { label: 'Insights', value: String(insights.length), ok: insights.length > 0 },
    {
      label: 'Relatorio de diagnostico',
      value: report ? 'Gerado' : 'Nao gerado',
      ok: Boolean(report),
    },
  ];

  return (
    <Card title="Status dos Dados">
      <ul className="divide-y divide-border">
        {rows.map(({ label, value, ok }) => (
          <li
            key={label}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <span className="text-text-muted">{label}</span>
            <span
              className={`font-semibold ${ok ? 'text-emerald-600' : 'text-text-muted'}`}
            >
              {value}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

/* ────────────────────────────────────────────
   Section: Danger Zone
   ──────────────────────────────────────────── */
const DangerZone: React.FC = () => {
  const handleClearAll = () => {
    if (
      window.confirm(
        'Tem certeza? Esta acao ira limpar TODOS os dados do localStorage.\n\nEsta acao nao pode ser desfeita.'
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Card title="Zona de Perigo">
      <p className="text-sm text-text-muted mb-4">
        Limpa todos os dados armazenados no navegador — projeto, entrevistas, insights e
        relatorios. Os dados seed serao recarregados automaticamente na proxima visita.
      </p>
      <Button variant="danger" size="sm" onClick={handleClearAll}>
        Limpar todos os dados
      </Button>
    </Card>
  );
};

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */
const ConfiguracoesPage: React.FC = () => {
  return (
    <div>
      <Header
        title="Configuracoes"
        subtitle="Parametros do projeto e integracao"
      />

      <div className="grid gap-6 max-w-3xl">
        <StatusDados />
        <DadosProjeto />
        <ContextoAgentes />
        <ChaveAPI />
        <CalibracacaoAgentes />
        <DangerZone />
      </div>
    </div>
  );
};

export default ConfiguracoesPage;
