"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
    <div className="w-full max-w-md">
      <Card className="rounded-3xl border-border gap-8 shadow-2xl">
        <CardHeader className="items-center text-center py-4">
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
                  variant="outline"
                  type="button"
                  className="text-sm text-primary"
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
              className="h-auto p-0 text-sm border-none"
              onClick={() => router.push(ROUTES.REGISTER)}
            >
              Create account
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
