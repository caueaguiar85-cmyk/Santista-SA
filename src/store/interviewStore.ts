import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Interview, PillarType, InterviewStatus, AIInsights } from '../types/interview';

interface InterviewState {
  interviews: Interview[];

  // Actions
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, partial: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
  setInterviews: (interviews: Interview[]) => void;
  getByPillar: (pillar: PillarType) => Interview[];
  getByStatus: (status: InterviewStatus) => Interview[];
  updateAIInsights: (id: string, insights: AIInsights) => void;
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set, get) => ({
      interviews: [],

      addInterview: (interview) =>
        set((state) => ({
          interviews: [...state.interviews, interview],
        })),

      updateInterview: (id, partial) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id ? { ...interview, ...partial } : interview
          ),
        })),

      deleteInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.filter((interview) => interview.id !== id),
        })),

      setInterviews: (interviews) =>
        set({ interviews }),

      getByPillar: (pillar) =>
        get().interviews.filter((interview) => interview.pillar === pillar),

      getByStatus: (status) =>
        get().interviews.filter((interview) => interview.status === status),

      updateAIInsights: (id, insights) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id
              ? { ...interview, aiInsights: insights, status: 'analyzed' as InterviewStatus }
              : interview
          ),
        })),
    }),
    {
      name: 'stoken-interviews',
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
