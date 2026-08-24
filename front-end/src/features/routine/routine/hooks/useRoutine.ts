import { mapRoutineToDomain } from '../mappers/routine.mapper';
import type { Routine, RoutineCreatePayload } from '../types/routine.domain.type';
import type { RoutineApiResponse } from '../types/routine.dto';
import { queryKeys } from '../../queryKeys';
import {
  useCreateResource,
  useDeleteResource,
  useGetResource,
  useUpdateResource,
} from '../../../../shared/hooks/useCrudOperations';

export const useCreateRoutine = () =>
  useCreateResource<Routine, RoutineCreatePayload>('v1/routine', queryKeys.routine.all);

export const useUpdateRoutine = () =>
  useUpdateResource<Partial<{ title: string }>>('v1/routine', queryKeys.routine.all);

export const useDeleteRoutine = () =>
  useDeleteResource('v1/routine', queryKeys.routine.all);

export const useGetRoutine = () => {
  const query = useGetResource<RoutineApiResponse[number]>('v1/routine', queryKeys.routine.all);
  const mapped = query.data ? mapRoutineToDomain(query.data) : [];

  return {
    routines: mapped,
    routine: mapped[0],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
