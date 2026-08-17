import { z } from 'zod';

export const TaskApiSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string().optional(),
  isCompleted: z.boolean(),
  isCore: z.boolean(),
});

export const TaskGroupApiSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  tasks: z.array(TaskApiSchema),
});

export const RoutineApiSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    groups: z.array(TaskGroupApiSchema),
  }),
);

export type RoutineDto = z.infer<typeof RoutineApiSchema>;
