export interface Milestone {
  id: string;
  label: string;
  date: string;
  status: 'pending' | 'in_progress' | 'completed';
  phase: 1 | 2 | 3;
  deliverable?: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: 'proposal' | 'contract' | 'data' | 'organogram' | 'other';
  uploadedAt: string;
  size?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  allocation: number; // percentage
}

export interface Project {
  id: string;
  name: string;
  client: string;
  sector: string;
  revenue: string;
  employees: number;
  factories: number;
  startDate: string;
  endDate: string;
  currentPhase: number;
  completionPercent: number;
  milestones: Milestone[];
  documents: ProjectDocument[];
  team: TeamMember[];
  context: string;
}
