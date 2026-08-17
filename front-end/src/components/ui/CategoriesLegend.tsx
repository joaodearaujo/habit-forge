import { CATEGORY_COLORS } from '@/constants/categoryColors';
import { Dot } from '@/components/ui/Dot';

export function CategoriesLegend() {
  return (
    <div className="w-full items-center text-muted flex-1 text-xs uppercase flex gap-4 justify-around bg-surface rounded-xl font-secondary p-2 border-2 border-b-8 border-surface2 leading-none">
      <span>Categories:</span>

      {Object.entries(CATEGORY_COLORS).map(([key, color]) => (
        <div className="flex gap-2 items-center" key={key}>
          <Dot color={color} />
          {key}
        </div>
      ))}
    </div>
  );
}
