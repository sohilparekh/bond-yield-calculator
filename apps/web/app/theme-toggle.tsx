'use client';

import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 ui:p-2 ui:rounded-lg ui:bg-gray-200 ui:dark:bg-gray-800 hover:ui:bg-gray-300 ui:dark:hover:bg-gray-700 ui:transition-colors ui:z-50"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
