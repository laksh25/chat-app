import { MAX_FILE_SIZE_BYTES, ALLOWED_FILE_TYPES } from './constants'

// ─── Pagination ───────────────────────────────────────
export const encodeCursor = (value: string): string =>
  Buffer.from(value).toString('base64')

export const decodeCursor = (cursor: string): string =>
  Buffer.from(cursor, 'base64').toString('utf-8')

// ─── File Validation ──────────────────────────────────
export const isFileSizeValid = (sizeBytes: number): boolean =>
  sizeBytes <= MAX_FILE_SIZE_BYTES

export const isFileTypeValid = (mimeType: string): boolean =>
  ALLOWED_FILE_TYPES.includes(mimeType)

// ─── String Helpers ───────────────────────────────────
export const truncate = (str: string, max: number): string =>
  str.length > max ? `${str.slice(0, max)}...` : str

export const slugify = (str: string): string =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

// ─── Date Helpers ─────────────────────────────────────
export const formatRelativeTime = (date: Date | string): string => {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
  return `${Math.floor(diffMins / 1440)}d ago`
}

// ─── Room Helpers ─────────────────────────────────────
// For private rooms, generate a consistent room name from two user IDs
export const getPrivateRoomKey = (userId1: string, userId2: string): string =>
  [userId1, userId2].sort().join('_')
