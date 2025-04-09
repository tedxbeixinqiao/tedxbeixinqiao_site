"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Facebook, Twitter, Linkedin, Instagram, Play, ArrowRight, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const speakers = [
  {
    name: "Cheryl Yang",
    title: "Blockchain Expert",
    talkTitle: "The Future of Data Privacy",
    description: "The Transformative Impact of Blockchain Technology in the Next Decade",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"] as Array<"Facebook-f" | "Twitter" | "Linkedin-in" | "Instagram">,
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    name: "Joseph C. Stewart",
    title: "International School Art Teacher",
    talkTitle: "How to Become Reptile-Skinned",
    description: "Challenges and Opportunities for Parents of Children with Developmental Disorders",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    name: "Merna Al Nasser",
    title: "CGTN Editor/Moderator",
    talkTitle: "We are all Storytellers",
    description: "Transforming Media Narratives For Global Understandings",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    name: "Niamh Cunningham",
    title: "Visual Artist",
    talkTitle: "Rekindling our Bond with Nature",
    description: "Nourishing Growth and Understanding through Tree Stories",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    name: "Saverio Quaia",
    title: "Interior Designer",
    talkTitle: "What the Office of Tomorrow Will Look Like",
    description: "Workplace Transformation and Future Trends in the Post-Epidemic Era",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    name: "Stephanie Sam",
    title: "International Communications Specialist",
    talkTitle: "Rethinking the Way We Communicate",
    description: "Rethinking the Way We Communicate in the Age of Globalization",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    name: "Xiaoyue Pu",
    title: "Artist",
    talkTitle: "Female Utopia in Ancient China",
    description: "The Combing Woman and the Auntie's House in Feudal China",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
]

export default function SpeakersSection() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<null | typeof speakers[number]>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  
  interface SocialIconProps {
    social: string;
  }
  const getSocialIcon = (social: "Facebook-f" | "Twitter" | "Linkedin-in" | "Instagram"): React.ReactNode => {
    const icons: Record<"Facebook-f" | "Twitter" | "Linkedin-in" | "Instagram", React.ReactNode> = {
      "Facebook-f": <Facebook className="h-4 w-4" />,
      "Twitter": <Twitter className="h-4 w-4" />,
      "Linkedin-in": <Linkedin className="h-4 w-4" />,
      "Instagram": <Instagram className="h-4 w-4" />,
    };
    return icons[social];
  };
  
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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  }
  
  return (
    <section id="speakers" className="relative w-full overflow-hidden bg-white py-24 dark:bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_100%)]"></div>
        <svg 
          className="absolute left-0 top-0 h-full w-full stroke-red-100/20 dark:stroke-red-900/5" 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          stroke="currentColor"
        >
          <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div 
        ref={containerRef}
        className="container mx-auto px-4"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto max-w-6xl"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-16 flex flex-col items-center text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Ideas Worth Sharing
            </span>
            <h2 className="mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:to-gray-400 md:text-5xl">
              Visionary <span className="text-red-600 dark:text-red-500">Speakers</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Meet the innovative minds bringing groundbreaking ideas to the TEDxBeixinqiao stage. Each speaker brings a unique perspective that challenges conventional thinking.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {speakers.map((speaker, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card className={cn(
                  "group relative overflow-hidden border-0 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900",
                  hoveredCard === index ? "shadow-xl" : "shadow-md"
                )}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=600&width=450&text=${encodeURIComponent(speaker.name)}`}
                      alt={speaker.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredCard === index ? "scale-105" : "scale-100"
                      )}
                    />
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300",
                      hoveredCard === index ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-sm font-medium uppercase tracking-wider opacity-80">
                          {speaker.title}
                        </p>
                        <h3 className="mb-3 mt-1 text-2xl font-bold">
                          {speaker.name}
                        </h3>
                        <div className="mb-4 flex gap-2">
                          {speaker.socials.map((social, idx) => (
                            <motion.button 
                              key={idx} 
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {getSocialIcon(social as "Facebook-f" | "Twitter" | "Linkedin-in" | "Instagram")}
                            </motion.button>
                          ))}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full border-white bg-transparent text-white hover:bg-white hover:text-red-600"
                              onClick={() => setSelectedSpeaker(speaker)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Watch Talk
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[90vw] sm:max-w-[800px]">
                            <DialogHeader>
                              <DialogTitle className="text-lg md:text-2xl">{speaker.talkTitle}</DialogTitle>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-4 top-4"
                                onClick={() => {
                                  const focusGuard = document.querySelector('[data-radix-focus-guard]');
                                  if (focusGuard?.nextSibling instanceof HTMLElement) {
                                    focusGuard.nextSibling.click();
                                  }
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </DialogHeader>
                            <div className="aspect-video w-full overflow-hidden rounded-lg">
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${speaker.videoId}?autoplay=1`}
                                title={`${speaker.name} - ${speaker.talkTitle}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                              ></iframe>
                            </div>
                            <div className="mt-4">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 overflow-hidden rounded-full">
                                  <Image
                                    src={`/placeholder.svg?height=100&width=100&text=${encodeURIComponent(
                                      speaker.name.charAt(0)
                                    )}`}
                                    alt={speaker.name}
                                    width={48}
                                    height={48}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{speaker.name}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{speaker.title}</p>
                                </div>
                              </div>
                              <p className="mt-4">{speaker.description}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-black dark:text-white">{speaker.name}</h3>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{speaker.title}</p>
                    <p className="mb-4 text-base font-medium text-red-600 dark:text-red-500 line-clamp-1">
                      {speaker.talkTitle}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/speakers"
              className="group inline-flex items-center gap-1.5 rounded-full bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
            >
              <span>View all speakers</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
