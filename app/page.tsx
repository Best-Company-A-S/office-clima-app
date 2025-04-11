"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";

export default function AuthenticationPage() {
  const handleGoogleSignIn = () => {
    console.log("Google sign in");
    signIn("google");
  };

  const handleGithubSignIn = () => {
    console.log("GitHub sign in");
    signIn("github");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#111]">
      <div className="w-full max-w-[360px] p-6 flex flex-col items-center">
        {/* Logo and Title */}
        <div className="mb-10 flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Clima Logo"
            width={56}
            height={56}
            className="mb-4"
          />
          <h1 className="text-2xl font-medium text-center tracking-tight">
            Welcome to Clima
          </h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            Smart monitoring for modern environments
          </p>
        </div>

        {/* Auth Options */}
        <div className="w-full space-y-4">
          {/* Google Button */}
          <Button
            variant="outline"
            className="w-full h-12 rounded-full border-[#E2E2E2] dark:border-[#333] flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition duration-200 cursor-pointer"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="h-5 w-5" />
            <span className="text-sm font-medium ml-1">
              Continue with Google
            </span>
          </Button>

          {/* GitHub Button */}
          <Button
            variant="outline"
            className="w-full h-12 rounded-full border-[#E2E2E2] dark:border-[#333] flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition duration-200 cursor-pointer"
            onClick={handleGithubSignIn}
          >
            <FaGithub className="h-5 w-5" />
            <span className="text-sm font-medium ml-1">
              Continue with GitHub
            </span>
          </Button>
        </div>

        {/* Legal Text */}
        <div className="mt-10 w-full space-y-4">
          <div className="text-xs text-center text-muted-foreground">
            <span>By continuing, you agree to our </span>
            <Link
              href="/terms"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <span> and </span>
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 w-full pt-4">
          <Separator className="mb-4" />
          <div className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Clima, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
