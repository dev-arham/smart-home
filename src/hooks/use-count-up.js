"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for animating numbers from 0 to target value
 * @param {number} end - Target number to count up to
 * @param {number} duration - Animation duration in milliseconds
 * @param {boolean} isInView - Whether element is in viewport
 * @returns {number} Current count value
 */
export function useCountUp(end, duration = 1500, isInView = false) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
}
