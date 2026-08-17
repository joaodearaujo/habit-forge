import {
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
} from './useCrudOperations';
import type { TaskGroup } from '../types/routine.domain.type';

export const useCreateGroup = () =>
  useCreateResource<
    TaskGroup,
    { routineId: string; title: string; description?: string }
  >('v1/task-group', ['v1/routine']);

export const useUpdateGroup = () =>
  useUpdateResource<Partial<{ title: string }>>('v1/task-group', [
    'v1/routine',
  ]);

export const useDeleteGroup = () =>
  useDeleteResource('v1/task-group', ['v1/routine']);
