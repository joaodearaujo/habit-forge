import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { api } from '@/shared/api/api';

function invalidate(queryClient: ReturnType<typeof useQueryClient>, keys: QueryKey[]) {
  keys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }));
}

export function useCreateResource<TResponse, TBody>(
  resource: string,
  queryKey: QueryKey,
  extraInvalidateKeys: QueryKey[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: TBody) => api.post<TResponse, TBody>(resource, body),
    onSuccess: () => invalidate(queryClient, [queryKey, ...extraInvalidateKeys]),
  });
}

export function useUpdateResource<TBody>(
  resource: string,
  queryKey: QueryKey,
  extraInvalidateKeys: QueryKey[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: TBody }) =>
      api.patch<void, TBody>(resource, id, body),
    onSuccess: () => invalidate(queryClient, [queryKey, ...extraInvalidateKeys]),
  });
}

export function useDeleteResource(
  resource: string,
  queryKey: QueryKey,
  extraInvalidateKeys: QueryKey[] = [],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(resource, id),
    onSuccess: () => invalidate(queryClient, [queryKey, ...extraInvalidateKeys]),
  });
}

export function useGetResource<T>(resource: string, queryKey: QueryKey) {
  return useQuery({
    queryKey,
    queryFn: () => api.get<T[]>(resource),
  });
}
