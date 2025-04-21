import { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';

const OWNER_OPTIONS = ['Sam Carter', 'Jamie Lin', 'Alex Patel', 'Morgan Smith', 'Riley Jones'];
const REVIEWER_OPTIONS = [
  'Dana Kim',
  'Taylor Brooks',
  'Jordan Lee',
  'Casey Nguyen',
  'Skyler Adams',
];

type UserFilterInputProps = {
  role: 'owner' | 'reviewer';
  onApplied: () => void;
};

export function UserFilterInput({ role, onApplied }: UserFilterInputProps) {
  const [selected, setSelected] = useState('');
  const setFilter = useProjectStore((state) => state.setFilter);

  const OPTIONS = role === 'owner' ? OWNER_OPTIONS : REVIEWER_OPTIONS;

  const handleApply = () => {
    if (!selected) return;
    setFilter(role, selected);
    onApplied();
  };

  return (
    <div className="flex items-center gap-2">
      <select
        className="h-10 px-3 py-1 border border-border dark:border-border-dark rounded-md"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">Select {role}</option>
        {OPTIONS.map((name) => (
          <option key={name} value={name}>
            {name}
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
