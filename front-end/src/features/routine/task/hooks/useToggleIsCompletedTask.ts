import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/api';
import { queryKeys } from '../../queryKeys';
import type { RoutineApiResponse } from '../../routine/types/routine.dto';

export function useToggleIsCompletedTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      api.patch<void, void>('v1/task/toggleComplete', taskId, undefined),

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ //it stops cache updating 
        queryKey: queryKeys.routine.all,
      });

      const previousRoutines =
        queryClient.getQueryData<RoutineApiResponse>(
          queryKeys.routine.all,
      );
      
      queryClient.setQueryData<RoutineApiResponse>(
        queryKeys.routine.all,
        (currentRoutines) => {
          if (!currentRoutines) return currentRoutines;

          return currentRoutines.map((routine) => ({
            ...routine,
            groups: routine.groups.map((group) => ({
              ...group,
              tasks: group.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      isCompleted: !task.isCompleted,
                    }
                  : task,
              ),
            })),
          }));
        },
      );

      return {
        previousRoutines,
      };
    },

    onError: (_error, _taskId, context) => {
      if (!context?.previousRoutines) return;

      queryClient.setQueryData(
        queryKeys.routine.all,
        context.previousRoutines,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.routine.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.task.all,
      });
    },
  });
}