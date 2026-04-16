import React, { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import type { PillarType, HierarchyLevel, InterviewStatus } from '../../types/interview';
import { useInterviewStore } from '../../store/interviewStore';
import InterviewCard from './InterviewCard';
import InterviewDetail from './InterviewDetail';
import Modal from '../ui/Modal';

export interface InterviewListFilters {
  pillar?: PillarType | '';
  level?: HierarchyLevel | '';
  status?: InterviewStatus | '';
}

interface InterviewListProps {
  filters?: InterviewListFilters;
}

const InterviewList: React.FC<InterviewListProps> = ({ filters = {} }) => {
  const interviews = useInterviewStore((s) => s.interviews);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return interviews.filter((interview) => {
      if (filters.pillar  && interview.pillar  !== filters.pillar)  return false;
      if (filters.level   && interview.level   !== filters.level)   return false;
      if (filters.status  && interview.status  !== filters.status)  return false;
      return true;
    });
  }, [interviews, filters.pillar, filters.level, filters.status]);

  const selectedInterview = useMemo(
    () => (selectedId ? interviews.find((i) => i.id === selectedId) ?? null : null),
    [selectedId, interviews]
  );

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div
          className="h-14 w-14 rounded-full bg-surface border border-border flex items-center justify-center"
          aria-hidden="true"
        >
          <Users size={24} className="text-primary/30" />
        </div>
        <p className="font-heading text-base font-semibold text-primary/50">
          Nenhuma entrevista encontrada
        </p>
        <p className="font-body text-sm text-primary/40 max-w-xs">
          Ajuste os filtros ou crie uma nova entrevista para comecar.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        role="list"
        aria-label="Lista de entrevistas"
      >
        {filtered.map((interview) => (
          <div key={interview.id} role="listitem">
            <InterviewCard
              interview={interview}
              onClick={() => setSelectedId(interview.id)}
            />
          </div>
        ))}
      </div>

      {/* Detail modal */}
      <Modal
        isOpen={Boolean(selectedInterview)}
        onClose={() => setSelectedId(null)}
        size="xl"
      >
        {selectedInterview && (
          <InterviewDetail
            interview={selectedInterview}
            onClose={() => setSelectedId(null)}
          />
        )}
      </Modal>
    </>
  );
};

export default InterviewList;
