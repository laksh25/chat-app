export const ROUTES = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // App
  HOME: "/",
  CHAT: "/chat",
  CHAT_ROOM: (roomId: string) => `/chat/${roomId}`,
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;
