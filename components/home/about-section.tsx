"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Sparkles, Globe, Lightbulb, Play, Calendar, ArrowRight, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

const CountUp = ({ end, suffix = "", duration = 2, delay = 0.2 }: CountUpProps) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    let animationId: number
    const startValue = 0
    const startAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = Math.floor(progress * (end - startValue) + startValue)
      setCount(currentCount)

      if (progress < 1) {
        animationId = requestAnimationFrame(startAnimation)
      }
    }
    
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(startAnimation)
    }, delay * 1000)
    
    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationId)
    }
  }, [end, duration, delay, isInView])
  
  return (
    <span ref={nodeRef} className="inline-block">
      {count}{suffix}
    </span>
  )
}

export default function AboutSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const imageRef = useRef(null)
  const imageInView = useInView(imageRef, { once: true })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isHoveringImage, setIsHoveringImage] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const translateY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const springTranslateY = useSpring(translateY, { stiffness: 100, damping: 30 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }
  
  const imageOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: isHoveringImage ? 0.9 : 0.7 },
    hover: { opacity: 0.9 }
  }

  return (
    <section id="about" className="relative w-full overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white py-24 transition-colors duration-300">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_100%)]"></div>
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-red-500/5 dark:bg-red-500/10 blur-3xl"></div>
        <div className="absolute right-1/4 top-2/3 h-48 w-48 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl"></div>
      </div>
      
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div 
            variants={itemVariants} 
            className="mb-16 flex flex-col items-center text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Discover TEDxBeixinqiao
            </span>
            <h2 className="mb-6 bg-gradient-to-r from-black to-red-950 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:to-red-100 md:text-5xl">
              Ideas That <span className="text-red-600 dark:text-red-500">Won't Sit Still</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-800 dark:text-red-50">
              IdeasThatMove celebrates powerful ideas, whether it's a leap of innovation, a shift in mindset, or a story that stirs something deep within us. Join a community passionate about ideas in motion and change in progress.
            </p>
          </motion.div>
          
          {/* Main Content Area */}
          <div className="mb-20 grid gap-16 md:grid-cols-2">
            {/* Interactive Video Area */}
            <motion.div
              ref={imageRef}
              variants={itemVariants}
              className="relative aspect-video overflow-hidden rounded-2xl md:aspect-auto md:h-full"
              onHoverStart={() => setIsHoveringImage(true)}
              onHoverEnd={() => setIsHoveringImage(false)}
            >
              <AnimatePresence>
                {isVideoPlaying ? (
                  <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="relative h-full w-full"
                  >
                  <video 
                    src="https://glegrxfhyqwlzdqrvwth.supabase.co/storage/v1/object/sign/tedxbeixinqiao/1.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWR4YmVpeGlucWlhby8xLm1wNCIsImlhdCI6MTc0NDMzOTMzNSwiZXhwIjoxODA3NDExMzM1fQ.WOLNS9DfJvBpNi_3Q0RFOtYWfWl7IHnV_k_6ANSMHvs"
                    className="absolute inset-0 h-full w-full"
                    controls
                    loop
                    autoPlay
                  />
                  </motion.div>
                ) : (
                  <motion.div className="relative h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Image
                    src="/0.jpg"
                    alt="TEDxBeixinqiao Event"
                    fill
                    className="object-cover transition-transform duration-700 ease-out"
                    style={{ transform: `scale(${isHoveringImage ? 1.05 : 1})` }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                    variants={imageOverlayVariants}
                  />
                  <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    animate={{ scale: isHoveringImage ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600/90 text-white hover:bg-red-700/90 hover:scale-105 transition-transform"
                    >
                    <Play className="h-8 w-8" />
                    </Button>
                    <p className="mt-4 text-white text-lg font-medium">Watch highlights</p>
                  </motion.div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }} 
                      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-3 w-3 rounded-full bg-red-500"
                    />
                    <p className="font-medium text-white">Beijing, China</p>
                    </div>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Content */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col justify-center space-y-6"
            >
              <h3 className="text-3xl font-bold text-red-600 dark:text-red-500">
                Igniting Minds, Connecting Hearts
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                TEDxBeixinqiao brings the spirit of TED to Beijing's vibrant cultural district. These independently organized events create a unique platform where innovation meets tradition.
              </p>
              
              <div className="space-y-4">
                <motion.div 
                  className="group flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">Movement of Thought</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-red-200/70">
                      Paradigm shifts, breakthrough discoveries, and rethinking old systems
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 group-hover:scale-110 transition-transform">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">Movement of People</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-red-200/70">
                      Migration, cultural shifts, physical journeys, and community-building
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 group-hover:scale-110 transition-transform">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">Emotional Movement</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-red-200/70">
                      Talks that stir empathy, inspiration, and reflection through art and storytelling
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group flex cursor-pointer items-start gap-3 rounded-lg p-2 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white">Movement Toward Action</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-red-200/70">
                      Social impact, environmental change, and "doing" rather than "saying"
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Next event coming soon, 2025
                </span>
              </div>
              
              <Link href="/speakers" className="mt-4 group inline-flex items-center gap-1 text-red-600 dark:text-red-500 font-medium hover:text-red-700 dark:hover:text-red-400">
                Meet our speakers
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Stats Section with Count Up */}
          <motion.div 
            variants={itemVariants} 
            className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-md transition-all hover:shadow-xl dark:bg-red-950/40 dark:hover:bg-red-950/60"
              whileHover={{ translateY: -5 }}
            >
              <motion.div 
                className="absolute inset-0 -z-10 bg-gradient-to-br from-red-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-red-900/30" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <h3 className="text-4xl font-bold text-red-600 dark:text-red-500">
                <CountUp end={12} suffix="+" />
              </h3>
              <p className="mt-2 text-gray-700 dark:text-red-200/70">Community Events</p>
            </motion.div>
            
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-md transition-all hover:shadow-xl dark:bg-red-950/40 dark:hover:bg-red-950/60"
              whileHover={{ translateY: -5 }}
            >
              <motion.div 
                className="absolute inset-0 -z-10 bg-gradient-to-br from-red-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-red-900/30" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <h3 className="text-4xl font-bold text-red-600 dark:text-red-500">
                <CountUp end={500} suffix="+" />
              </h3>
              <p className="mt-2 text-gray-700 dark:text-red-200/70">Engaged Attendees</p>
            </motion.div>
            
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-md transition-all hover:shadow-xl dark:bg-red-950/40 dark:hover:bg-red-950/60"
              whileHover={{ translateY: -5 }}
            >
              <motion.div 
                className="absolute inset-0 -z-10 bg-gradient-to-br from-red-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-red-900/30" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <h3 className="text-4xl font-bold text-red-600 dark:text-red-500">
                <CountUp end={8} />
              </h3>
              <p className="mt-2 text-gray-700 dark:text-red-200/70">Years of Impact</p>
            </motion.div>
            
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-md transition-all hover:shadow-xl dark:bg-red-950/40 dark:hover:bg-red-950/60"
              whileHover={{ translateY: -5 }}
            >
              <motion.div 
                className="absolute inset-0 -z-10 bg-gradient-to-br from-red-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-red-900/30" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <h3 className="text-4xl font-bold text-red-600 dark:text-red-500">
                <CountUp end={24} suffix="k+" duration={2.5} />
              </h3>
              <p className="mt-2 text-gray-700 dark:text-red-200/70">Online Viewers</p>
            </motion.div>
          </motion.div>

          {/* Interactive Quote Section */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-white shadow-xl"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10"></div>
            
            <motion.div
              style={{ y: springTranslateY }}
              className="absolute -right-4 bottom-4 h-24 w-24 rounded-full bg-white/5"
            />
            <motion.div
              style={{ y: springTranslateY }}
              className="absolute left-1/3 top-4 h-16 w-16 rounded-full bg-white/5"
            />

            <motion.div 
              className="relative z-10 mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.svg 
                className="mx-auto mb-6 h-12 w-12 opacity-90"
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ 
                  rotateZ: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M9.5 8.5H5.5C4.4 8.5 3.5 9.4 3.5 10.5V13.5C3.5 14.6 4.4 15.5 5.5 15.5H7.5C8.6 15.5 9.5 16.4 9.5 17.5V18.5C9.5 19.6 8.6 20.5 7.5 20.5H5.5C4.9 20.5 4.5 20.1 4.5 19.5C4.5 18.9 4.9 18.5 5.5 18.5H7.5V17.5H5.5C3.3 17.5 1.5 15.7 1.5 13.5V10.5C1.5 8.3 3.3 6.5 5.5 6.5H9.5C10.1 6.5 10.5 6.9 10.5 7.5C10.5 8.1 10.1 8.5 9.5 8.5Z" fill="currentColor"/>
                <path d="M18.5 8.5H14.5C13.4 8.5 12.5 9.4 12.5 10.5V13.5C12.5 14.6 13.4 15.5 14.5 15.5H16.5C17.6 15.5 18.5 16.4 18.5 17.5V18.5C18.5 19.6 17.6 20.5 16.5 20.5H14.5C13.9 20.5 13.5 20.1 13.5 19.5C13.5 18.9 13.9 18.5 14.5 18.5H16.5V17.5H14.5C12.3 17.5 10.5 15.7 10.5 13.5V10.5C10.5 8.3 12.3 6.5 14.5 6.5H18.5C19.1 6.5 19.5 6.9 19.5 7.5C19.5 8.1 19.1 8.5 18.5 8.5Z" fill="currentColor"/>
              </motion.svg>
              <motion.p 
                className="mb-6 text-xl font-light italic leading-relaxed md:text-2xl"
                whileHover={{ scale: 1.01 }}
              >
                At TEDx, we believe in the power of ideas to change attitudes, lives, and ultimately, the world.
              </motion.p>
              <motion.div 
                className="flex justify-center"
                whileHover={{ y: -2 }}
              >
                <Link 
                  href="https://www.ted.com/about/programs-initiatives/tedx-program" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <span>Learn more about TEDx</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
