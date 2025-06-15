"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  className = "",
  containerClassName = "",
  borderRadius = "1.5rem",
  colors = ["#171717", "#171717", "#171717", "#171717"],
  as: Component = "div",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  colors?: string[];
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const [size, setSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      // setSize({ width, height });
      setMousePosition({ x: width / 2, y: height / 2 });
    }
  }, [containerRef]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: width / 2, y: height / 2 });
    }
  };

  return (
    <Component
      className={`relative ${containerClassName}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...otherProps}
    >
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, ${colors.join(", ")})`,
          borderRadius,
          WebkitMask: `
            radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              transparent 25%,
              black 50%
            )
          `,
          mask: `
            radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              transparent 25%,
              black 50%
            )
          `,
        }}
        transition={{ duration: duration / 1000 }}
      />
      <div className={`relative z-20 ${className}`} style={{ borderRadius }}>
        {children}
      </div>
    </Component>
  );
};