"use client"

import { motion } from "framer-motion"
import { ArrowDown, Code2 } from "lucide-react"
import { SparklesCore } from "@/components/ui/sparkles"
import { AnimatedText } from "@/components/ui/animated-text"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"
import Link from "next/link"

export function HeroSection() {

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <BackgroundBeamsWithCollision className="absolute inset-0 w-full h-full z-0 ">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-900/40 to-zinc-900  "  >
          <SparklesCore
            id="sparkles"
            className="absolute inset-0 w-full h-full "
            speed={0.5}
            background="transparent"
            minSize={0.4}
            maxSize={0.5}
            particleDensity={100}
            particleColor="#FFFFFF"
          />
          </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center animate-bounce gap-2 text-sm font-medium px-4 py-2  rounded-full backdrop-blur-sm border border-zinc-700"
            >
              <Code2 className="h-4 w-4" />
              <span>Welcome to my portfolio</span>
            </motion.div>

            {/* Hero Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-4xl"
            >
              <AnimatedText
                text="Hi, I&apos;m PARAS OHRI"
                className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-white"
              />
            </motion.div>

            {/* Typing Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center text-2xl md:text-3xl lg:text-4xl font-medium"
            >
              <span className="border-r-2 border-purple-500 pr-2 mr-2">Full Stack Developer</span>
              <span className="animate-pulse">|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="max-w-[700px]text-zinc-400 md:text-xl"
            >
              Crafting elegant solutions to complex problems with clean, efficient code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Link href="#projects" aria-label="View My Work">
                <p className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity">
                  View My Work
                </p>
              </Link>
              <Link href="#contact" aria-label="Contact Me">
                <p className="px-6 py-3 rounded-full bg-zinc-800 text-white font-medium border border-zinc-700 hover:bg-zinc-700 transition-colors">
                  Contact Me
                </p>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="absolute bottom-8  "
        >
          <Link href="#about" aria-label="Scroll Down to About Section">
            <div className="flex items-center justify-center w-10 h-10 rounded-full  border border-zinc-700 hover:bg-zinc-700 transition-colors">
              <ArrowDown className="w-5 h-5 text-white" />
            </div>
          </Link>
        </motion.div>
      </BackgroundBeamsWithCollision>
    </section>
  )
}

