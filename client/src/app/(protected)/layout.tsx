// app/(protected)/layout.tsx

import { LogoutButton } from "@/features/auth/components/buttons/LogoutButton";


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <span>MyApp</span>
        <LogoutButton />
      </nav>
      <main>{children}</main>
    </div>
  );
}
