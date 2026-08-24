import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/api';

export function useCreateResource<TResponse, TBody>(
  resource: string,
  extraInvalidateKeys: string[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TBody) => api.post<TResponse, TBody>(resource, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      extraInvalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      );
    },
  });
}

export function useUpdateResource<TBody>(
  resource: string,
  extraInvalidateKeys: string[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: TBody }) =>
      api.patch<TBody>(resource, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      extraInvalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      );
    },
  });
}

export function useDeleteResource(
  resource: string,
  extraInvalidateKeys: string[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(resource, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resource] });
      extraInvalidateKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      );
    },
  });
}

export function useGetResource<T>(resource: string) {
  return useQuery({
    queryKey: [resource],
    queryFn: () => api.get<T[]>(resource),
  });
}
