export type ProjectStatus = 'waiting_approval' | 'approved' | 'past_due' | 'rejected';

export interface Project {
  id: string;
  title: string;
  dueDate: string; // ISO string like '2025-04-14'
  totalQuestions: number;
  approvedCount: number;
  pendingCount: number;
  status: ProjectStatus;
  isPastDue?: boolean;

  // Meta
  owner: string; // Deal owner (salesperson)
  reviewer: string; // Deal reviewer (SME manager)
}

const exampleProject: Project = {
  id: 'proj-001',
  title: 'security_questionnaire_v1',
  dueDate: '2025-04-14',
  totalQuestions: 21,
  approvedCount: 0,
  pendingCount: 21,
  status: 'waiting_approval',
  isPastDue: false,
  owner: 'Mike',
  reviewer: 'Mike Song',
};
