"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()
  const pathname = usePathname()

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Speakers", path: "/speakers" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled 
          ? "bg-white/80 shadow-lg backdrop-blur-md dark:bg-gray-950/80" 
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <motion.div 
            className="relative flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.span
              className="text-2xl font-extrabold text-red-600 dark:text-red-500"
              whileHover={{ 
                textShadow: "0 0 8px rgba(239, 68, 68, 0.5)"
              }}
              transition={{ duration: 0.2 }}
            >
              TEDx
            </motion.span>
            <motion.span
              className="text-2xl font-bold text-black dark:text-white"
            >
              Beixinqiao
            </motion.span>
            
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 dark:bg-red-500"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.path
            
            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "group relative px-2 py-1.5 text-sm font-medium transition-colors",
                  isActive 
                    ? "text-red-600 dark:text-red-500" 
                    : "text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Animated highlight */}
                <motion.span 
                  className={cn(
                    "absolute inset-0 -z-10 rounded-md bg-red-100 dark:bg-red-900/30",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                  initial={false}
                  animate={{ 
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.9
                  }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Animated underline */}
                <motion.span 
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-red-600 dark:bg-red-500",
                    isActive ? "w-full" : "w-0"
                  )}
                  initial={false}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            )
          })}
          
          <Button 
            asChild 
            variant="default" 
            className="group relative overflow-hidden bg-red-600 transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            <Link href="/contact" className="flex items-center gap-1">
              <motion.span
                initial={{ width: "100%", height: "100%", x: "-101%" }}
                whileHover={{ x: "101%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 bg-red-500/40"
              />
              <span className="z-10">Get Ticket</span>
              <motion.div
                className="z-10"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
          
          <div className="overflow-hidden rounded-md">
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Button 
            asChild 
            variant="default" 
            size="sm" 
            className="group relative overflow-hidden bg-red-600 text-white transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            <Link href="/contact" className="flex items-center">
              <motion.span
                initial={{ width: "100%", height: "100%", x: "-101%" }}
                whileHover={{ x: "101%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 bg-red-500/40"
              />
              <span className="z-10">Get Ticket</span>
            </Link>
          </Button>
          
          <div className="overflow-hidden rounded-md">
            <ModeToggle />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle Menu"
            className="flex h-9 w-9 items-center justify-center rounded-md"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-16 overflow-hidden bg-white/95 backdrop-blur-md shadow-xl dark:bg-gray-950/95 md:hidden"
          >
            <motion.nav 
              className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navigation.map((item) => {
                const isActive = pathname === item.path
                
                return (
                  <motion.div
                    key={item.name}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -20 }
                    }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center justify-between px-6 py-4 text-base font-medium transition-colors",
                        isActive 
                          ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-500" 
                          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900/50"
                      )}
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
                )
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
