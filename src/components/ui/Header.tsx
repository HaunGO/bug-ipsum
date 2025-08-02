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
      {/* <Image 
        src={logoSrc}
        alt="Bug Ipsum Logo"
        width={300}
        height={100}
        style={{ objectFit: 'contain' }}
      /> */}
      {/* <h1 style={{ margin: 0 }}>{title}</h1> */}
      <p className="lead">{subtitle}</p>
    </header>
  );
} 