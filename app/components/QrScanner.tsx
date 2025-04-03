"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface QrScannerProps {
  onResult: (result: string) => void;
}

export const QrScanner = ({ onResult }: QrScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if the browser supports navigator.mediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsSupported(false);
      toast.error("Camera access is not supported in this browser");
      return;
    }

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setIsSupported(false);
        toast.error("Could not access camera");
      }
    };

    startCamera();

    // Clean up
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/20 text-center p-4">
        <p className="text-muted-foreground">
          Camera access is not available. Please use manual entry instead.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 pointer-events-none border-2 border-primary/40 border-dashed rounded-md m-4"></div>
    </div>
  );
};
