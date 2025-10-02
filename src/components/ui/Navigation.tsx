'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import Image from 'next/image';
import { useTheme } from '../../lib/theme';

export function Navigation() {
  const [mobileMenuOpen] = useState(false);
  const { resolvedTheme, mounted } = useTheme();
  
  // Use a default logo during SSR to prevent hydration mismatch
  const logoSrc = mounted && resolvedTheme === 'dark' ? '/images/logo-white.png' : '/images/logo-black.png';

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="nav-brand">
              <Image 
                  src={logoSrc}
                  alt="Bug Ipsum Logo"
                  width={100}
                  height={40}
                  style={{ objectFit: 'contain' }}
                />
            </Link>
            
            <div className="nav-menu">
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-500">
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 