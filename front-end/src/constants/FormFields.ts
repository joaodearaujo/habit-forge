import type { FormField } from '@/components/Form/FormField';

export const ROUTINE_FIELDS: FormField[] = [
  {
    label: 'Routine name',
    id: 'routineTitle',
    name: 'title',
    placeholder: '',
    required: true,
    type: 'text',
  },
  {
    label: 'Routine description',
    id: 'routineDescription',
    name: 'description',
    required: false,
    placeholder: '',
    type: 'text',
  },
] as const;

export const GROUP_FIELDS: FormField[] = [
  {
    label: 'Group name',
    id: 'groupTitle',
    name: 'title',
    placeholder: '',
    required: true,
    type: 'text',
  },
  {
    label: 'Group description',
    id: 'groupDescription',
    name: 'description',
    required: false,
    placeholder: '',
    type: 'text',
  },
] as const;

export const TASK_FIELDS: FormField[] = [
  {
    label: 'Task name',
    id: 'taskTitle',
    name: 'title',
    placeholder: '',
    required: true,
    type: 'text',
  },
  {
    label: 'Category',
    id: 'taskCategory',
    name: 'category',
    placeholder: '',
    required: true,
    type: 'select',
    options: [
      {
        optionName: 'BODY',
        optionValue: 'BODY',
      },
      {
        optionName: 'CARE',
        optionValue: 'CARE',
      },
      {
        optionName: 'MIND',
        optionValue: 'MIND',
      },
      {
        optionName: 'STUDY',
        optionValue: 'STUDY',
      },
    ],
  },
  {
    label: 'Task description',
    id: 'taskDescription',
    name: 'description',
    required: false,
    placeholder: '',
    type: 'text',
  },
  {
    label: 'Core',
    id: 'taskCore',
    name: 'isCore',
    placeholder: '',
    required: true,
    type: 'select',
    options: [
      {
        optionName: 'NO',
        optionValue: 'false',
      },
      {
        optionName: 'YES',
        optionValue: 'true',
      },
    ],
  },
] as const;
