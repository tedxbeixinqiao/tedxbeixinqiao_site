"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IdeasInMotionPopup } from "@/components/home/ideas-in-motion-popup";
import { SpeakerApplicationMessageModal } from "@/components/speaker-application-message-modal";
import { cn } from "@/lib/utils";

// Lint constants
const SCROLL_THRESHOLD = 50;
const IMAGE_LOAD_DELAY_MS = 300;
const MOTION_BADGE_DURATION = 0.7;
const MOTION_TITLE_DURATION = 0.8;
const MOTION_TITLE_DELAY = 0.3;
const MOTION_LINE_DELAY = 0.8;
const MOTION_LINE_DURATION = 1;
const MOTION_DESC_DURATION = 0.8;
const MOTION_DESC_DELAY = 0.6;
const MOTION_CTA_DURATION = 0.8;
const MOTION_CTA_DELAY = 0.8;
const MOTION_TAGLINE_DURATION = 0.8;
const MOTION_TAGLINE_DELAY = 1.0;
const MOTION_SCROLL_OPACITY_DELAY = 1.5;
const MOTION_SCROLL_OPACITY_DURATION = 1;
const MOTION_SCROLL_Y_DELAY = 1.5;
const MOTION_SCROLL_Y_DURATION = 2;
// Unused constants removed
const MOTION_ARROW_DURATION = 1.5;
const MOTION_ARROW_REPEAT = Number.POSITIVE_INFINITY;
const MOTION_ARROW_EASE = "easeInOut";
const MOTION_LINE_WIDTH = "80%";
const MOTION_LINE_WIDTH_INIT = 0;
// Unused constant removed
const MOTION_ARROW_Y_START = 0;
const MOTION_ARROW_Y_PEAK = -5;
const MOTION_ARROW_Y_END = 0;
const MOTION_ARROW_Y_ANIMATION = [
  MOTION_ARROW_Y_START,
  MOTION_ARROW_Y_PEAK,
  MOTION_ARROW_Y_END,
];

