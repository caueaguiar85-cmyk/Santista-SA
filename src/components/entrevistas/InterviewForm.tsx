import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Lightbulb, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import type { Interview, PillarType, HierarchyLevel } from '../../types/interview';
import { PILLAR_LABELS, HIERARCHY_LABELS, SUGGESTED_QUESTIONS, AREA_QUESTIONS } from '../../types/interview';
import { useInterviewStore } from '../../store/interviewStore';
import Button from '../ui/Button';

const PILLAR_OPTIONS = Object.entries(PILLAR_LABELS) as [PillarType, string][];
const LEVEL_OPTIONS  = Object.entries(HIERARCHY_LABELS) as [HierarchyLevel, string][];
const AREA_OPTIONS   = Object.keys(AREA_QUESTIONS);

interface FormValues {
  interviewerName: string;
  intervieweeName: string;
  role: string;
  area: string;
  level: HierarchyLevel;
  pillar: PillarType;
  date: string;
  transcript: string;
  readyForAI: boolean;
}

const DEFAULT_VALUES: FormValues = {
  interviewerName: '',
  intervieweeName: '',
  role: '',
  area: '',
  level: 'gerencia',
  pillar: 'processos',
  date: new Date().toISOString().slice(0, 10),
  transcript: '',
  readyForAI: false,
};

