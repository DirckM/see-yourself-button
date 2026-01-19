"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export interface WebcamButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  text?: string;
  enableMirror?: boolean;
  enableHoverEffects?: boolean;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  videoConstraints?: MediaTrackConstraints;
  onWebcamError?: (error: Error) => void;
}

export function WebcamButton({
  children,
  text = "button",
  className,
  enableMirror = true,
  enableHoverEffects = true,
  blurIntensity = "lg",
  videoConstraints,
  onWebcamError,
  ...props
}: WebcamButtonProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [webcamStatus, setWebcamStatus] = useState<"loading" | "error" | "success">("loading");
  const [hasShownConfetti, setHasShownConfetti] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startWebcam = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: videoConstraints || {
            facingMode: "user",
          },
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setWebcamStatus("success");
          
          // Show confetti when webcam starts
          if (!hasShownConfetti) {
            setHasShownConfetti(true);
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min: number, max: number) {
              return Math.random() * (max - min) + min;
            }

            const interval = setInterval(() => {
              const timeLeft = animationEnd - Date.now();

              if (timeLeft <= 0) {
                return clearInterval(interval);
              }

              const particleCount = 50 * (timeLeft / duration);
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
              });
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
              });
            }, 250);
          }
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Failed to access webcam");
        console.error("Error accessing webcam:", err);
        setWebcamStatus("error");
        onWebcamError?.(err);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoConstraints, onWebcamError, hasShownConfetti]);

  const blurClass = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }[blurIntensity];

  return (
    <button
      className={cn(
        "relative w-80 h-24 rounded-[200px] overflow-hidden cursor-pointer group transition-all duration-500 ease-out",
        className
      )}
      onMouseEnter={() => enableHoverEffects && setIsHovered(true)}
      onMouseLeave={() => enableHoverEffects && setIsHovered(false)}
      style={{
        boxShadow: `
          0 20px 60px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        transform: enableHoverEffects && isHovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        ...props.style,
      }}
      {...props}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{
          transform: `scaleX(${enableMirror ? -1 : 1}) ${enableHoverEffects && isHovered ? "scale(1.05)" : "scale(1)"}`,
        }}
      />

      {/* Multi-layer glassmorphism effect */}
      {/* Base glass layer */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-500",
          blurClass
        )}
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.14) 100%)",
          opacity: enableHoverEffects && isHovered ? 0.9 : 1,
        }}
      />

      {/* Refined glass overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)",
          boxShadow: `
            inset 0 2px 4px rgba(255, 255, 255, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.1)
          `,
        }}
      />

      {/* Animated shine effect */}
      {enableHoverEffects && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700",
            isHovered && "shine-animation"
          )}
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}

      {/* Top edge highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none rounded-t-[200px]"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)",
        }}
      />

      {/* Bottom edge shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none rounded-b-[200px]"
        style={{
          background: "linear-gradient(to top, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 50%, transparent 100%)",
        }}
      />

      {/* Side edge highlights for 3D effect */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none rounded-l-[200px]"
        style={{
          background: "linear-gradient(to right, rgba(255, 255, 255, 0.3), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-[2px] pointer-events-none rounded-r-[200px]"
        style={{
          background: "linear-gradient(to left, rgba(255, 255, 255, 0.3), transparent)",
        }}
      />

      {/* Content - either children or default text */}
      {children ? (
        <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-all duration-300">
          {children}
        </span>
      ) : (
        <span
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none transition-all duration-300"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "1.5rem",
            fontWeight: "600",
            letterSpacing: "0.05em",
            color: "white",
            textShadow: `
              0 2px 12px rgba(0, 0, 0, 0.6),
              0 0 24px rgba(0, 0, 0, 0.4),
              0 1px 3px rgba(255, 255, 255, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            transform: enableHoverEffects && isHovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          {text}
        </span>
      )}

      {/* Subtle glow on hover */}
      {enableHoverEffects && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[200px]"
          style={{
            boxShadow: "inset 0 0 40px rgba(255, 255, 255, 0.2)",
          }}
        />
      )}
    </button>
  );
}
