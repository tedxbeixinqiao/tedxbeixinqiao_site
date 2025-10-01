"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Speaker } from "@/data/speakers";

interface SpeakerModalProps {
  speaker: Speaker | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SpeakerModal({
  speaker,
  open,
  onOpenChange,
}: SpeakerModalProps) {
  if (!speaker) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent shadow-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative flex flex-col overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg dark:bg-gray-900/90 md:flex-row md:min-h-[650px]"
        >
          {/* Left column: cinematic image section without gradient overlay */}
          <div className="relative w-full overflow-hidden md:w-2/5 lg:w-1/2">
            {/* Main image */}
            <div className="relative h-96 w-full md:h-full">
              <Image
                src={speaker.imageSrc}
                alt={speaker.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Category badge with elegant styling */}
              <div className="absolute top-6 left-6 z-10">
                <div className="rounded-full bg-red-500/20 border border-red-500/30 text-red-50 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  {speaker.category}
                </div>
              </div>
            </div>

            {/* Elegant name overlay positioned at the bottom of the image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-6 pt-12">
              <div className="flex flex-col items-start space-y-1">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-xs text-3xl font-bold tracking-tight text-white md:text-4xl"
                >
                  {speaker.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-medium text-white/80"
                >
                  {speaker.title}
                </motion.p>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-red-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-8 left-1/3 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Right column: content with premium scrollable area */}
          <div className="relative flex-1 p-6 md:p-8 lg:p-10">
            {/* Accessibility requirement - DialogTitle (visually hidden) */}
            <DialogTitle className="sr-only">
              {speaker.name} - {speaker.title}
            </DialogTitle>

            {/* Premium styled content area with custom scrollbar */}
            <div className="custom-scrollbar max-h-[400px] overflow-y-auto pr-6 md:max-h-[540px]">
              {/* Talk title with elegant styling */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="relative rounded-xl bg-gradient-to-br from-gray-50/80 to-gray-100/50 p-6 dark:from-gray-800/50 dark:to-gray-700/30">
                  <svg
                    className="absolute left-4 top-4 h-8 w-8 text-red-300/30 dark:text-red-500/20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 8h10M7 12h10M7 16h4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="pl-6 text-xl font-bold text-gray-900 dark:text-white">
                    {speaker.talkTitle}
                  </h3>
                </div>
              </motion.div>

              {/* Talk summary with premium typography */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  About {speaker.name.split(" ")[0]}
                </p>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-red-600 dark:first-letter:text-red-500">
                    {speaker.talkSummary}
                  </p>
                </div>
              </motion.div>

              {/* Talk description section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  About the talk
                </p>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p>{speaker.description}</p>
                </div>
              </motion.div>

              {/* Video section if available */}
              {speaker.videoId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 border-t border-gray-200/50 pt-8 dark:border-gray-700/50"
                >
                  <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Watch the talk
                  </p>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${speaker.videoId}`}
                      title={`${speaker.name} - ${speaker.talkTitle}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
