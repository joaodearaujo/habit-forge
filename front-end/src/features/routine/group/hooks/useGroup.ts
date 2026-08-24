import {
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
} from '../../../../shared/hooks/useCrudOperations';
import type { TaskGroup } from '../types/group.domain.type';
import { queryKeys } from '../../queryKeys';

export const useCreateGroup = () =>
  useCreateResource<
    TaskGroup,
    { routineId: string; title: string; description?: string }
  >('v1/task-group', queryKeys.group.all, [queryKeys.routine.all]);

export const useUpdateGroup = () =>
  useUpdateResource<Partial<{ title: string }>>(
    'v1/task-group',
    queryKeys.group.all,
    [queryKeys.routine.all],
  );

export const useDeleteGroup = () =>
  useDeleteResource('v1/task-group', queryKeys.group.all, [queryKeys.routine.all]);
