"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for subtle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Background with dynamic parallax effectzs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Enhanced overlay gradient for better text readability */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40 z-10 transition-opacity duration-700",
            isLoaded ? "opacity-80" : "opacity-0"
          )}
        />
        
        {/* Background image with subtle parallax */}
        <div 
          className={cn(
            "absolute inset-0 transition-transform duration-700 ease-out",
            scrolled ? "scale-105" : "scale-100"
          )}
        >
          <Image 
            src="/hero-bg.jpg" 
            alt="TEDxBeixinqiao Event"
            fill
            priority
            className={cn(
              "absolute inset-0 object-cover object-center transition-all duration-1000",
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
              scrolled ? "scale-105" : "scale-100"
            )}
            onLoad={() => {
              setTimeout(() => {
                setIsLoaded(true)
              }, 300)
            }}
          />
        </div>
        
        {/* Red accent shapes */}
        <div className="absolute top-1/4 right-[10%] h-64 w-64 rounded-full bg-red-600/10 blur-[100px] dark:bg-red-600/20" />
        <div className="absolute bottom-1/4 left-[10%] h-64 w-64 rounded-full bg-red-600/10 blur-[100px] dark:bg-red-600/20" />
      </div>

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Upper badge - "April 2026" */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex justify-center"
          >
            <span className="inline-flex items-center rounded-full border border-white/30 bg-black/30 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              To Be Determined, 2025 • Beixinqiao, Beijing
            </span>
          </motion.div>

          {/* Main title animation */}
          <div className="mb-6 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex items-center gap-1 text-center">
                <h1 className="text-5xl font-extrabold text-red-600 sm:text-6xl md:text-7xl text-shadow-lg">TEDx</h1>
                <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl text-shadow-lg">Beixinqiao</h1>
              </div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "80%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mx-auto mb-4 h-[3px] bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0"
              />
              <h2 className="text-2xl font-medium text-white sm:text-3xl md:text-4xl text-shadow-sm">
                Ideas <span className="text-red-500">That Move</span>
              </h2>
            </motion.div>
          </div>

          {/* Description text with enhanced visibility */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 mx-auto max-w-3xl text-center text-lg font-medium text-white md:text-xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
          >
            IdeasThatMove celebrates powerful ideas, whether it's a leap of innovation, a shift in mindset, 
            or a story that stirs something deep within us. Join us for a captivating journey where 
            ideas in motion lead to change in progress.
          </motion.p>

          {/* CTA buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-red-600 px-8 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-600 shadow-lg"
            >
              <Link href="#video-showcase">
                <span className="relative z-10 font-medium">Watch Talks</span>
                <span className="absolute inset-0 -translate-x-full bg-red-700 transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-2 border-white px-8 text-white hover:text-white hover:border-white dark:border-white dark:text-white shadow-lg bg-black/20 backdrop-blur-sm"
            >
              <Link href="/speakers">
                <span className="relative z-10 font-medium">Meet Speakers</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              </Link>
            </Button>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 flex flex-col items-center"
          >
            <p className="text-xl font-medium italic text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="font-bold text-red-500">From spark</span> to <span className="font-bold text-red-500">shift</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-0 right-0 mx-auto flex cursor-pointer flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0] 
        }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { delay: 1.5, duration: 2, repeat: Infinity, repeatType: 'loop' } 
        }}
      >
        <span className="mb-2 text-sm font-medium text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">Explore More</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm">
          <ArrowDown className="h-5 w-5 text-white" />
        </div>
      </motion.button>
    </section>
  )
}
