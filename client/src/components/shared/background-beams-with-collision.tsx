"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import { BEAMS } from "./beamsConfig";
import { CollisionMechanism } from "./CollisionMechanism";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [showBeams, setShowBeams] = useState(false); // State for beams visibility


  // Effect to handle visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBeams(true); // Show beams after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn(
        "bg-transparent relative flex items-center w-full justify-center overflow-hidden",
        // h-screen if you want bigger
        className,
      )}
    >
      {showBeams &&
        BEAMS.map((beam) => (
          <CollisionMechanism
            key={beam.initialX + "beam-idx"}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
          />
        ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
      ></div>
    </div>
  );
};

// Updated CollisionMechanism component

export default BackgroundBeamsWithCollision;
