export type TaskApiResponse = {
  groupId: string;
  id: string;
  category: string;
  title: string;
  description: string | null;
  isCompleted: boolean;
  isCore: boolean;
};
