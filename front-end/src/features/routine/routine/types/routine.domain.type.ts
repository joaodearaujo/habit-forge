import type { TaskGroup } from '../../group/types/group.domain.type';

export interface Routine {
  id: string;
  title: string;
  description: string | null;
  groups: TaskGroup[];
}

export type RoutineCreatePayload = {
  title: string;
  description?: string;
  groups: unknown[];
};
