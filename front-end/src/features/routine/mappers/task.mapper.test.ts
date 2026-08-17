/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest';
import { mapTaskToDomain } from './task.mapper';
import type { TaskApiResponse } from '../types/routine.dto';

const baseTask = {
  groupId: '70c07f14-4a1b-4892-9285-ac80d57172cb',
  id: '97ad274b-d70d-41a1-a143-921f5739e42a',
  category: 'BODY',
  title: 'Skin Care',
  description: 'Skin Care must to me done at 8:00 AM every day',
  isCompleted: false,
  isCore: true,
};

describe('mapTaskToDomain', () => {
  it('excludes groupId when task has it', () => {
    const input = baseTask;
    const { groupId, ...expectedResult } = input;
    const result = mapTaskToDomain([input]);

    expect(result).toStrictEqual([expectedResult]);
  });

  it('returns an empty array when input is not an array', () => {
    const input = { test: 'test' };
    const result = mapTaskToDomain(input as any);
    expect(result).toStrictEqual([]);
  });

  it('returns an empty array when input is not an array', () => {
    const input = 'string';
    const result = mapTaskToDomain(input as unknown as TaskApiResponse[]);
    expect(result).toStrictEqual([]);
  });
});
