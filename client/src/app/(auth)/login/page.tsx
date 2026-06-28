"use client";

import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { KeyRound, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (result?.error) {
      console.error(result.error);
      // handle error (show toast, set error state, etc.)
      return;
    }

    router.push(ROUTES.CHAT);
  }

  async function handleGoogleLogin() {
    const result = await signIn("google", { redirect: false });
    if (result?.url) {
      window.open(result.url, "_blank");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="rounded-3xl border-border shadow-2xl">
          <CardHeader className="items-center text-center pb-6">
            {/* Logo */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <span className="text-xl font-bold text-primary-foreground">
                C
              </span>
            </div>

            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>

            <CardDescription className="text-sm">
              Sign in to continue to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>

                  <Button
                    variant="link"
                    type="button"
                    className="h-auto p-0 text-sm text-primary"
                  >
                    Forgot password?
                  </Button>
                </div>

                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="pl-9"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">
                or continue with
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Google */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <KeyRound size={16} />
              Continue with Google
            </Button>
          </CardContent>

          <CardFooter className="justify-center pt-2 pb-6">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?&nbsp;
              <Button
                variant="link"
                type="button"
                className="h-auto p-0 text-sm"
              >
                Create account
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
