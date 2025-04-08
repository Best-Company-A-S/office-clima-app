"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface WallpaperSettings {
  wallpaperUrl?: string;
  wallpaperBlur?: number;
}

interface WallpaperBackgroundProps {
  children: React.ReactNode;
  showLoader?: boolean;
}

/**
 * A component that applies the wallpaper background from team settings
 */
export const WallpaperBackground = ({
  children,
  showLoader = true,
}: WallpaperBackgroundProps) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<WallpaperSettings>({});

  useEffect(() => {
    const fetchWallpaper = async () => {
      const teamId = searchParams.get("teamId");
      if (!teamId) {
        setIsLoading(false);
        return;
      }

      try {
        // Use the dedicated wallpaper endpoint
        const response = await axios.get(
          `/api/settings/wallpaper?teamId=${teamId}`
        );
        setSettings({
          wallpaperUrl: response.data.wallpaperUrl,
          wallpaperBlur: response.data.wallpaperBlur || 0,
        });
      } catch (error) {
        console.error("Failed to fetch wallpaper:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallpaper();
  }, [searchParams]);

  const hasWallpaper =
    settings.wallpaperUrl && settings.wallpaperUrl.trim() !== "";

  return (
    <div className="relative min-h-screen">
      {/* Wallpaper background */}
      {hasWallpaper && (
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{
            backgroundImage: `url(${settings.wallpaperUrl})`,
            filter: `blur(${settings.wallpaperBlur}px)`,
            transform: "scale(1.1)", // Prevent blur from showing edges
          }}
        />
      )}

      {/* Content */}
      {isLoading && showLoader ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
