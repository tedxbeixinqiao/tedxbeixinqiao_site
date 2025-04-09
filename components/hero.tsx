"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white pt-16 dark:bg-black"
    >
      {/* Background with animated gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent dark:to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent dark:from-red-600/20" />
        <Image
          src="/hero-bg.jpg"
          alt="TEDxBeixinqiao Event"
          fill
          className="object-cover opacity-70 dark:opacity-20"
          priority
        />
      </div>

      {/* Animated red circle in background */}
      <motion.div
        className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-red-600/10 blur-3xl dark:bg-red-600/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex items-baseline justify-center"
          >
            <h1 className="text-5xl font-extrabold text-red-600 sm:text-6xl md:text-7xl">TEDx</h1>
            <h1 className="text-4xl font-bold text-black dark:text-white sm:text-5xl md:text-6xl">Beixinqiao</h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-center text-2xl font-semibold text-black dark:text-white sm:text-3xl md:text-4xl"
          >
            Innovation Illustrated
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 mx-auto max-w-3xl text-center text-lg text-gray-800 dark:text-gray-300"
          >
            Join us for TEDxBeixinqiao 2026, taking place on April 12. Experience thought-provoking talks from industry leaders, 
            innovative thinkers, and creative minds coming together to share ideas worth spreading. Be part of our growing community
            dedicated to innovation, inspiration, and positive change.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-red-600 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-600"
            >
              <Link href="#video-showcase">
                <span className="relative z-10">Watch Talks</span>
                <span className="absolute inset-0 -translate-x-full bg-red-700 transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-red-600 text-red-600 hover:text-white dark:border-red-500 dark:text-red-500"
            >
              <Link href="/speakers">
                <span className="relative z-10">Meet Speakers</span>
                <span className="absolute inset-0 -translate-x-full bg-red-600 transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-col items-center"
          >
            <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-400">
              April 12, 2026 • Beixinqiao subdistrict, Dongcheng, Beijing
            </p>
            <p className="text-xl font-semibold text-red-600 dark:text-red-500">Innovation Starts with You</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="flex flex-col items-center">
          <p className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-400">Scroll Down</p>
          <div className="h-10 w-6 rounded-full border-2 border-gray-700 dark:border-gray-400">
            <motion.div
              className="mx-auto mt-1 h-2 w-2 rounded-full bg-gray-700 dark:bg-gray-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
