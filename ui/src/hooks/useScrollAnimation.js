import { useEffect, useRef, useState } from 'react'

export const useScrollAnimation = ({ threshold = 0.1, rootMargin = '0px', once = false } = {}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Stable primitive deps — no object reference issues
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    const el = elementRef.current
    if (el) observer.observe(el)

    return () => { if (el) observer.unobserve(el) }
  }, [threshold, rootMargin, once]) // primitives — stable references

  return [elementRef, isVisible]
}

export default useScrollAnimation