const MOTION_ROTATE_START = 0;
const MOTION_ROTATE_LEFT = -0.5;
const MOTION_ROTATE_RIGHT = 0.5;
const MOTION_ROTATE_ANIMATION = [
  MOTION_ROTATE_START,
  MOTION_ROTATE_LEFT,
  MOTION_ROTATE_RIGHT,
  MOTION_ROTATE_LEFT,
  MOTION_ROTATE_START,
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for subtle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("#about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-16"
      id="home"
    >
      {/* Background with dynamic parallax effectzs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Enhanced overlay gradient for better text readability */}
        <div
          className={cn(
            "absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/60 to-black/40 transition-opacity duration-700",
            isLoaded ? "opacity-80" : "opacity-0"
          )}
        />

        {/* Background image with subtle parallax */}
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-700 ease-out",
            scrolled ? "scale-105" : "scale-100"
          )}
        >
          <Image
            alt="TEDxBeixinqiao Event"
            className={cn(
              "absolute inset-0 object-cover object-center transition-all duration-1000",
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
              scrolled ? "scale-105" : "scale-100"
            )}
            fill
            onLoad={() => {
              setTimeout(() => {
                setIsLoaded(true);
              }, IMAGE_LOAD_DELAY_MS);
            }}
            priority
            src="/hero-bg.jpg"
          />
        </div>

        {/* Red accent shapes */}
        <div className="absolute top-1/4 right-[10%] h-64 w-64 rounded-full bg-red-600/10 blur-[100px] dark:bg-red-600/20" />
        <div className="absolute bottom-1/4 left-[10%] h-64 w-64 rounded-full bg-red-600/10 blur-[100px] dark:bg-red-600/20" />
      </div>

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Upper badge - "December 6th, 2025" */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: MOTION_BADGE_DURATION }}
          >
            <span className="inline-flex items-center rounded-full border border-white/30 bg-black/30 px-4 py-1.5 font-medium text-sm text-white backdrop-blur-sm">
              December 6th, 2025 • Beixinqiao, Beijing
            </span>
          </motion.div>

          {/* Main title animation */}
          <div className="mb-6 flex flex-col items-center">
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: MOTION_TITLE_DURATION,
                delay: MOTION_TITLE_DELAY,
              }}
            >
              <div className="mb-4 flex items-center gap-1 text-center">
                <h1 className="font-extrabold text-5xl text-red-600 text-shadow-lg sm:text-6xl md:text-7xl">
                  TEDx
                </h1>
                <h1 className="font-bold text-4xl text-shadow-lg text-white sm:text-5xl md:text-6xl">
                  Beixinqiao
                </h1>
              </div>
              <motion.div
                animate={{ width: MOTION_LINE_WIDTH }}
                className="mx-auto mb-4 h-[3px] bg-gradient-to-r from-red-600/0 via-red-600 to-red-600/0"
                initial={{ width: MOTION_LINE_WIDTH_INIT }}
                transition={{
                  delay: MOTION_LINE_DELAY,
                  duration: MOTION_LINE_DURATION,
                }}
              />
              <h2 className="font-medium text-2xl text-shadow-sm text-white sm:text-3xl md:text-4xl">
                Ideas <span className="text-red-500">That Move</span>
              </h2>
            </motion.div>
          </div>

          {/* Description text with enhanced visibility */}
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-10 max-w-3xl text-center font-medium text-lg text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: MOTION_DESC_DURATION,
              delay: MOTION_DESC_DELAY,
            }}
          >
            IdeasThatMove celebrates powerful ideas, whether it's a leap of
            innovation, a shift in mindset, or a story that stirs something deep
            within us. Join us for a captivating journey where ideas in motion
            lead to change in progress.
          </motion.p>

          {/* CTA button with enhanced glow effect */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: MOTION_CTA_DURATION,
              delay: MOTION_CTA_DELAY,
            }}
          >
            <motion.div
              animate={{
                y: MOTION_ARROW_Y_ANIMATION,
                transition: {
                  y: {
                    duration: MOTION_ARROW_DURATION,
                    repeat: MOTION_ARROW_REPEAT,
                    ease: MOTION_ARROW_EASE,
                  },
                },
              }}
              className="glow-button"
              id="speaker-application"
              whileHover={{
                scale: 1.05,
                rotate: MOTION_ROTATE_ANIMATION,
                transition: {
                  scale: { duration: 0.2 },
                  rotate: {
                    duration: 0.5,
                    repeat: MOTION_ARROW_REPEAT,
                    ease: MOTION_ARROW_EASE,
                  },
                },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <SpeakerApplicationMessageModal className="relative overflow-hidden rounded-lg border-2 border-red-400/80 bg-gradient-to-r from-red-600 to-red-700 px-10 py-6 font-bold text-white text-xl shadow-xl hover:from-red-700 hover:to-red-800 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800" />
              <style jsx>{`
                .glow-button {
                  position: relative;
                  z-index: 10;
                  isolation: isolate;
                  cursor: pointer;
                  box-shadow: 0 0 25px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(239, 68, 68, 0.4);
                  border-radius: 12px;
                }
                .glow-button::before {
                  content: '';
                  position: absolute;
                  inset: -5px;
                  z-index: -1;
                  background: linear-gradient(45deg, #ef4444, #fb7185, #ef4444);
                  border-radius: 16px;
                  filter: blur(12px);
                  opacity: 0.7;
                  transition: all 0.3s ease;
                  animation: borderPulse 3s infinite;
                }
                .glow-button::after {
                  content: '';
                  position: absolute;
                  inset: -3px;
                  z-index: -2;
                  background: linear-gradient(45deg, #dc2626, #ef4444, #f87171);
                  border-radius: 16px;
                  filter: blur(8px);
                  opacity: 0.6;
                  animation: rotate 4s linear infinite;
                }
                .glow-button:hover::before {
                  opacity: 0.9;
                  filter: blur(15px);
                }
                .glow-button:hover::after {
                  opacity: 0.8;
                  filter: blur(10px);
                }
                @keyframes borderPulse {
                  0%, 100% {
                    opacity: 0.7;
                    transform: scale(1);
                  }
                  50% {
                    opacity: 0.9;
                    transform: scale(1.05);
                  }
                }
                @keyframes rotate {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              `}</style>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: MOTION_TAGLINE_DURATION,
              delay: MOTION_TAGLINE_DELAY,
            }}
          >
            <div className="relative px-8 py-2">
              <div className="absolute inset-0 rounded-lg bg-black/30 backdrop-blur-sm" />
              <p className="relative flex items-center gap-3 font-semibold text-white text-xl uppercase tracking-wider [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-red-500" />
                <span className="font-bold text-red-500">FROM SPARK</span>
                <span className="font-light">TO</span>
                <span className="font-bold text-red-500">SHIFT</span>
                <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-red-500" />
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        animate={{
          opacity: 1,
          y: [0, 10, 0],
        }}
        className="absolute right-0 bottom-10 left-0 mx-auto flex cursor-pointer flex-col items-center"
        initial={{ opacity: 0 }}
        onClick={scrollToNextSection}
        transition={{
          opacity: {
            delay: MOTION_SCROLL_OPACITY_DELAY,
            duration: MOTION_SCROLL_OPACITY_DURATION,
          },
          y: {
            delay: MOTION_SCROLL_Y_DELAY,
            duration: MOTION_SCROLL_Y_DURATION,
            repeat: MOTION_ARROW_REPEAT,
            repeatType: "loop",
          },
        }}
      >
        <span className="mb-2 font-medium text-sm text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          Explore More
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur-sm">
          <ArrowDown className="h-5 w-5 text-white" />
        </div>
      </motion.button>

      {/* Auto-popup for Ideas in Motion event */}
      <IdeasInMotionPopup />
    </section>
  );
}
