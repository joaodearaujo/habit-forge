export interface Task {
  id: string;
  category: 'BODY' | 'CARE' | 'MIND' | 'STUDY';
  title: string;
  description: string | null;
  isCompleted: boolean;
  isCore: boolean;
}

export interface TaskGroup {
  id: string;
  title: string;
  description: string | null;
  tasks: Task[];
}

export interface Routine {
  id: string;
  title: string;
  description: string | null;
  groups: TaskGroup[];
}