function generateId(): string {
  return `interview-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const inputClass =
  'w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-text focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-150';

const labelClass =
  'text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5';

interface LabeledFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const LabeledField: React.FC<LabeledFieldProps> = ({ label, htmlFor, required, children, className }) => (
  <div className={clsx('flex flex-col', className)}>
    <label htmlFor={htmlFor} className={labelClass}>
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

interface InterviewFormProps {
  editInterview?: Interview;
  onClose: () => void;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ onClose, editInterview }) => {
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);

  const addInterview    = useInterviewStore((s) => s.addInterview);
  const updateInterview = useInterviewStore((s) => s.updateInterview);

  useEffect(() => {
    if (editInterview) {
      setValues({
        interviewerName: editInterview.interviewerName || '',
        intervieweeName: editInterview.intervieweeName,
        role:            editInterview.role,
        area:            editInterview.area,
        level:           editInterview.level,
        pillar:          editInterview.pillar,
        date:            editInterview.date,
        transcript:      editInterview.transcript,
        readyForAI:      editInterview.readyForAI,
      });
    } else {
      setValues(DEFAULT_VALUES);
    }
    setErrors({});
  }, [editInterview]);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.interviewerName.trim()) newErrors.interviewerName = 'Nome do entrevistador e obrigatorio';
    if (!values.intervieweeName.trim()) newErrors.intervieweeName = 'Nome do entrevistado e obrigatorio';
    if (!values.role.trim())            newErrors.role            = 'Cargo e obrigatorio';
    if (!values.area.trim())            newErrors.area            = 'Area e obrigatoria';
    if (!values.date)                   newErrors.date            = 'Data e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function appendQuestion(question: string) {
    setValues((prev) => ({
      ...prev,
      transcript: prev.transcript
        ? `${prev.transcript}\n${question}`
        : question,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const hasTranscript = values.transcript.trim().length > 0;
    const status: Interview['status'] = editInterview?.status === 'analyzed'
      ? 'analyzed'
      : hasTranscript ? 'completed' : 'scheduled';

    if (editInterview) {
      updateInterview(editInterview.id, { ...values, status });
    } else {
      const newInterview: Interview = {
        id:              generateId(),
        interviewerName: values.interviewerName.trim(),
        intervieweeName: values.intervieweeName.trim(),
        role:            values.role.trim(),
        area:            values.area.trim(),
        level:           values.level,
        pillar:          values.pillar,
        date:            values.date,
        status,
        transcript:      values.transcript,
        aiInsights:      null,
        tags:            [],
        readyForAI:      values.readyForAI,
      };
      addInterview(newInterview);
    }

    onClose();
  }

  const isEditing = Boolean(editInterview);

  // Area-specific questions take priority, fallback to pillar questions
  const areaQuestions = values.area ? AREA_QUESTIONS[values.area] : null;
  const suggestedQuestions = areaQuestions || SUGGESTED_QUESTIONS[values.pillar];
  const questionsLabel = areaQuestions
    ? `Perguntas especificas para ${values.area}`
    : `Perguntas gerais para ${PILLAR_LABELS[values.pillar]}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-surface-2 p-6">
        <h2 className="font-heading text-lg font-semibold text-text mb-5">
          {isEditing ? 'Editar Entrevista' : 'Nova Entrevista'}
        </h2>

        {/* Short fields — 2 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <LabeledField label="Entrevistador" htmlFor="interviewerName" required>
            <input
              id="interviewerName"
              type="text"
              value={values.interviewerName}
              onChange={(e) => set('interviewerName', e.target.value)}
              placeholder="Ex: Joao Silva"
              className={inputClass}
            />
            {errors.interviewerName && (
              <span className="text-xs text-red-500 mt-1">{errors.interviewerName}</span>
            )}
          </LabeledField>

          <LabeledField label="Nome do entrevistado" htmlFor="intervieweeName" required>
            <input
              id="intervieweeName"
              type="text"
              value={values.intervieweeName}
              onChange={(e) => set('intervieweeName', e.target.value)}
              placeholder="Ex: Maria Souza"
              className={inputClass}
            />
            {errors.intervieweeName && (
              <span className="text-xs text-red-500 mt-1">{errors.intervieweeName}</span>
            )}
          </LabeledField>

          <LabeledField label="Cargo" htmlFor="role" required>
            <input
              id="role"
              type="text"
              value={values.role}
              onChange={(e) => set('role', e.target.value)}
              placeholder="Ex: Gerente de Operacoes"
              className={inputClass}
            />
            {errors.role && (
              <span className="text-xs text-red-500 mt-1">{errors.role}</span>
            )}
          </LabeledField>

          <LabeledField label="Area / Departamento" htmlFor="area" required>
            <select
              id="area"
              value={values.area}
              onChange={(e) => set('area', e.target.value)}
              className={inputClass}
            >
              <option value="">Selecione a area...</option>
              <optgroup label="Fabril">
                <option value="Fiacao">Fiacao</option>
                <option value="Tecelagem">Tecelagem</option>
                <option value="Tinturaria">Tinturaria</option>
                <option value="Acabamento">Acabamento</option>
                <option value="Qualidade">Qualidade / Inspecao</option>
                <option value="Manutencao">Manutencao / Engenharia</option>
                <option value="Automacao">Automacao</option>
                <option value="Utilidades">Utilidades / Energia</option>
              </optgroup>
              <optgroup label="Supply Chain">
                <option value="PCP">PCP / Programacao</option>
                <option value="Logistica">Logistica / Expedicao / DPA</option>
                <option value="Suprimentos">Suprimentos / Compras</option>
                <option value="S&OP">S&OP / Planejamento</option>
              </optgroup>
              <optgroup label="Comercial">
                <option value="Comercial">Comercial / Vendas</option>
                <option value="Marketing">Marketing / Desenvolvimento de Produto</option>
              </optgroup>
              <optgroup label="Corporativo">
                <option value="Financeiro">Financeiro / Fiscal</option>
                <option value="Custos">Custos Industriais</option>
                <option value="TI">TI / Sistemas</option>
                <option value="RH">Gente & Gestao / RH</option>
                <option value="Diretoria">Diretoria / Presidencia</option>
                <option value="Juridico">Juridico / Compliance</option>
              </optgroup>
            </select>
            {errors.area && (
              <span className="text-xs text-red-500 mt-1">{errors.area}</span>
            )}
          </LabeledField>

          <LabeledField label="Nivel hierarquico" htmlFor="level">
            <select
              id="level"
              value={values.level}
              onChange={(e) => set('level', e.target.value as HierarchyLevel)}
              className={inputClass}
            >
              {LEVEL_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </LabeledField>

          <LabeledField label="Pilar do assessment" htmlFor="pillar">
            <select
              id="pillar"
              value={values.pillar}
              onChange={(e) => set('pillar', e.target.value as PillarType)}
              className={inputClass}
            >
              {PILLAR_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </LabeledField>

          <LabeledField label="Data da entrevista" htmlFor="date" required>
            <input
              id="date"
              type="date"
              value={values.date}
              onChange={(e) => set('date', e.target.value)}
              className={inputClass}
            />
            {errors.date && (
              <span className="text-xs text-red-500 mt-1">{errors.date}</span>
            )}
          </LabeledField>
        </div>

        {/* Transcript — full width */}
        <LabeledField label="Transcricao da entrevista" htmlFor="transcript" className="mb-5">
          <textarea
            id="transcript"
            value={values.transcript}
            onChange={(e) => set('transcript', e.target.value)}
            rows={8}
            placeholder="Cole aqui a transcricao completa da entrevista..."
            className={clsx(inputClass, 'resize-y min-h-[180px]')}
          />
          <p className="text-xs text-text-secondary mt-1.5">
            Adicionar a transcricao habilita a analise por IA e altera o status para &quot;Concluida&quot;.
          </p>
        </LabeledField>

        {/* Suggested Questions Panel */}
        <div className="bg-surface-2 border border-border rounded-2xl p-5 mb-5">
          <button
            type="button"
            onClick={() => setSuggestionsOpen((prev) => !prev)}
            className="flex items-center gap-2 w-full text-left group"
          >
            <Lightbulb size={16} className="text-accent shrink-0" />
            <span className="font-heading text-sm font-semibold text-text flex-1">
              {questionsLabel}
            </span>
            {suggestionsOpen ? (
              <ChevronUp size={16} className="text-text-tertiary" />
            ) : (
              <ChevronDown size={16} className="text-text-tertiary" />
            )}
          </button>

          {suggestionsOpen && (
            <div className="mt-4 flex flex-col gap-2">
              {suggestedQuestions.map((question, idx) => (
                <div
                  key={idx}
                  className="bg-surface-3 border border-border-subtle rounded-xl p-3 flex items-start gap-3"
                >
                  <span className="font-body text-sm text-text flex-1 leading-relaxed">
                    {question}
                  </span>
                  <button
                    type="button"
                    onClick={() => appendQuestion(question)}
                    title="Adicionar ao transcript"
                    className="shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-lg text-text-tertiary hover:text-accent hover:bg-accent/10 transition-colors duration-150"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ready for AI */}
        <label className="flex items-start gap-3 cursor-pointer group mb-2">
          <input
            id="readyForAI"
            type="checkbox"
            checked={values.readyForAI}
            onChange={(e) => set('readyForAI', e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-accent focus:ring-accent/40 transition-colors duration-200"
          />
          <div>
            <span className="text-sm font-medium text-text">
              Pronto para analise de IA
            </span>
            <p className="text-xs text-text-secondary mt-0.5">
              Marque quando a transcricao estiver revisada e aprovada para processamento.
            </p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onClose} type="button">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {isEditing ? 'Salvar alteracoes' : 'Salvar'}
        </Button>
      </div>
    </form>
  );
};

export default InterviewForm;
