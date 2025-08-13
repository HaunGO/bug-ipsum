'use client';

import Image from 'next/image';
import { useTheme } from '../../lib/theme';

interface HeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function Header({ title, subtitle, className = '' }: HeaderProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark' ? '/images/logo-white.png' : '/images/logo-black.png';

  return (
    <header className={`page-header ${className}`}>
      {/* <h1 className="h1">{subtitle}</h1> */}
    </header>
  );
} 