'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered animations with direction support
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1), default 0.1
 * @param {'fade'|'left'|'right'|'up'|'down'} options.direction - Animation direction, default 'fade'
 * @param {number} options.duration - Animation duration in ms, default 700
 * @param {number} options.delay - Animation delay in ms, default 0
 * @param {number} options.distance - Translate distance in pixels, default 50
 * @returns {Object} { ref, isVisible, animationStyles, animationClasses }
 */
export const useFadeIn = (options = {}) => {
    const {
        threshold = 0.1,
        direction = 'fade',
        duration = 700,
        delay = 0,
        distance = 50
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

    // Generate initial transform based on direction
    const getInitialTransform = () => {
        switch (direction) {
            case 'left':
                return `translateX(-${distance}px)`
            case 'right':
                return `translateX(${distance}px)`
            case 'up':
                return `translateY(${distance}px)`
            case 'down':
                return `translateY(-${distance}px)`
            case 'fade':
            default:
                return 'none'
        }
    }

    // Inline styles for animation (useful when you need precise control)
    const animationStyles = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getInitialTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`
    }

    // Tailwind-compatible class names (for simpler usage)
    const getAnimationClasses = () => {
        const baseClasses = `transition-all ease-out`
        const durationClass = `duration-${duration}`
        
        if (isVisible) {
            return `${baseClasses} opacity-100 translate-x-0 translate-y-0`
        }

        switch (direction) {
            case 'left':
                return `${baseClasses} opacity-0 -translate-x-12`
            case 'right':
                return `${baseClasses} opacity-0 translate-x-12`
            case 'up':
                return `${baseClasses} opacity-0 translate-y-12`
            case 'down':
                return `${baseClasses} opacity-0 -translate-y-12`
            case 'fade':
            default:
                return `${baseClasses} opacity-0`
        }
    }

    return { 
        ref, 
        isVisible, 
        animationStyles,
        animationClasses: getAnimationClasses()
    }
}
