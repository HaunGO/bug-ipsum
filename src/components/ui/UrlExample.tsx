interface UrlExampleProps {
  children: React.ReactNode;
}

export function UrlExample({ children }: UrlExampleProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-8 w-full">
      <div className="font-mono text-sm text-gray-700 dark:text-gray-100">
        {children}
      </div>
    </div>
  );
} 