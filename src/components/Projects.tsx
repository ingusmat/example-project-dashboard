import { useProjectStore } from '@/stores/projectStore';
import ProjectCard from '@/components/ProjectCard';
import { useEffect } from 'react';
import { mockProjects } from '@/data/mockProjects';
import { FilterBar } from './FilterBar';
import { SortSelector } from './SortSelector';

function ProjectsPage() {
  const { setProjects, filteredProjects } = useProjectStore((state) => ({
    setProjects: state.setProjects,
    filteredProjects: state.filteredProjects(),
  }));

  useEffect(() => {
    setProjects(mockProjects);
  }, [setProjects]);

  return (
    <main className="min-h-screen p-4">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4 text-text-primary dark:text-text-primary-dark">
          Projects
        </h1>
        <SortSelector />
      </header>

      <FilterBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}

export default ProjectsPage;
