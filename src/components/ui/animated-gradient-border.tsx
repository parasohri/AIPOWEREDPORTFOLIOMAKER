"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  containerStyle?: React.CSSProperties
  style?: React.CSSProperties
  as?: React.ElementType
  borderWidth?: number
  duration?: number
  animate?: boolean
  gradientColors?: string[]
  borderRadius?: number
  hoverable?: boolean
}

export const AnimatedGradientBorder = ({
  children,
  containerClassName = "",
  className = "",
  containerStyle = {},
  style = {},
  as: Component = "div",
  borderWidth = 2,
  duration = 8,
  animate = true,
  gradientColors = ["#FF4D4D", "#F9CB28", "#2196F3", "#9C27B0"],
  borderRadius = 8,
  hoverable = true,
}: AnimatedGradientBorderProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(animate ? 1 : 0)

  useEffect(() => {
    if (!animate) return

    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 360,
        y: Math.random() * 360,
      })
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [animate, duration])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverable) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    if (animate) {
      setOpacity(1)
    } else {
      setOpacity(0)
    }
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setOpacity(1)
  }

  const gradientStyle = {
    "--gradient-x": `${position.x}px`,
    "--gradient-y": `${position.y}px`,
    "--gradient-opacity": opacity,
    "--border-width": `${borderWidth}px`,
    "--border-radius": `${borderRadius}px`,
    "--gradient-color-1": gradientColors[0],
    "--gradient-color-2": gradientColors[1],
    "--gradient-color-3": gradientColors[2],
    "--gradient-color-4": gradientColors[3],
  } as React.CSSProperties

  return (
    <div
      ref={containerRef}
      className={`animated-gradient-border-container ${containerClassName}`}
      style={{
        position: "relative",
        ...containerStyle,
        ...gradientStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className={`animated-gradient-border-gradient ${isHovered ? "hovered" : ""}`}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "var(--border-radius)",
          padding: "var(--border-width)",
          background: `radial-gradient(
            circle at var(--gradient-x) var(--gradient-y),
            var(--gradient-color-1),
            var(--gradient-color-2),
            var(--gradient-color-3),
            var(--gradient-color-4)
          )`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          opacity: "var(--gradient-opacity)",
          transition: animate ? "opacity 0.3s ease" : "none",
        }}
      />
      <Component
        className={`animated-gradient-border-content ${className}`}
        style={{
          position: "relative",
          background: "inherit",
          borderRadius: "calc(var(--border-radius) - var(--border-width))",
          height: "100%",
          width: "100%",
          ...style,
        }}
      >
        {children}
      </Component>
    </div>
  )
}

