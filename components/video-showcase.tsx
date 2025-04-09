"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react"
import Image from "next/image"

// Sample data for videos
const videos = [
  {
    id: "video1",
    title: "The Future of Data Privacy",
    speaker: "Cheryl Yang",
    thumbnail: `https://img.youtube.com/vi/jImojqkaTHo/maxresdefault.jpg`,
    videoId: "jImojqkaTHo", // Cheryl's video
    description: "The Transformative Impact of Blockchain Technology in the Next Decade",
    date: "April 20, 2024",
    duration: "7:53",
  },
  {
    id: "video2",
    title: "Rethinking the Way we Communicate",
    speaker: "Stephanie Sam", 
    thumbnail: `https://img.youtube.com/vi/RjoRzRzsfmA/maxresdefault.jpg`,
    videoId: "RjoRzRzsfmA", // Stephanie's video
    description: "Rethinking the Way We Communicate in the Age of Globalization",
    date: "April 20, 2024",
    duration: "10:17",
  },
  {
    id: "video3",
    title: "We are all Storytellers",
    speaker: "Merna Al Nasser",
    thumbnail: `https://img.youtube.com/vi/acSQUrNqNAo/maxresdefault.jpg`,
    videoId: "acSQUrNqNAo", // Merna's video
    description: "Transforming Media Narratives For Global Understandings",
    date: "April 20, 2024",
    duration: "14:19",
  },
  {
    id: "video4",
    title: "Rekindling our Bond with Nature",
    speaker: "Niamh Cunningham",
    thumbnail: `https://img.youtube.com/vi/pHwQZ35obSM/maxresdefault.jpg`,
    videoId: "pHwQZ35obSM", // Niamh's video
    description: "Nourishing Growth and Understanding through Tree Stories",
    date: "April 20, 2024",
    duration: "10:11",
  },
  {
    id: "video5",
    title: "What the Office of Tomorrow Will Look Like",
    speaker: "Saverio Quaia",
    thumbnail: `https://img.youtube.com/vi/CPlLRSXy7Hw/maxresdefault.jpg`,
    videoId: "CPlLRSXy7Hw", // Saverio's video
    description: "Workplace Transformation and Future Trends in the Post-Epidemic Era",
    date: "April 20, 2024",
    duration: "12:13",
  },
  {
    id: "video6",
    title: "How to Become Reptile-Skinned",
    speaker: "Joseph C. Stewart",
    thumbnail: "https://img.youtube.com/vi/DSu2O5twi5A/maxresdefault.jpg",
    videoId: "DSu2O5twi5A", // Using Stephanie's video temporarily
    description: "Challenges and Opportunities for Parents of Children with Developmental Disorders",
    date: "April 20, 2024",
    duration: "15:42",
  }
]

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<{
    id: string;
    title: string;
    speaker: string;
    thumbnail: string;
    videoId: string;
    description: string;
    date: string;
    duration: string;
  } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section 
      id="video-showcase" 
      className="relative w-full overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-red-600/20 blur-[100px]"></div>
        <div className="absolute -bottom-40 right-0 h-[25rem] w-[25rem] rounded-full bg-red-600/30 blur-[100px]"></div>
      </div>
      
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 mx-auto px-4"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400"
            >
              Featured Talks
            </motion.div>
            
            <h2 className="relative mb-4 text-3xl font-bold text-black dark:text-white md:text-5xl">
              <span className="relative">
                Ideas worth <span className="text-red-600 dark:text-red-500">sharing</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-red-500/80 to-red-500/0"
                ></motion.div>
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300">
              Explore our collection of inspiring talks from TEDxBeixinqiao events that showcase innovative ideas and thought-provoking discussions.
            </p>
          </motion.div>

          {/* Featured Video */}
          <motion.div variants={itemVariants} className="mb-16">
            <Dialog>
              <DialogTrigger asChild>
                <div className="group relative mx-auto aspect-video w-full cursor-pointer overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-red-600/20 dark:shadow-black/50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={videos[currentIndex].thumbnail || "/placeholder.svg"}
                        alt={videos[currentIndex].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Video overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="relative h-20 w-20 rounded-full border-2 border-white bg-red-600/90 text-white shadow-lg transition-colors duration: 300 hover:bg-red-700"
                          onClick={() => setActiveVideo(videos[currentIndex])}
                        >
                          <Play className="h-10 w-10" />
                          <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -inset-1 rounded-full border-2 border-white/20"
                          />
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        className="mt-6 w-full max-w-xl px-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.h3 
                            key={`title-${currentIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mb-3 text-center text-3xl font-bold md:text-4xl"
                          >
                            {videos[currentIndex].title}
                          </motion.h3>
                        </AnimatePresence>
                        
                        <AnimatePresence mode="wait">
                          <motion.p 
                            key={`speaker-${currentIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="mb-4 text-center text-xl font-medium text-gray-200"
                          >
                            {videos[currentIndex].speaker}
                          </motion.p>
                        </AnimatePresence>
                        
                        <div className="mt-3 flex justify-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{videos[currentIndex].duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{videos[currentIndex].date}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>{videos[currentIndex].title}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videos[currentIndex].videoId}`}
                    title={videos[currentIndex].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                  ></iframe>
                </div>
                <div className="mt-4">
                  <h3 className="mb-1 text-lg font-semibold">{videos[currentIndex].speaker}</h3>
                  <div className="mb-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{videos[currentIndex].duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{videos[currentIndex].date}</span>
                    </div>
                  </div>
                  <p className="mt-2">{videos[currentIndex].description}</p>
                </div>
              </DialogContent>
            </Dialog>

            {/* Navigation Controls */}
            <div className="mt-6 flex justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevVideo}
                  disabled={currentIndex === 0}
                  className="h-12 w-12 rounded-full border-red-600 text-red-600 transition-all duration-200 disabled:opacity-50 dark:border-red-500 dark:text-red-500"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </motion.div>
              
              <div className="flex items-center gap-3">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="group relative"
                    aria-label={`Show video ${index + 1}`}
                  >
                    <div className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-red-600 dark:bg-red-500"
                        : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }`}
                    ></div>
                    {index === currentIndex && (
                      <motion.div 
                        layoutId="videoIndicator"
                        className="absolute -inset-1 rounded-full border-2 border-red-600/50 dark:border-red-500/50"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextVideo}
                  disabled={currentIndex === videos.length - 1}
                  className="h-12 w-12 rounded-full border-red-600 text-red-600 transition-all duration-200 disabled:opacity-50 dark:border-red-500 dark:text-red-500"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Video Grid */}
          <motion.div 
            variants={itemVariants} 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videos.map((video, index) => (
              <Dialog key={video.id}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Card className="group cursor-pointer overflow-hidden border-none bg-white/80 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10 dark:bg-gray-900/80 dark:hover:shadow-red-600/20">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-12 w-12 rounded-full border-2 border-white bg-red-600/90 text-white hover:bg-red-700"
                              >
                                <Play className="h-6 w-6" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Duration badge */}
                        <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-black transition-colors duration-300 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-500">
                          {video.title}
                        </h3>
                        <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">{video.speaker}</p>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-3 w-3" />
                          {video.date}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>{video.title}</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-md"
                    ></iframe>
                  </div>
                  <div className="mt-4">
                    <h3 className="mb-1 text-lg font-semibold">{video.speaker}</h3>
                    <div className="mb-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{video.date}</span>
                      </div>
                    </div>
                    <p className="mt-2">{video.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="mt-16 flex justify-center"
          >
            <Button 
              variant="default"
              size="lg"
              className="group relative overflow-hidden bg-red-600 px-8 py-6 text-lg font-medium text-white transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
            >
              <motion.span
                initial={{ width: "100%", height: "100%", x: "-101%" }}
                whileHover={{ x: "101%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 bg-red-500/40"
              />
              <span className="relative z-10 flex items-center gap-2">
                View all talks
                <motion.div
                  className="relative z-10"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
