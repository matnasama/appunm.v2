import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const UNM_FILES_BASE_URL = 'https://www.unm.edu.ar'

export function resolveUnmFileUrl(url: string): string {
  const trimmed = url.trim()

  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`

  if (normalizedPath.toLowerCase().startsWith('/files/')) {
    return `${UNM_FILES_BASE_URL}${normalizedPath}`
  }

  return trimmed
}
