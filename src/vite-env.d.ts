/// <reference types="vite/client" />

interface Window {
  HellensNavigate?: (href: string, options?: { mode?: number; origin?: { x: number; y: number }; duration?: number }) => Promise<void>
}
