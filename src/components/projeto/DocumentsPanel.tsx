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
  proposal: <FileText size={18} className="text-blue-500" />,
  contract: <FileCheck2 size={18} className="text-emerald-500" />,
  data: <FileSpreadsheet size={18} className="text-amber-500" />,
  organogram: <Workflow size={18} className="text-violet-500" />,
  other: <File size={18} className="text-text-muted" />,
};

const docTypeLabel: Record<ProjectDocument['type'], string> = {
  proposal: 'Proposta',
  contract: 'Contrato',
  data: 'Dados',
  organogram: 'Organograma',
  other: 'Outro',
};

const docTypeBg: Record<ProjectDocument['type'], string> = {
  proposal: 'bg-blue-50 border-blue-100',
  contract: 'bg-emerald-50 border-emerald-100',
  data: 'bg-amber-50 border-amber-100',
  organogram: 'bg-violet-50 border-violet-100',
  other: 'bg-surface border-border',
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
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      {/* Icon */}
      <div
        className={[
          'w-9 h-9 rounded-lg flex items-center justify-center border shrink-0',
          docTypeBg[doc.type],
        ].join(' ')}
      >
        {docIcon[doc.type]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-primary truncate">
          {doc.name}
        </p>
        <p className="font-body text-xs text-text-muted">
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
          <File size={32} className="text-border mx-auto mb-2" />
          <p className="font-body text-sm text-text-muted">
            Nenhum documento adicionado.
          </p>
          <p className="font-body text-xs text-text-muted mt-1">
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
