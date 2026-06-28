// components/LogoutButton.tsx
"use client";
import { signOut } from "next-auth/react";

import api from "@/lib/axios";
import { ROUTES } from "@/lib/routes";

export function LogoutButton() {
  async function handleLogout() {
    await api.post("/auth/logout").catch(() => {}); // clears backend HTTP-only cookie
    await signOut({ callbackUrl: ROUTES.LOGIN }); // clears NextAuth session
  }

  return <button onClick={handleLogout}>Logout</button>;
}
