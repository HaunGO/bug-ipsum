'use client';

interface HeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`page-header ${className}`}>
      {/* <h1 className="h1">{subtitle}</h1> */}
    </header>
  );
} 