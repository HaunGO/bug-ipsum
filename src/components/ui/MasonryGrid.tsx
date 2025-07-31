interface MasonryGridProps {
  children: React.ReactNode;
}

export function MasonryGrid({ children }: MasonryGridProps) {
  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="inline-flex gap-3 w-full overflow-x-auto">
    {/* // <div className="inline-flex gap-1"> */}
      {children}
    </div>
  );
}   