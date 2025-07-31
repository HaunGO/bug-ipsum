interface UrlExampleProps {
  children: React.ReactNode;
}

export function UrlExample({ children }: UrlExampleProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-8 w-full">
      <div className="font-mono text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
} 