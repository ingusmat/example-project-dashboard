import { useProjectStore } from '@/stores/projectStore';

export function SortSelector() {
  const sortBy = useProjectStore((s) => s.sortBy);
  const sortDirection = useProjectStore((s) => s.sortDirection);
  const setSortBy = useProjectStore((s) => s.setSortBy);
  const setSortDirection = useProjectStore((s) => s.setSortDirection);

  return (
    <div className="flex items-center text-primary dark:text-primary-dark gap-2 text-sm text-text-secondary mb-4">
      <label className="text-text-primary dark:text-text-primary-dark">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as any)}
        className="px-2 py-1 border rounded-md"
      >
        <option value="dueDate">Due Date</option>
        <option value="title">Title</option>
        <option value="owner">Owner</option>
        <option value="reviewer">Reviewer</option>
      </select>

      <select
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value as any)}
        className="px-2 py-1 border rounded-md"
      >
        <option value="asc">↑ Ascending</option>
        <option value="desc">↓ Descending</option>
      </select>
    </div>
  );
}
