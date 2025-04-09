"use client"

import SpeakersGrid from "@/components/speakers-grid"
import { motion } from "framer-motion"

export default function SpeakersPageClient() {
  return (
    <div className="relative overflow-hidden bg-white py-24 dark:bg-black">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10"></div>
      <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10"></div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-5xl lg:text-6xl">
            Our <span className="text-red-600 dark:text-red-500">Speakers</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Meet the innovative minds who shared their ideas and experiences at TEDxBeixinqiao 2024. Click on a speaker
            to watch their talk.
          </p>
        </motion.div>

        <SpeakersGrid />
      </div>
    </div>
  )
}
