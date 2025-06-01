"use client";
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'; // Import Sun and Moon icons from lucide-react

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Component mount hone ke baad hi theme toggle karenge (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                 shadow-md transition-colors duration-200 flex items-center justify-center" // Added flex and justify-center for icon alignment
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" /> // Moon icon for light mode (to switch to dark)
      ) : (
        <Sun className="h-5 w-5" /> // Sun icon for dark mode (to switch to light)
      )}
    </button>
  )
}
