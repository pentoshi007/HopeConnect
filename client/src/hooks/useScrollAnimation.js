import { useEffect, useRef } from 'react'

export const useScrollAnimation = (threshold = 0.1) => {
    const elementRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold }
        )

        const currentElement = elementRef.current
        if (currentElement) {
            observer.observe(currentElement)
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement)
            }
        }
    }, [threshold])

    return elementRef
}