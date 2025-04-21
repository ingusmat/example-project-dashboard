import { create } from 'zustand';
import { Project, ProjectStatus } from '@/models/Project';

export type FilterKey =
  | 'dueDate'
  | 'owner'
  | 'reviewer'
  | 'status'
  | 'tags'
  | 'search'
  | 'isOverdue';

export interface ProjectFilters {
  dueDate?: string;
  owner?: string;
  reviewer?: string;
  status?: ProjectStatus;
  tags?: string[];
  search?: string;
}

interface ProjectStore {
  projects: Project[];
  filters: ProjectFilters;
  setProjects: (projects: Project[]) => void;
  setFilter: (key: FilterKey, value: any) => void;
  clearFilter: (key: FilterKey) => void;
  clearAllFilters: () => void;
  getByStatus: (status: ProjectStatus) => Project[];
  getById: (id: string) => Project | undefined;
  filteredProjects: () => Project[];
  sortBy: SortField;
  sortDirection: SortDirection;
  setSortBy: (field: SortField) => void;
  setSortDirection: (dir: SortDirection) => void;
}

type SortField = 'dueDate' | 'title' | 'owner' | 'reviewer';
type SortDirection = 'asc' | 'desc';

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  filters: {},
  sortBy: 'dueDate',
  sortDirection: 'asc',

  setSortBy: (field: SortField) => set({ sortBy: field }),
  setSortDirection: (dir: SortDirection) => set({ sortDirection: dir }),

  setProjects: (projects) => set({ projects }),

  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),

  clearFilter: (key) =>
    set((state) => {
      const updated = { ...state.filters };
      delete updated[key];
      return { filters: updated };
    }),

  clearAllFilters: () => set({ filters: {} }),

  getByStatus: (status) => get().projects.filter((p) => p.status === status),

  getById: (id) => get().projects.find((p) => p.id === id),

  filteredProjects: () => {
    const { projects, filters, sortBy, sortDirection } = get();

    const filtered = projects.filter((p) => {
      if (filters.status && p.status !== filters.status) return false;
      if (filters.owner && p.owner !== filters.owner) return false;
      if (filters.reviewer && p.reviewer !== filters.reviewer) return false;
      if (filters.dueDate && p.dueDate !== filters.dueDate) return false;
      if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase()))
        return false;

      if (filters.tags && filters.tags.length > 0) {
        // Tag logic placeholder
        return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {
      const dir = sortDirection === 'asc' ? 1 : -1;

      if (sortBy === 'dueDate') {
        return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * dir;
      }

      const aVal = (a[sortBy] ?? '').toString().toLowerCase();
      const bVal = (b[sortBy] ?? '').toString().toLowerCase();

      return aVal.localeCompare(bVal) * dir;
    });
  },
}));
