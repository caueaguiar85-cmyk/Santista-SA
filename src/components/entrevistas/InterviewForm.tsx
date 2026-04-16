import React, { useEffect, useState } from 'react';
import type { Interview, PillarType, HierarchyLevel } from '../../types/interview';
import { PILLAR_LABELS, HIERARCHY_LABELS } from '../../types/interview';
import { useInterviewStore } from '../../store/interviewStore';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const PILLAR_OPTIONS = Object.entries(PILLAR_LABELS) as [PillarType, string][];
const LEVEL_OPTIONS  = Object.entries(HIERARCHY_LABELS) as [HierarchyLevel, string][];

interface FormValues {
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

interface LabeledFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

const LabeledField: React.FC<LabeledFieldProps> = ({ label, htmlFor, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className="font-body text-sm font-medium text-primary">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputClass = [
  'w-full rounded-lg border border-border bg-surface px-3 py-2',
  'font-body text-sm text-primary placeholder:text-primary/40',
  'transition-colors duration-200',
  'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
].join(' ');

interface InterviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  editInterview?: Interview;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ isOpen, onClose, editInterview }) => {
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const addInterview    = useInterviewStore((s) => s.addInterview);
  const updateInterview = useInterviewStore((s) => s.updateInterview);

  // Populate form when editing
  useEffect(() => {
    if (editInterview) {
      setValues({
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
  }, [editInterview, isOpen]);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.intervieweeName.trim()) newErrors.intervieweeName = 'Nome e obrigatorio';
    if (!values.role.trim())            newErrors.role            = 'Cargo e obrigatorio';
    if (!values.area.trim())            newErrors.area            = 'Area e obrigatoria';
    if (!values.date)                   newErrors.date            = 'Data e obrigatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Entrevista' : 'Nova Entrevista'}
      size="lg"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Row 1: name + date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <span className="font-body text-xs text-red-500">{errors.intervieweeName}</span>
            )}
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
              <span className="font-body text-xs text-red-500">{errors.date}</span>
            )}
          </LabeledField>
        </div>

        {/* Row 2: role + area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <span className="font-body text-xs text-red-500">{errors.role}</span>
            )}
          </LabeledField>

          <LabeledField label="Area" htmlFor="area" required>
            <input
              id="area"
              type="text"
              value={values.area}
              onChange={(e) => set('area', e.target.value)}
              placeholder="Ex: Logistica"
              className={inputClass}
            />
            {errors.area && (
              <span className="font-body text-xs text-red-500">{errors.area}</span>
            )}
          </LabeledField>
        </div>

        {/* Row 3: level + pillar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        {/* Transcript */}
        <LabeledField label="Transcricao da entrevista" htmlFor="transcript">
          <textarea
            id="transcript"
            value={values.transcript}
            onChange={(e) => set('transcript', e.target.value)}
            rows={6}
            placeholder="Cole aqui a transcricao completa da entrevista..."
            className={[inputClass, 'resize-y min-h-[120px]'].join(' ')}
          />
          <p className="font-body text-xs text-primary/40">
            Adicionar a transcricao habilita a analise por IA e altera o status para &quot;Concluida&quot;.
          </p>
        </LabeledField>

        {/* Ready for AI */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            id="readyForAI"
            type="checkbox"
            checked={values.readyForAI}
            onChange={(e) => set('readyForAI', e.target.checked)}
            className={[
              'mt-0.5 h-4 w-4 shrink-0 rounded border-border',
              'text-accent focus:ring-accent/40',
              'transition-colors duration-200',
            ].join(' ')}
          />
          <div>
            <span className="font-body text-sm font-medium text-primary">
              Pronto para analise de IA
            </span>
            <p className="font-body text-xs text-primary/50 mt-0.5">
              Marque quando a transcricao estiver revisada e aprovada para processamento.
            </p>
          </div>
        </label>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Salvar alteracoes' : 'Criar entrevista'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default InterviewForm;
