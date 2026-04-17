import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  FileText,
  FileCheck2,
  FileSpreadsheet,
  Workflow,
  File,
  Plus,
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useProjectStore } from '../../store/projectStore';
import type { ProjectDocument } from '../../types/project';

const docIcon: Record<ProjectDocument['type'], React.ReactNode> = {
  proposal: <FileText size={18} style={{ color: '#3B82F6' }} />,
  contract: <FileCheck2 size={18} style={{ color: '#10B981' }} />,
  data: <FileSpreadsheet size={18} style={{ color: '#F59E0B' }} />,
  organogram: <Workflow size={18} style={{ color: '#8B5CF6' }} />,
  other: <File size={18} style={{ color: 'var(--t-text-sec)' }} />,
};

const docTypeLabel: Record<ProjectDocument['type'], string> = {
  proposal: 'Proposta',
  contract: 'Contrato',
  data: 'Dados',
  organogram: 'Organograma',
  other: 'Outro',
};

const docTypeBgStyle: Record<ProjectDocument['type'], React.CSSProperties> = {
  proposal: { background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.2)' },
  contract: { background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)' },
  data: { background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.2)' },
  organogram: { background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.2)' },
  other: { background: 'var(--t-surface-alt)', borderColor: 'var(--t-border)' },
};

interface DocRowProps {
  doc: ProjectDocument;
}

const DocRow: React.FC<DocRowProps> = ({ doc }) => {
  const formattedDate = (() => {
    try {
      return format(parseISO(doc.uploadedAt), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return doc.uploadedAt;
    }
  })();

  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: '1px solid var(--t-border)' }}>
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center border shrink-0"
        style={docTypeBgStyle[doc.type]}
      >
        {docIcon[doc.type]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium truncate" style={{ color: 'var(--t-text)' }}>
          {doc.name}
        </p>
        <p className="font-body text-xs" style={{ color: 'var(--t-text-sec)' }}>
          {docTypeLabel[doc.type]} &middot; {formattedDate}
          {doc.size ? ` · ${doc.size}` : ''}
        </p>
      </div>
    </div>
  );
};

const DocumentsPanel: React.FC = () => {
  const project = useProjectStore((s) => s.project);

  if (!project) return null;

  const { documents } = project;

  return (
    <Card
      title="Documentos"
      subtitle={`${documents.length} arquivo${documents.length !== 1 ? 's' : ''}`}
      headerAction={
        <Button
          variant="outline"
          size="sm"
          icon={<Plus size={14} />}
          onClick={() => {
            // UI only — sem upload real
          }}
        >
          Adicionar
        </Button>
      }
    >
      {documents.length === 0 ? (
        <div className="text-center py-8">
          <File size={32} className="mx-auto mb-2" style={{ color: 'var(--t-border)' }} />
          <p className="font-body text-sm" style={{ color: 'var(--t-text-sec)' }}>
            Nenhum documento adicionado.
          </p>
          <p className="font-body text-xs mt-1" style={{ color: 'var(--t-text-sec)' }}>
            Clique em "Adicionar" para incluir arquivos.
          </p>
        </div>
      ) : (
        <div>
          {documents.map((doc) => (
            <DocRow key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default DocumentsPanel;
