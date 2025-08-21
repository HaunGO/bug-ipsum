'use client';

import { useTheme } from '../../lib/theme';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if we should show light or dark based on current theme
  const isDark = theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');

  const toggleTheme = () => {
    if (isDark) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="theme-toggle w-12 h-6 bg-gray-200 rounded-full"></div>;
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className={`theme-toggle__inner ${ isDark ? 'translate-x-9' : 'translate-x-1' }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          {isDark ? (
            <svg className="h-4 w-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-4 w-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </div>
      </span>
    </button>
  );
} 