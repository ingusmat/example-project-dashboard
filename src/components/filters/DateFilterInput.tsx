import { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';

export function DateFilterInput({ onApplied }: { onApplied: () => void }) {
  const [selectedDate, setSelectedDate] = useState('');
  const setFilter = useProjectStore((state) => state.setFilter);

  const handleApply = () => {
    if (!selectedDate) return;
    setFilter('dueDate', selectedDate);
    onApplied();
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        className="h-10 px-3 py-1 border border-border dark:border-border-dark rounded-md"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
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
