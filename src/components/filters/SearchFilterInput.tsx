import { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';

export function SearchFilterInput({ onApplied }: { onApplied: () => void }) {
  const [query, setQuery] = useState('');
  const setFilter = useProjectStore((state) => state.setFilter);

  const handleApply = () => {
    if (!query.trim()) return;
    setFilter('search', query.trim());
    onApplied();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search by title"
        className="h-10 px-3 py-1 border border-border dark:border-border-dark rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleApply}
        className="h-10 text-sm px-2 py-1 bg-accent text-white rounded hover:bg-accent-light"
      >
        Apply
      </button>
    </div>
  );
}
