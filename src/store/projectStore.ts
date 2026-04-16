import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project, Milestone, ProjectDocument } from '../types/project';

interface ProjectState {
  project: Project | null;

  // Actions
  setProject: (project: Project) => void;
  updateMilestone: (id: string, status: Milestone['status']) => void;
  addDocument: (document: ProjectDocument) => void;
  updateCompletionPercent: (percent: number) => void;
  updateContext: (context: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      project: null,

      setProject: (project) =>
        set({ project }),

      updateMilestone: (id, status) =>
        set((state) => {
          if (!state.project) return state;
          return {
            project: {
              ...state.project,
              milestones: state.project.milestones.map((m) =>
                m.id === id ? { ...m, status } : m
              ),
            },
          };
        }),

      addDocument: (document) =>
        set((state) => {
          if (!state.project) return state;
          return {
            project: {
              ...state.project,
              documents: [...state.project.documents, document],
            },
          };
        }),

      updateCompletionPercent: (percent) =>
        set((state) => {
          if (!state.project) return state;
          return {
            project: {
              ...state.project,
              completionPercent: percent,
            },
          };
        }),

      updateContext: (context) =>
        set((state) => {
          if (!state.project) return state;
          return {
            project: {
              ...state.project,
              context,
            },
          };
        }),
    }),
    {
      name: 'stoken-project',
      storage: {
        getItem: (key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);
