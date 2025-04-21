import { useState } from 'react';
import { Funnel, FunnelPlus, X } from 'lucide-react';
import clsx from 'clsx';
import { useProjectStore } from '@/stores/projectStore';
import { UserFilterInput } from './filters/UserFilterInput';
import { StatusFilterInput } from './filters/StatusFilterInput';
import { DateFilterInput } from './filters/DateFilterInput';
import { SearchFilterInput } from './filters/SearchFilterInput';

const filterOptions = ['status', 'dueDate', 'owner', 'reviewer', 'search'] as const;
type FilterOption = (typeof filterOptions)[number];

export function FilterBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | ''>('');

  const filters = useProjectStore((state) => state.filters);
  const clearFilter = useProjectStore((state) => state.clearFilter);
  const availableFilters = filterOptions.filter((opt) => !filters[opt]);

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {/* Icon Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="h-10 p-2 rounded-md hover:bg-bg/70 transition bg-bg"
      >
        {menuOpen ? (
          <FunnelPlus className="w-5 h-5 text-primary dark:text-primary-dark" />
        ) : (
          <Funnel className="w-5 h-5 text-primary dark:text-primary-dark" />
        )}
      </button>

      {menuOpen && availableFilters.length > 0 && (
        <select
          className="h-10 px-3 py-1 border border-border dark:border-border-dark rounded-md"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value as FilterOption)}
        >
          <option value="">Select a filter</option>
          {availableFilters.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {menuOpen && (selectedFilter === 'owner' || selectedFilter === 'reviewer') && (
        <UserFilterInput
          role={selectedFilter}
          onApplied={() => {
            setSelectedFilter('');
          }}
        />
      )}

      {menuOpen && selectedFilter === 'status' && (
        <StatusFilterInput
          onApplied={() => {
            setMenuOpen(false);
            setSelectedFilter('');
          }}
        />
      )}
      {menuOpen && selectedFilter === 'dueDate' && (
        <DateFilterInput
          onApplied={() => {
            setMenuOpen(false);
            setSelectedFilter('');
          }}
        />
      )}

      {menuOpen && selectedFilter === 'search' && (
        <SearchFilterInput
          onApplied={() => {
            setMenuOpen(false);
            setSelectedFilter('');
          }}
        />
      )}

      {menuOpen && availableFilters.length === 0 && (
        <div className="text-sm italic text-text-secondary">All filters applied</div>
      )}

      {/* Applied Filters */}
      {Object.entries(filters).map(([key, value]) =>
        value ? (
          <div key={key} className="flex items-center gap-1 px-2 py-1 bg-bg rounded-md text-sm">
            <span className="capitalize">{key}:</span>
            <span>{value}</span>
            <button onClick={() => clearFilter(key as keyof typeof filters)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : null,
      )}
    </div>
  );
}
