'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const html = document.documentElement
    const savedTheme = localStorage.getItem('theme')

    const setThemeAttr = (isDark: boolean) => {
      html.setAttribute('data-theme', isDark ? 'dark' : 'light')
      setTheme(isDark ? 'dark' : 'light')
    }

    if (savedTheme === 'dark') {
      setThemeAttr(true)
    } else if (!savedTheme) {
      const prefersDark = window
        .matchMedia('(prefers-color-scheme: dark)')
        .matches

      if (prefersDark) setThemeAttr(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const isDark = theme === 'light'

    html.setAttribute('data-theme', isDark ? 'dark' : 'light')
    setTheme(isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return context
}