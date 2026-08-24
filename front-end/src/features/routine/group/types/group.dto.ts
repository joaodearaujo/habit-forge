import type { TaskApiResponse } from '../../task/types/task.dto';

export type GroupApiResponse = {
  routineId: string;
  id: string;
  title: string;
  description: string | null;
  tasks: TaskApiResponse[];
};
