"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "sonner";

interface QrScannerProps {
  onResult: (result: string) => void;
}

export const QrScanner = ({ onResult }: QrScannerProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleScan = (detectedCodes: any[]) => {
    if (detectedCodes && detectedCodes.length > 0) {
      // Get the first detected code
      const result = detectedCodes[0].rawValue;
      if (result) {
        onResult(result);
      }
    }
  };

  const handleError = (err: unknown) => {
    console.error("QR Scanner error:", err);
    setError("Could not access camera or scanner error occurred");
    toast.error("Camera access error. Please try manual entry.");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/20 text-center p-4">
        <p className="text-muted-foreground">
          {error}. Please use manual entry instead.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Scanner
        onScan={handleScan}
        onError={handleError}
        styles={{
          container: {
            width: "100%",
            height: "100%",
          },
          video: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
        components={{
          finder: false,
        }}
        formats={["qr_code"]}
        scanDelay={500}
      />
    </div>
  );
};
