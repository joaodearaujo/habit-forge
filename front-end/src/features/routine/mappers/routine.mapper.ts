import type {
  Routine,
  Task,
} from '@/features/routine/types/routine.domain.type';
import type { RoutineApiResponse } from '@/features/routine/types/routine.dto';

export const mapRoutineToDomain = (data: RoutineApiResponse): Routine[] => {
  return data.map((routine) => ({
    id: routine.id,
    title: routine.title,
    description: routine.description,
    groups: routine.groups.map((group) => ({
      routineId: routine.id,
      id: group.id,
      title: group.title,
      description: group.description,
      tasks: group.tasks.map((task) => ({
        groupId: group.id,
        id: task.id,
        category: task.category as Task['category'],
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        isCore: task.isCore,
      })),
    })),
  }));
};
