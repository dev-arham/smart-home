'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for pop-up animations triggered on visibility
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1), default 0.1
 * @param {number} options.duration - Animation duration in ms, default 600
 * @param {number} options.delay - Animation delay in ms, default 0
 * @returns {Object} { ref, isVisible, animationStyles }
 */
export const usePopUp = (options = {}) => {
    const {
        threshold = 0.1,
        duration = 600,
        delay = 0
    } = typeof options === 'number' ? { threshold: options } : options

    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [threshold])

    // Inline styles for pop-up animation
    const animationStyles = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`
    }

    return { 
        ref, 
        isVisible, 
        animationStyles
    }
}
