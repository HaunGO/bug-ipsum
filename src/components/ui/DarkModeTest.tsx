'use client';

import { useTheme } from '../../lib/theme';

export function DarkModeTest() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="p-4 m-4 border-2 border-red-500 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-lg font-bold mb-2">Dark Mode Test</h2>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <p>HTML class: {typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</p>
      
      <div className="mt-4 space-y-2">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
          Blue background (light/dark)
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
          Green background (light/dark)
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded">
          Yellow background (light/dark)
        </div>
      </div>
    </div>
  );
} 