"use client";

import { WebcamButton } from "@/components/ui/webcam-button";
import { useEffect, useState } from "react";

export default function Home() {
  const [webcamStatus, setWebcamStatus] = useState<"loading" | "error" | "success">("loading");

  useEffect(() => {
    // Check webcam availability
    const checkWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // If successful, stop the stream immediately (we just wanted to check)
        stream.getTracks().forEach((track) => track.stop());
        setWebcamStatus("success");
      } catch (error) {
        setWebcamStatus("error");
      }
    };

    checkWebcam();
  }, []);

  if (webcamStatus === "error") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-8">
          <p className="text-4xl font-bold text-gray-700 mb-4">
            Turn on your webcam
          </p>
          <p className="text-lg text-gray-600">
            We need access to your camera to continue
          </p>
        </div>
      </main>
    );
  }

  if (webcamStatus === "loading") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-600 animate-pulse">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <WebcamButton text="button" />
    </main>
  );
}
