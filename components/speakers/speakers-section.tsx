"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Play,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { speakers, type Speaker } from "@/data/speakers";

// Social icon mapping helper function
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "twitter":
      return <Twitter className="h-4 w-4" />;
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    case "instagram":
      return <Instagram className="h-4 w-4" />;
    default:
      return null;
  }
};

export default function SpeakersSection() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Only display first 4 speakers in the homepage section
  const displayedSpeakers = speakers.slice(0, 4);

  return (
    <section id="speakers" className="w-full py-24">
      <div ref={containerRef} className="container mx-auto px-4">
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
            <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
              Visionary{" "}
              <span className="text-red-600 dark:text-red-500">Speakers</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
              Our diverse speakers share ideas that spark conversations and
              change perspectives. Each talk brings a unique insight to the
              TEDxBeixinqiao stage.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-4"
          >
            {displayedSpeakers.map((speaker, index) => (
              <motion.div
                key={speaker.name}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden border-0 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900",
                    hoveredCard === index ? "shadow-xl" : "shadow-md"
                  )}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={
                        speaker.imageSrc ||
                        `/placeholder.svg?text=${encodeURIComponent(speaker.name)}`
                      }
                      alt={speaker.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredCard === index ? "scale-105" : "scale-100"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300",
                        hoveredCard === index ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-sm font-medium uppercase tracking-wider opacity-80">
                          {speaker.title}
                        </p>
                        <h3 className="mb-3 mt-1 text-2xl font-bold">
                          {speaker.name}
                        </h3>
                        <div className="mb-4 flex gap-2">
                          {speaker.socials.slice(0, 4).map((social, idx) => (
                            <motion.a
                              key={idx}
                              href={social.url}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getSocialIcon(social.platform)}
                            </motion.a>
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
                          <DialogContent className="max-w-[90vw] sm:max-w-[800px] p-0 border-none bg-transparent">
                            <div className="relative flex flex-col rounded-2xl bg-white/95 dark:bg-gray-900/95 shadow-2xl backdrop-blur-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                              {/* Accessibility requirement - visually hidden title */}
                              <DialogTitle className="sr-only">
                                {speaker.talkTitle}
                              </DialogTitle>

                              <div className="aspect-video w-full overflow-hidden">
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={`https://www.youtube.com/embed/${speaker.videoId}?autoplay=1&rel=0`}
                                  title={`${speaker.name} - ${speaker.talkTitle}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  style={{ aspectRatio: "16/9" }}
                                  className="h-full w-full"
                                ></iframe>
                              </div>

                              <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="h-12 w-12 overflow-hidden rounded-full">
                                    <Image
                                      src={
                                        speaker.imageSrc ||
                                        `/placeholder.svg?text=${encodeURIComponent(speaker.name.charAt(0))}`
                                      }
                                      alt={speaker.name}
                                      width={48}
                                      height={48}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                      {speaker.talkTitle}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-sm">
                                      <span className="font-medium text-red-600 dark:text-red-400">
                                        {speaker.name}
                                      </span>
                                      <span className="text-gray-500 dark:text-gray-400">
                                        • {speaker.title}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mb-4 flex flex-wrap gap-3 text-xs">
                                  <div className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-gray-700 dark:text-gray-200">
                                    {speaker.date}
                                  </div>
                                  <div className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-gray-700 dark:text-gray-200">
                                    {speaker.duration}
                                  </div>
                                  <div className="rounded-full bg-red-100 dark:bg-red-900/40 px-3 py-1 text-red-700 dark:text-red-300">
                                    {speaker.category}
                                  </div>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300">
                                  {speaker.talkSummary}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {speaker.name}
                    </h3>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      {speaker.title}
                    </p>
                    <p className="mb-4 text-base font-medium text-red-600 dark:text-red-500 line-clamp-1">
                      {speaker.talkTitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {speaker.duration}
                      </span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {speaker.category}
                      </span>
                    </div>
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
  );
}
