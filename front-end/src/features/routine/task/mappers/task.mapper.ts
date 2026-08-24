import type { Task } from '../types/task.domain.type';
import type { TaskApiResponse } from '../types/task.dto';

export const mapTaskToDomain = (tasks: TaskApiResponse[]): Task[] => {
  if (!Array.isArray(tasks)) return [];

  return tasks.map((task) => ({
    id: task.id,
    category: task.category as Task['category'],
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
    isCore: task.isCore,
  }));
};
