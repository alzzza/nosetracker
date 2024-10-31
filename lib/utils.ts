import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility for combining Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Email validation for specific domains
export function isValidEmail(email: string): boolean {
  const validDomains = ['@nhs.net', '@*.nhs.uk'];
  return validDomains.some(domain => 
    email.endsWith(domain) && email.includes('@')
  )
}

// Date formatting utility
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Filter utility for events
export function filterEvents(events: any[], filters: Record<string, any>) {
  return events.filter(event => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true
      if (key === 'date') {
        const eventDate = new Date(event[key])
        const filterDate = new Date(value)
        return eventDate.toDateString() === filterDate.toDateString()
      }
      if (typeof value === 'string') {
        return event[key].toLowerCase().includes(value.toLowerCase())
      }
      return event[key] === value
    })
  })
}

// Sort utility for table columns
export function sortData<T>(
  data: T[],
  sortKey: keyof T,
  sortOrder: 'asc' | 'desc'
): T[] {
  return [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })
}

// Error handling utility
export function handleError(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}
