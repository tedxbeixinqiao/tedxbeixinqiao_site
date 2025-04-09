"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const eventHighlights = [
  {
    title: "Thought-Provoking Talks",
    description: "Our speakers deliver engaging presentations that challenge assumptions, spark new ideas, and inspire action across various disciplines.",
    image: "/1.jpg",
    link: "#"
  },
  {
    title: "Interactive Experiences",
    description: "Between talks, attendees engage in hands-on activities, discussions, and demonstrations that bring ideas to life in creative ways.",
    image: "/2.jpg",
    link: "#"
  },
  {
    title: "Community Connection",
    description: "Our events bring together diverse attendees from various backgrounds, fostering connections that often lead to collaboration and friendship.",
    image: "/3.jpg",
    link: "#"
  }
]

export default function EventHighlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }
  
  const headlineVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    },
  }
  
  const highlightVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }
  }

  return (
    <section className="relative w-full overflow-hidden bg-gray-50 py-24 dark:bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,rgba(255,255,255,0)_100%)]"></div>
        
        <motion.div 
          className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-red-600/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div 
            variants={headlineVariants} 
            className="mb-16 flex flex-col items-center text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Memorable Moments
            </span>
            <h2 className="mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:to-gray-400 md:text-5xl">
              Event <span className="text-red-600 dark:text-red-500">Highlights</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300">
              Immerse yourself in the TEDxBeixinqiao experience through our event highlights. See what makes our community gatherings so special.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Highlight Cards */}
            {eventHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className={cn(
                  "group relative overflow-hidden rounded-xl bg-white transition-all duration-500 dark:bg-gray-900",
                  hoveredCard === index ? "shadow-xl shadow-red-600/10 dark:shadow-red-600/20" : "shadow-md"
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      hoveredCard === index ? "scale-105" : "scale-100"
                    )}
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300",
                    hoveredCard === index ? "opacity-100" : "opacity-0"
                  )}>
                    <div className="absolute bottom-0 left-0 p-6">
                      <Link
                        href={highlight.link}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-red-600"
                      >
                        <span>Learn more</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlight.description}
                  </p>
                </div>
                
                <AnimatePresence>
                  {hoveredCard === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="h-5 w-5 rounded-full border-t-2 border-red-600 opacity-75"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="flex justify-center"
          >
            <Button 
              asChild 
              className="group overflow-hidden bg-red-600 hover:bg-red-700"
              variant="default"
            >
              <Link href="/speakers" className="relative flex items-center gap-2">
                <motion.span
                  initial={{ width: "100%", height: "100%", x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 bg-red-500/40"
                />
                <span className="z-10">Explore All Speakers</span>
                <ArrowRight className="z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}