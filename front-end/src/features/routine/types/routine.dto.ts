export type RoutineApiResponse = Array<{
  id: string;
  title: string;
  description: string | null;
  groups: GroupApiResponse[];
}>;

export type GroupApiResponse = {
  routineId: string;
  id: string;
  title: string;
  description: string | null;
  tasks: TaskApiResponse[];
};

export type TaskApiResponse = {
  groupId: string;
  id: string;
  category: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  isCore: boolean;
};
