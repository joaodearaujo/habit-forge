import { describe, it, expect } from 'vitest';
import { mapRoutineToDomain } from './routine.mapper';

describe('mapRoutineToDomain', () => {
  const baseTask = {
    groupId: 'b24a0123-37e5-460b-8b01-cfaa0c7b9a7e',
    id: '26cb349f-ee73-469a-97aa-77c86a28f7e5',
    category: 'BODY',
    title: 'Skin Care',
    description:
      '3 steps for combination skin. Sunscreen is the most important one.',
    isCompleted: false,
    isCore: true,
  };

  const baseGroup = {
    routineId: 'faed4624-2e3c-471d-aafe-4bfc3e97ee66',
    id: 'b24a0123-37e5-460b-8b01-cfaa0c7b9a7e',
    title: 'Morning',
    description: 'Morning essential tasks',
    tasks: [baseTask],
  };

  const baseRoutine = {
    id: 'faed4624-2e3c-471d-aafe-4bfc3e97ee66',
    title: 'Daily',
    description: 'Your daily organized like you want',
    groups: [baseGroup],
  };

  it('derives routineId and groupId from the parent instead of trusting the input fields', () => {
    const input = [
      {
        ...baseRoutine,
        groups: [
          {
            ...baseGroup,
            routineId: 'id-propositalmente-errado',
            tasks: [{ ...baseTask, groupId: 'id-propositalmente-errado' }],
          },
        ],
      },
    ];

    const result = mapRoutineToDomain(input);

    expect(result).toStrictEqual([
      {
        ...baseRoutine,
        groups: [
          {
            ...baseGroup,
            routineId: baseRoutine.id,
            tasks: [{ ...baseTask, groupId: baseGroup.id }],
          },
        ],
      },
    ]);
  });

  it('preserves description as null when routine, group and task have no description', () => {
    const input = [
      {
        ...baseRoutine,
        description: null,
        groups: [
          {
            ...baseGroup,
            description: null,
            tasks: [{ ...baseTask, description: null }],
          },
        ],
      },
    ];

    const result = mapRoutineToDomain(input);

    expect(result).toStrictEqual([
      {
        ...baseRoutine,
        description: null,
        groups: [
          {
            ...baseGroup,
            description: null,
            tasks: [{ ...baseTask, description: null }],
          },
        ],
      },
    ]);
  });

  it('preserves description text when routine, group and task have one', () => {
    const input = [baseRoutine];

    const result = mapRoutineToDomain(input);

    expect(result).toStrictEqual([baseRoutine]);
  });
});
