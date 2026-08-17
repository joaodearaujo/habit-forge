export const CATEGORY_COLORS = {
  BODY: '#35C28D',
  CARE: '#E76F9C',
  MIND: '#E2A64C',
  STUDY: '#9E96EF',
} as const;

export type CategoryKey = keyof typeof CATEGORY_COLORS;
