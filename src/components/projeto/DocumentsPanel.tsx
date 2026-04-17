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
  proposal: <FileText size={18} className="text-info" />,
  contract: <FileCheck2 size={18} className="text-success" />,
  data: <FileSpreadsheet size={18} className="text-warning" />,
  organogram: <Workflow size={18} className="text-violet-500" />,
  other: <File size={18} className="text-text-secondary" />,
};

const docTypeLabel: Record<ProjectDocument['type'], string> = {
  proposal: 'Proposta',
  contract: 'Contrato',
  data: 'Dados',
  organogram: 'Organograma',
  other: 'Outro',
};

const docTypeBgClass: Record<ProjectDocument['type'], string> = {
  proposal: 'bg-info/10 border-info/20',
  contract: 'bg-success/10 border-success/20',
  data: 'bg-warning/10 border-warning/20',
  organogram: 'bg-violet-500/10 border-violet-500/20',
  other: 'bg-surface-3 border-border',
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
    <div className="flex items-center gap-3 py-2.5 border-b border-border">
      {/* Icon */}
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${docTypeBgClass[doc.type]}`}
      >
        {docIcon[doc.type]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium truncate text-text">
          {doc.name}
        </p>
        <p className="font-body text-xs text-text-secondary">
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
          <File size={32} className="mx-auto mb-2 text-border" />
          <p className="font-body text-sm text-text-secondary">
            Nenhum documento adicionado.
          </p>
          <p className="font-body text-xs mt-1 text-text-secondary">
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
