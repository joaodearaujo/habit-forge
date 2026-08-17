import { mapRoutineToDomain } from '../mappers/routine.mapper';
import type { Routine } from '../types/routine.domain.type';
import {
  useCreateResource,
  useDeleteResource,
  useGetResource,
  useUpdateResource,
} from './useCrudOperations';

export const useCreateRoutine = () =>
  useCreateResource<Routine, Omit<Routine, 'id'>>('v1/routine');
export const useUpdateRoutine = () =>
  useUpdateResource<Partial<{ title: string }>>('v1/routine');
export const useDeleteRoutine = () => useDeleteResource('v1/routine');
export const useGetRoutine = () => {
  const query = useGetResource<Routine>('v1/routine');

  const mapped = query.data ? mapRoutineToDomain(query.data) : [];

  return {
    routines: mapped,
    routine: mapped[0],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
