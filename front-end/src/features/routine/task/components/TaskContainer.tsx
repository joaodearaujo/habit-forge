import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TaskContainer({ children }: Props) {
  return (
    <div className="pb-0.5 rounded-xl bg-surface2 overflow-hidden">
      <div className="w-full h-fit flex flex-col items-start bg-surface rounded-xl border-2 border-surface2 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
