"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/routes";
import { Mail, Lock, KeyRound, UserRound } from "lucide-react";

const Register = () => {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const payload = {
      name: data.get("fullName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log(payload);

    // Call your register API here
  }

  async function handleGoogleSignup() {
    // Handle Google Signup
  }

  return (
    <div className="w-full max-w-md">
      <Card className="rounded-3xl border-border gap-8 shadow-2xl">
        <CardHeader className="items-center text-center py-4">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-sm">
            Join us and start chatting in seconds
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>

              <div className="relative">
                <UserRound
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="full-name"
                  name="fullName"
                  type="text"
                  placeholder="John"
                  required
                  className="pl-9"
                />
              </div>
            </div>

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
                  placeholder="Set your password"
                  required
                  className="pl-9"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Account
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
            onClick={handleGoogleSignup}
          >
            <KeyRound size={16} />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              type="button"
              className="h-auto p-0 text-sm border-none"
              onClick={() => router.push(ROUTES.LOGIN)}
            >
              Sign In
            </Button>
          </p>
        </CardContent>

        <CardFooter className="justify-center pt-2 pb-6">
          <p className="text-xs text-muted-foreground text-center">
            By creating an account, you agree to our Terms and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
