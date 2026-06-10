// ─── Pagination ───────────────────────────────────────
export const DEFAULT_PAGE_LIMIT = 30
export const MAX_PAGE_LIMIT = 100

// ─── File Uploads ─────────────────────────────────────
export const MAX_FILE_SIZE_MB = 10
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
export const ALLOWED_FILE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  'application/pdf',
  'text/plain',
  'application/zip',
]

// ─── Auth ─────────────────────────────────────────────
export const ACCESS_TOKEN_COOKIE = 'chat_access_token'
export const REFRESH_TOKEN_COOKIE = 'chat_refresh_token'

// ─── Rate Limits ──────────────────────────────────────
export const MESSAGE_RATE_LIMIT = 30      // max messages per minute
export const AUTH_RATE_LIMIT = 10         // max auth attempts per 15 min

// ─── Room ─────────────────────────────────────────────
export const MAX_GROUP_MEMBERS = 100
export const MAX_ROOM_NAME_LENGTH = 50
export const MAX_MESSAGE_LENGTH = 4000

// ─── Typing ───────────────────────────────────────────
export const TYPING_TIMEOUT_MS = 3000    // stop typing after 3s inactivity
