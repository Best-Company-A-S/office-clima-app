"use client";

import { signIn } from "next-auth/react";
import { Thermometer, Droplet, Gauge, MoonIcon, SunIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const LoginPage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration fix for theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left side - Login Form */}
      <div className="flex w-full flex-col justify-center px-5 md:w-1/2 md:px-16 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-12">
            <div className="mb-2 flex items-center">
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  C
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Clima</h1>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Sign in to your account
            </h2>
            <p className="mt-2 text-muted-foreground">
              Monitor your office climate with ease
            </p>
          </div>

          <div className="space-y-6">
            <Button
              variant="outline"
              className="relative flex h-14 w-full items-center justify-center border border-input bg-background shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <FaGithub className="mr-2 h-5 w-5" />
              <span>Continue with GitHub</span>
            </Button>

            <Button
              disabled
              variant="outline"
              className="relative flex h-14 w-full items-center justify-center border border-input bg-background shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <FaGoogle className="mr-2 h-5 w-5" />
              <span>Continue with Google</span>
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By signing in, you agree to our
              <a href="#" className="font-medium text-primary hover:underline">
                {" "}
                Terms of Service{" "}
              </a>
              and
              <a href="#" className="font-medium text-primary hover:underline">
                {" "}
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Climate App Features */}
      <div className="hidden bg-gradient-to-br from-primary/20 via-primary/5 to-background md:flex md:w-1/2 md:flex-col md:items-center md:justify-center relative overflow-hidden">
        <div className="absolute right-6 top-6 bg-primary/10 dark:bg-primary/20 text-sm px-3 py-1 rounded-full text-foreground backdrop-blur-sm border border-primary/10">
          CLIMA SYSTEM
        </div>

        {/* Theme switcher (moved to bottom right) */}
        <div className="absolute right-6 bottom-6 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-card/80 backdrop-blur-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Main Feature Showcase Card */}
        <div className="w-full max-w-md px-8 mb-4">
          <div className="group relative rounded-xl bg-card p-8 shadow-lg border border-border overflow-hidden">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>

            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold text-card-foreground">
                Climate Overview System
              </h2>
              <p className="mb-6 text-muted-foreground">
                Monitor temperature, humidity and air quality in real-time
                across your workspace environment.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4 text-center">
                  <Thermometer className="mb-2 h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">
                    Temperature Monitoring
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4 text-center">
                  <Droplet className="mb-2 h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">Humidity Tracking</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4 text-center">
                  <Gauge className="mb-2 h-8 w-8 text-primary" />
                  <span className="text-sm font-medium">Air Quality</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Arduino Integration</h3>
                    <p className="text-xs text-muted-foreground">
                      Connect multiple sensor devices with QR code pairing
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Survey & Feedback</h3>
                    <p className="text-xs text-muted-foreground">
                      Collect subjective feedback on room comfort levels
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Room Comparison</h3>
                    <p className="text-xs text-muted-foreground">
                      Compare climate data across different workspaces
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom card */}
        <div className="w-full max-w-md px-8">
          <div className="rounded-xl bg-card/70 backdrop-blur-sm p-6 shadow-lg border border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">
                Workspace Management
              </h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Coming Soon
              </span>
            </div>
            <p className="mt-2 mb-4 text-sm text-muted-foreground">
              Create workspaces, add team members and manage access to your
              climate data.
            </p>

            <div className="flex -space-x-3">
              {[
                "https://ui-avatars.com/api/?name=J+D&background=random",
                "https://ui-avatars.com/api/?name=S+K&background=random",
                "https://ui-avatars.com/api/?name=A+M&background=random",
                "https://ui-avatars.com/api/?name=T+P&background=random",
              ].map((avatar, index) => (
                <div
                  key={index}
                  className="h-8 w-8 rounded-full border-2 border-card overflow-hidden"
                >
                  <img
                    src={avatar}
                    alt="Team member"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-background text-xs font-medium">
                +6
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mt-4">
              <div className="h-1.5 w-6 rounded-full bg-primary"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-primary/30"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-primary/30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
