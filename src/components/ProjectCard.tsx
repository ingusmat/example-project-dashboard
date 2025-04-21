import {
  Briefcase,
  Calendar,
  CalendarClock,
  CheckCheck,
  ClipboardCheck,
  FolderOpenDot,
  Hourglass,
  MoreHorizontal,
  ShieldCheck,
  User,
} from 'lucide-react';
import clsx from 'clsx';
import { Project } from '@/models/Project';
import { useMemo } from 'react';

export default function ProjectCard({ project }: { project: Project }) {
  const percentApproved =
    project.totalQuestions > 0 ? (project.approvedCount / project.totalQuestions) * 100 : 0;
  console.log(project);

  // Map statuses to Tailwind-safe color classes
  const statusColorBar = clsx({
    'bg-status-error': project.isPastDue === true,
    'bg-status-approved': project.status === 'approved',
    'bg-status-pending': project.status === 'waiting_approval' && project.isPastDue === false,
  });

  const statusProgress = clsx({
    'bg-status-error': project.isPastDue === true,
    'bg-status-approved': project.status === 'approved',
    'bg-status-pending': project.status === 'waiting_approval',
  });

  const statusIcon = useMemo(() => {
    if (project.isPastDue) {
      return <CalendarClock className="w-6 h-6 m-2" />;
    }

    if (project.status === 'approved') {
      return <ClipboardCheck className="w-6 h-6 m-2" />;
    }

    return <Hourglass className="w-6 h-6 m-2" />;
  }, [project.status]);

  return (
    <div className="flex rounded-xl shadow-md overflow-hidden bg-card dark:bg-card-dark text-text-primary dark:text-text-primary-dark">
      {/* Color Bar */}
      <div className={clsx(statusColorBar)}>
        {/* Status Icon */}
        {statusIcon}
      </div>
      {/* Card Content */}
      <div className="flex flex-col flex-1 p-2 px-4 gap-2">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-primary dark:text-primary-dark font-semibold mb-2">
              <span>{project.title}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-text-secondary dark:text-text-secondary-dark">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
          <MoreHorizontal className="text-icon-muted w-5 h-5" />
        </div>

        {/* Status Count Row */}
        <div className="flex items-center gap-6 font-medium text-sm">
          <div className="flex items-center gap-1">
            <Hourglass className="w-4 h-4" />
            {project.pendingCount}
          </div>
          <div className="flex items-center gap-1">
            <CheckCheck className="w-4 h-4" />
            {project.approvedCount}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 rounded-full bg-border dark:bg-border-dark overflow-hidden">
          <div
            className={clsx('h-full', statusProgress)}
            style={{ width: `${percentApproved}%` }}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-text-secondary dark:text-text-secondary-dark mt-2">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {project.owner}
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            {project.reviewer}
          </div>
        </div>
      </div>
    </div>
  );
}
