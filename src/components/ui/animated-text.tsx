"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "", once = false }) => {
  const textRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const currentRef = textRef.current // Store the current value of the ref
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!once || (once && !hasAnimated.current)) {
              startAnimation()
              hasAnimated.current = true
            }
          } else if (!once) {
            resetAnimation()
          }
        })
      },
      { threshold: 0.5 },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once])

  const startAnimation = () => {
    if (!textRef.current) return

    const spans = textRef.current.querySelectorAll("span")
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add("animate-in")
      }, index * 40)
    })
  }

  const resetAnimation = () => {
    if (!textRef.current) return

    const spans = textRef.current.querySelectorAll("span")
    spans.forEach((span) => {
      span.classList.remove("animate-in")
    })
  }

  return (
    <div ref={textRef} className={`animated-text ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block opacity-0 translate-y-[20px] transition-all duration-300 ease-out"
          style={{ transitionDelay: `${index * 40}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}