import { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';

const STATUS_OPTIONS = [
  { label: 'Approved', value: 'approved' },
  { label: 'Waiting Approval', value: 'waiting_approval' },
  { label: 'In Progress', value: 'in_progress' },
];

export function StatusFilterInput({ onApplied }: { onApplied: () => void }) {
  const [selected, setSelected] = useState('');
  const setFilter = useProjectStore((state) => state.setFilter);

  const handleApply = () => {
    if (!selected) return;
    setFilter('status', selected);
    onApplied(); // collapse or reset parent UI
  };

  return (
    <div className="flex items-center gap-2">
      <select
        className="h-10 px-3 py-1 border border-border dark:border-border-dark rounded-md"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Select status</option>
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        onClick={handleApply}
        className="h-10 text-sm px-2 py-1 bg-accent text-white rounded hover:bg-accent-light"
      >
        Apply
      </button>
    </div>
  );
}
