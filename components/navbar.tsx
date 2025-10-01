"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMobile();
  const pathname = usePathname();

  const navigation = [
    { name: "Speakers", path: "/speakers" },
    { name: "Team", path: "/team" },
    { name: "Speaker Application", path: "/speaker-application" },
    { name: "Contact", path: "/contact" },
  ];

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.header
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        "bg-white/30 backdrop-blur-lg dark:bg-black/30",
        scrolled && "shadow-lg"
      )}
      initial={{ y: -100 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        <Link className="flex items-center gap-2 font-bold text-xl" href="/">
          <motion.div
            className={cn(
              "relative flex items-center",
              mounted && isMobile && "scale-[0.85]"
            )}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            whileHover={{ scale: mounted && isMobile ? 1 : 1.05 }}
          >
            <motion.span
              className={cn(
                "font-extrabold text-red-600 dark:text-red-500",
                // Only apply mobile-specific styles after mounting
                mounted ? (isMobile ? "text-lg" : "text-2xl") : "text-2xl"
              )}
              transition={{ duration: 0.2 }}
              whileHover={{
                textShadow: "0 0 8px rgba(239, 68, 68, 0.5)",
              }}
            >
              TEDx
            </motion.span>
            <motion.span
              className={cn(
                "font-bold text-black dark:text-white",
                // Only apply mobile-specific styles after mounting
                mounted ? (isMobile ? "text-lg" : "text-2xl") : "text-2xl"
              )}
            >
              Beixinqiao
            </motion.span>

            {/* Animated underline */}
            <motion.div
              className="-bottom-1 absolute left-0 h-[2px] w-0 bg-red-600 dark:bg-red-500"
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ width: "100%" }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                className={cn(
                  "group relative px-2 py-1.5 font-medium text-sm transition-colors",
                  isActive
                    ? "text-red-600 dark:text-red-500"
                    : "text-gray-800 hover:text-red-600 dark:text-gray-100 dark:hover:text-red-500"
                )}
                href={item.path}
                key={item.name}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Animated highlight */}
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.9,
                  }}
                  className={cn(
                    "-z-10 absolute inset-0 rounded-md bg-red-100 dark:bg-red-900/30",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                  initial={false}
                  transition={{ duration: 0.2 }}
                />

                {/* Animated underline */}
                <motion.span
                  animate={{ width: isActive ? "100%" : "0%" }}
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-red-600 dark:bg-red-500",
                    isActive ? "w-full" : "w-0"
                  )}
                  initial={false}
                  transition={{ duration: 0.3 }}
                  whileHover={{ width: "100%" }}
                />
              </Link>
            );
          })}

          <div className="overflow-hidden rounded-md">
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="overflow-hidden rounded-md">
            <ModeToggle />
          </div>

          <Button
            aria-label="Toggle Menu"
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            variant="ghost"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  initial={{ rotate: -90, opacity: 0 }}
                  key="close"
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  initial={{ rotate: 90, opacity: 0 }}
                  key="open"
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="absolute top-16 right-0 left-0 overflow-hidden bg-white/95 shadow-xl backdrop-blur-md md:hidden dark:bg-gray-950/95"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              animate="open"
              className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800"
              initial="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {navigation.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <motion.div
                    key={item.name}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -20 },
                    }}
                  >
                    <Link
                      className={cn(
                        "flex items-center justify-between px-6 py-3.5 font-medium text-base transition-colors",
                        isActive
                          ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-500"
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900/50"
                      )}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}

                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          transition={{ type: "spring", duration: 0.5 }}
                        >
                          <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-500" />
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
