"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Play,
  ExternalLink,
  X,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { speakers, type Speaker, type Social } from "@/data/speakers";

// Removed duplicate speakers array as it's now imported from data/speakers.ts

export default function SpeakersGrid() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  // Removed redundant Speaker interface as it's imported from data/speakers.ts

  const renderSocialIcon = (platform: string) => {
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
                    <p className="mb-2 text-sm font-medium text-gray-300">
                      {speaker.title}
                    </p>
                    <p className="mb-4 text-base font-medium text-red-400">
                      {speaker.talkTitle}
                    </p>

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
                        {renderSocialIcon(social.platform)}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </DialogTrigger>

            {/* Enhanced Speaker Modal with Video - Width increased */}
            <DialogContent className="max-w-[95vw] overflow-hidden border-0 p-0 sm:max-w-[1000px] md:max-w-[1200px] bg-transparent">
              <div className="bg-white/95 backdrop-blur-xl dark:bg-black/95 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                {/* Background decorative elements */}
                <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-red-600/10 blur-[80px] dark:bg-red-600/15 z-0"></div>
                <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-red-600/10 blur-[80px] dark:bg-red-600/15 z-0"></div>

                <div className="relative z-10 p-6 md:p-8">
                  <DialogHeader className="mb-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {speaker.talkTitle}
                      </DialogTitle>
                    </div>
                  </DialogHeader>

                  <div className="grid gap-8 md:grid-cols-7">
                    {/* Video Section - Takes 4/7 of the width on medium+ screens */}
                    <div className="md:col-span-4 w-full h-full">
                      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg border border-gray-200 dark:border-gray-800">
                        {/* Fixed YouTube embed by ensuring it has proper dimensions and removed relative URL formatting */}
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${speaker.videoId}`}
                          title={`${speaker.name} - ${speaker.talkTitle}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                          style={{ aspectRatio: "16/9" }}
                        ></iframe>
                      </div>
                    </div>

                    {/* Speaker Info - Takes 3/7 of the width on medium+ screens */}
                    <div className="md:col-span-3 flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-red-500 shadow-lg">
                          <Image
                            src={
                              speaker.imageSrc ||
                              `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(speaker.name.charAt(0))}`
                            }
                            alt={speaker.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {speaker.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {speaker.title}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-900/70 rounded-xl p-4 mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          About the Talk
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {speaker.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Talk Summary
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {speaker.talkSummary}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Connect
                          </h4>
                          <div className="flex gap-3">
                            {speaker.socials.map((social, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 rounded-full transition-all duration-300 bg-white dark:bg-gray-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-500 border border-gray-200 dark:border-gray-700"
                              >
                                <a
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {renderSocialIcon(social.platform)}
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </motion.div>
  );
}
