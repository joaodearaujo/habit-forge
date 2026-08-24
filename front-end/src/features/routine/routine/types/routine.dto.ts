import type { GroupApiResponse } from '../../group/types/group.dto';

export type RoutineApiResponse = Array<{
  id: string;
  title: string;
  description: string | null;
  groups: GroupApiResponse[];
}>;
