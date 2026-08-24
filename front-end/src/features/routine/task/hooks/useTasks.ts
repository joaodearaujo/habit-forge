import { mapTaskToDomain } from '../mappers/task.mapper';
import type { Task, TaskCreatePayload } from '../types/task.domain.type';
import type { TaskApiResponse } from '../types/task.dto';
import { queryKeys } from '../../queryKeys';
import {
  useCreateResource,
  useDeleteResource,
  useGetResource,
  useUpdateResource,
} from '../../../../shared/hooks/useCrudOperations';
import { useToggleIsCompletedTask } from './useToggleIsCompletedTask';

export const useCreateTask = () =>
  useCreateResource<Task, TaskCreatePayload>('v1/task', queryKeys.task.all, [
    queryKeys.routine.all,
  ]);

export const useUpdateTask = () =>
  useUpdateResource<Partial<{ title: string }>>('v1/task', queryKeys.task.all, [
    queryKeys.routine.all,
  ]);

export const useDeleteTask = () =>
  useDeleteResource('v1/task', queryKeys.task.all, [queryKeys.routine.all]);

export const useGetTasks = () => {
  const query = useGetResource<TaskApiResponse>('v1/task', queryKeys.task.all);
  const mapped = query.data ? mapTaskToDomain(query.data) : [];

  return {
    tasks: mapped,
    task: mapped[0],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};

export function useToggleCompletion() {
  const toggleMutation = useToggleIsCompletedTask();

  const controlCheck =  (taskId: string) => { toggleMutation.mutate(taskId) };

  return {
    controlCheck,
  };
}


