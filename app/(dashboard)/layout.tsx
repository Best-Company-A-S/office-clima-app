"use client";

import Sidebar from "@/components/dashboard/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { WallpaperBackground } from "@/components/ui/wallpaper-background";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WallpaperBackground>
      <div className="flex relative">
        <div className="w-[100px]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Toaster position="top-center" />
          {children}
        </div>
      </div>
    </WallpaperBackground>
  );
};

export default DashboardLayout;
