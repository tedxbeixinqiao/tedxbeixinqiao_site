"use client"

import { useRef } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, Instagram, Play, ExternalLink } from "lucide-react"
import { motion, useInView } from "framer-motion"

const speakers = [
  {
    name: "Cheryl Yang",
    title: "Blockchain Expert",
    talkTitle: "The Future of Data Privacy",
    description: "The Transformative Impact of Blockchain Technology in the Next Decade",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    imageSrc: "/speakers/cheryl.jpg",
  },
  {
    name: "Joseph C. Stewart",
    title: "International School Art Teacher",
    talkTitle: "How to Become Reptile-Skinned",
    description: "Challenges and Opportunities for Parents of Children with Developmental Disorders",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    imageSrc: "/speakers/joseph.jpg",
  },
  {
    name: "Merna Al Nasser",
    title: "CGTN Editor/Moderator",
    talkTitle: "We are all Storytellers",
    description: "Transforming Media Narratives For Global Understandings",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    imageSrc: "/speakers/merna.jpg",
  },
  {
    name: "Niamh Cunningham",
    title: "Visual Artist",
    talkTitle: "Rekindling our Bond with Nature",
    description: "Nourishing Growth and Understanding through Tree Stories",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    imageSrc: "/speakers/niamh.jpg",
  },
  {
    name: "Saverio Quaia",
    title: "Interior Designer",
    talkTitle: "What the Office of Tomorrow Will Look Like",
    description: "Workplace Transformation and Future Trends in the Post-Epidemic Era",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    imageSrc: "/speakers/saverio.jpg",
  },
  {
    name: "Stephanie Sam",
    title: "International Communications Specialist",
    talkTitle: "Rethinking the Way We Communicate",
    description: "Rethinking the Way We Communicate in the Age of Globalization",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    imageSrc: "/speakers/stephanie.jpg",
  },
  {
    name: "Xiaoyue Pu",
    title: "Artist",
    talkTitle: "Female Utopia in Ancient China",
    description: "The Combing Woman and the Auntie's House in Feudal China",
    socials: ["Facebook-f", "Twitter", "Linkedin-in", "Instagram"],
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    imageSrc: "/speakers/xiaoyue.jpg",
  },
]

export default function SpeakersGrid() {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, amount: 0.1 })

  const getSocialIcon = (social) => {
    switch (social) {
      case "Facebook-f":
        return <Facebook className="h-4 w-4" />
      case "Twitter":
        return <Twitter className="h-4 w-4" />
      case "Linkedin-in":
        return <Linkedin className="h-4 w-4" />
      case "Instagram":
        return <Instagram className="h-4 w-4" />
      default:
        return null
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      ref={gridRef}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {speakers.map((speaker, index) => (
        <motion.div key={index} variants={item} className="flex flex-col">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="group relative h-full cursor-pointer overflow-hidden rounded-xl border-0 bg-transparent p-0 shadow-none transition-all duration-500">
                {/* Decorative elements */}
                <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-red-600/10 blur-3xl dark:bg-red-600/20"></div>
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-red-600/10 blur-3xl dark:bg-red-600/20"></div>

                {/* Speaker Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:shadow-red-600/10 dark:bg-gray-900 dark:group-hover:shadow-red-600/20">
                  <Image
                    src={
                      speaker.imageSrc ||
                      `/placeholder.svg?height=600&width=450&text=${encodeURIComponent(speaker.name)}`
                    }
                    alt={speaker.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity duration-300"></div>

                  {/* Speaker Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="mb-1 text-2xl font-bold">{speaker.name}</h3>
                    <p className="mb-2 text-sm font-medium text-gray-300">{speaker.title}</p>
                    <p className="mb-4 text-base font-medium text-red-400">{speaker.talkTitle}</p>

                    {/* Watch Talk Button */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-5 w-5" />
                      </div>
                      <span className="font-medium">Watch Talk</span>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="absolute right-4 top-4 flex gap-2">
                    {speaker.socials.map((social, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-white/20"
                      >
                        {getSocialIcon(social)}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </DialogTrigger>

            {/* Speaker Modal with Video */}
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{speaker.talkTitle}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Speaker Image in Modal */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <Image
                    src={
                      speaker.imageSrc ||
                      `/placeholder.svg?height=600&width=450&text=${encodeURIComponent(speaker.name)}`
                    }
                    alt={speaker.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Speaker Info in Modal */}
                <div className="flex flex-col">
                  <h3 className="mb-1 text-xl font-semibold">{speaker.name}</h3>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{speaker.title}</p>
                  <p className="mb-6">{speaker.description}</p>

                  {/* Social Media in Modal */}
                  <div className="mb-6 flex gap-2">
                    {speaker.socials.map((social, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-full transition-all duration-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-500"
                      >
                        {getSocialIcon(social)}
                      </Button>
                    ))}
                  </div>

                  {/* Watch Video Button */}
                  <Button
                    className="group mt-auto flex items-center gap-2 bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      document.getElementById(`video-${speaker.videoId}`)?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch Talk</span>
                    <ExternalLink className="ml-auto h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>

              {/* Video Section */}
              <div id={`video-${speaker.videoId}`} className="mt-6">
                <h4 className="mb-3 text-lg font-medium">Talk Video</h4>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${speaker.videoId}`}
                    title={`${speaker.name} - ${speaker.talkTitle}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-md"
                  ></iframe>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </motion.div>
  )
}
