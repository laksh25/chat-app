// ─── User ─────────────────────────────────────────────
export enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  AWAY = 'AWAY',
}

// ─── Room ─────────────────────────────────────────────
export enum RoomType {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
}

export enum MemberRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
}

// ─── Message ──────────────────────────────────────────
export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
  SYSTEM = 'SYSTEM',       // e.g. "John joined the room"
}

export enum DeliveryStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
}

// ─── Notifications ────────────────────────────────────
export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  MENTION = 'MENTION',
  ROOM_INVITE = 'ROOM_INVITE',
}

// ─── Socket Events ────────────────────────────────────
// Centralised here so client & server always use same event names
export enum SocketEvent {
  // Presence
  USER_ONLINE = 'user:online',
  USER_OFFLINE = 'user:offline',
  PRESENCE_SYNC = 'presence:sync',

  // Typing
  TYPING_START = 'typing:start',
  TYPING_STOP = 'typing:stop',

  // Rooms
  JOIN_ROOM = 'room:join',
  LEAVE_ROOM = 'room:leave',
}
