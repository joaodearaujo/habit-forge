import { ProgressRing } from '@/components/Header/ProgressRing';
import { useAuth } from '@/context/AuthContext';
import { useGetTask } from '@/features/routine/hooks/useTasks';

const getPartOfDay = (date: Date) => {
  const hour = date.getHours();

  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';

  return 'Evening';
};

const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

const partOfTheDay = getPartOfDay(date);

export function Greeting() {
  const { tasks } = useGetTask();
  const { user } = useAuth();

  const current = tasks.filter(
    (task) => task.isCompleted && task.isCore,
  ).length;
  const total = tasks.filter((task) => task.isCore).length;

  return (
    <div className="w-full h-full flex bg-surface rounded-xl p-4 items-center border-2 border-b-6 border-surface2">
      <div className="flex-1 h-full flex flex-col gap-0.5 mr-4 text-left">
        <h1 className="text-ink font-semibold text-xl font-secondary">
          Good {partOfTheDay}, {user?.name}!
        </h1>
        <p className="text-muted text-sm">{formattedDate}</p>
      </div>
      <ProgressRing current={current} total={total} />
    </div>
  );
}
