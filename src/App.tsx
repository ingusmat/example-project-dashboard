import React from 'react';
import ProjectsPage from './components/Projects';

function App() {
  return (
    <main className="min-h-screen p-4 bg-bg dark:bg-bg-dark">
      <h1 className="text-2xl font-bold text-accent">Example Project Dashboard</h1>
      <ProjectsPage />
    </main>
  );
}

export default App;
