import { mapTaskToDomain } from '../mappers/task.mapper';
import type { Task } from '../types/routine.domain.type';
import {
  useCreateResource,
  useDeleteResource,
  useGetResource,
  useUpdateResource,
} from './useCrudOperations';

export const useCreateTask = () =>
  useCreateResource<Task, Omit<Task, 'id'>>('v1/task', ['v1/routine']);

export const useToggleIsCompletedTask = () =>
  useUpdateResource<Partial<Omit<Task, 'id'>>>('v1/task/toggleComplete', [
    'v1/routine',
    'v1/task',
  ]);

export const useUpdateTask = () =>
  useUpdateResource<Partial<{ title: string }>>('v1/task', ['v1/routine']);

export const useDeleteTask = () => useDeleteResource('v1/task', ['v1/routine']);

export const useGetTask = () => {
  const query = useGetResource<Task>('v1/task');

  const mapped = query.data ? mapTaskToDomain(query.data) : [];

  return {
    tasks: mapped,
    task: mapped[0],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
