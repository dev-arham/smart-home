"use client";

import ReactLenis from "lenis/react";


export function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.5, 
      smoothTouch: false,
      orientation: "vertical",
      gestureOrientation: "vertical"
    }}>
      {children}
    </ReactLenis>
  );
}