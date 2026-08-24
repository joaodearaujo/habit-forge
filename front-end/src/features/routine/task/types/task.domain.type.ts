export type Category = 'BODY' | 'CARE' | 'MIND' | 'STUDY';

export interface Task {
  id: string;
  category: Category;
  title: string;
  description: string | null;
  isCompleted: boolean;
  isCore: boolean;
}

export type TaskCreatePayload = {
  groupId: string;
  category: Category;
  title: string;
  description?: string;
  isCompleted: boolean;
  isCore: boolean;
};
