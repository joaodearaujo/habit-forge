import type { Task } from '../../task/types/task.domain.type';

export interface TaskGroup {
  id: string;
  title: string;
  description: string | null;
  tasks: Task[];
}

export type GroupCreatePayload = {
  routineId: string;
  title: string;
  description?: string;
};
