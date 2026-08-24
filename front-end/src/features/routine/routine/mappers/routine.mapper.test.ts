import { describe, it, expect } from 'vitest';
import { mapRoutineToDomain } from './routine.mapper';

const taskDto = {
  groupId: 'group-1',
  id: 'task-1',
  category: 'BODY',
  title: 'Skin Care',
  description: '3 steps for combination skin.',
  isCompleted: false,
  isCore: true,
};

const groupDto = {
  routineId: 'routine-1',
  id: 'group-1',
  title: 'Morning',
  description: 'Morning essential tasks',
  tasks: [taskDto],
};

const routineDto = {
  id: 'routine-1',
  title: 'Daily',
  description: 'Your daily organized like you want',
  groups: [groupDto],
};

describe('mapRoutineToDomain', () => {
  it('maps nested API data to domain data without transport-only parent ids', () => {
    const result = mapRoutineToDomain([routineDto]);

    expect(result).toStrictEqual([
      {
        id: 'routine-1',
        title: 'Daily',
        description: 'Your daily organized like you want',
        groups: [
          {
            id: 'group-1',
            title: 'Morning',
            description: 'Morning essential tasks',
            tasks: [
              {
                id: 'task-1',
                category: 'BODY',
                title: 'Skin Care',
                description: '3 steps for combination skin.',
                isCompleted: false,
                isCore: true,
              },
            ],
          },
        ],
      },
    ]);
  });

  it('preserves null descriptions', () => {
    const input = [
      {
        ...routineDto,
        description: null,
        groups: [
          {
            ...groupDto,
            description: null,
            tasks: [{ ...taskDto, description: null }],
          },
        ],
      },
    ];

    const result = mapRoutineToDomain(input);

    expect(result[0].description).toBeNull();
    expect(result[0].groups[0].description).toBeNull();
    expect(result[0].groups[0].tasks[0].description).toBeNull();
  });

  it('preserves description text', () => {
    const result = mapRoutineToDomain([routineDto]);

    expect(result[0].description).toBe('Your daily organized like you want');
    expect(result[0].groups[0].description).toBe('Morning essential tasks');
    expect(result[0].groups[0].tasks[0].description).toBe(
      '3 steps for combination skin.',
    );
  });
});
