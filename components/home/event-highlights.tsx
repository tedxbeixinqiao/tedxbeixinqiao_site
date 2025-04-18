"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

const eventHighlights = [
  {
    title: "Thought-Provoking Talks",
    description: "Our speakers deliver engaging presentations that challenge assumptions, spark new ideas, and inspire action across various disciplines.",
    video: "https://glegrxfhyqwlzdqrvwth.supabase.co/storage/v1/object/sign/tedxbeixinqiao/2.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWR4YmVpeGlucWlhby8yLm1wNCIsImlhdCI6MTc0NDMzOTg3OSwiZXhwIjoxODA3NDExODc5fQ.P4jbLXAQz3_3I-r1btpVnqIwFaVHdVWk6oRTkF229zg",
  },
  {
    title: "Interactive Experiences",
    description: "Between talks, attendees engage in hands-on activities, discussions, and demonstrations that bring ideas to life in creative ways.",
    video: "https://glegrxfhyqwlzdqrvwth.supabase.co/storage/v1/object/sign/tedxbeixinqiao/3.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWR4YmVpeGlucWlhby8zLm1wNCIsImlhdCI6MTc0NDMzOTk1NSwiZXhwIjoxODA3NDExOTU1fQ.jqaXrNyq04RZO2XMQREPSXfq1Gtx2hiWPp6LGlojmP4",
  },
  {
    title: "Community Connection",
    description: "Our events bring together diverse attendees from various backgrounds, fostering connections that often lead to collaboration and friendship.",
    video: "https://glegrxfhyqwlzdqrvwth.supabase.co/storage/v1/object/sign/tedxbeixinqiao/4.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWR4YmVpeGlucWlhby80Lm1wNCIsImlhdCI6MTc0NDMzOTk2NSwiZXhwIjoxODA3NDExOTY1fQ.5b4Nc4CB_F0WfD4vE_J17r1WxmXxMUaOGRLBGqHs2Qc",
  }
]

export default function EventHighlights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [muted, setMuted] = useState(true)

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
    hover: { y: -5, transition: { type: "spring", stiffness: 300, damping: 15 } }
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

  return (
    <section className="relative w-full overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white py-24 transition-colors duration-300">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_100%)]"></div>
        
        <motion.div 
          className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-red-600/5 dark:bg-red-600/10 blur-3xl"
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-red-600/5 dark:bg-red-600/10 blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.25, 0.15]
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
            <h2 className="mb-6 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:to-red-100 md:text-5xl">
              Event <span className="text-red-600 dark:text-red-500">Highlights</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-800 dark:text-red-50">
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
                className={cn(
                  "group relative overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm transition-all duration-300 dark:bg-gray-900/70 dark:backdrop-blur-md",
                  "shadow-md hover:shadow-xl hover:shadow-red-600/20 dark:hover:shadow-red-600/30"
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {/* Video Thumbnail */}
                  <div className="h-full w-full bg-gray-100 dark:bg-gray-800">
                    <video
                      src={highlight.video}
                      poster={highlight.video + "#t=0.1"}
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={() => setActiveVideo(index)}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-lg transition-transform hover:scale-110 hover:bg-white"
                      >
                        <Play className="h-8 w-8 fill-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-transparent">
                  <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {highlight.description}
                  </p>
                </div>
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

      {/* Modal for video playback */}
      <AnimatePresence>
        {activeVideo !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative mx-4 max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl"
              >
                <video
                  src={eventHighlights[activeVideo].video}
                  autoPlay
                  playsInline
                  controls
                  muted={muted}
                  className="w-full"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => setMuted(!muted)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    {muted ? (
                      <VolumeX className="h-5 w-5 text-white" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}