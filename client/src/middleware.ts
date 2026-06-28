// middleware.ts
export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    // remove login from exclusions so authorized() can redirect logged-in users away from it
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
