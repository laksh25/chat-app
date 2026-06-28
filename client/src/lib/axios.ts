// lib/axios.ts
import axios from "axios";
import { signOut } from "next-auth/react";
import { ROUTES } from "./routes";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true, // ← sends HTTP-only cookies on every request automatically
  headers: { "Content-Type": "application/json" },
});

// ─── Response Interceptor: handle 401 → refresh → retry ───────────────────
let isRefreshing = false;
let queue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function flushQueue(error: unknown = null) {
  queue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve()));
  queue = [];
}

api.interceptors.response.use(
  (response) => response, // 2xx — pass through
  async (error) => {
    const originalRequest = error.config;

    // Not a 401, or already retried → reject immediately
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Another request is already refreshing — queue this one
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then(() => api(originalRequest)); // retry after refresh
    }

    // First 401 — attempt refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await api.post("/api/auth/refresh"); // refresh cookie sent automatically
      flushQueue(); // let queued requests through
      return api(originalRequest); // retry original
    } catch {
      // Refresh also 401'd → logout
      flushQueue(new Error("Session expired"));
      await api.post("/api/auth/logout").catch(() => {}); // best-effort backend logout
      await signOut({ callbackUrl: ROUTES.LOGIN });
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
