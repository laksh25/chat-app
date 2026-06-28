import { auth } from "@/auth";
import { ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
        <p className="text-gray-500">{session.user?.email}</p>
      </div>
    </div>
  );
}
