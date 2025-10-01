"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TeamMember,
  roleCategories,
  getSortedTeam,
  getTeamByRole,
} from "@/data/team-members";
import { TeamModal } from "@/components/team/team-modal";

function getSocialIcon(platform: string) {
  switch (platform) {
    case "linkedin":
      return <Linkedin className="h-4 w-4" />;
    case "twitter":
      return <Twitter className="h-4 w-4" />;
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "instagram":
      return <Instagram className="h-4 w-4" />;
    case "website":
      return <Globe className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
}

export default function TeamPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showScrollShadows, setShowScrollShadows] = useState({
    left: false,
    right: true,
  });
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  // Filter team members based on active filter
  const filteredTeam =
    activeFilter === "all" ? getSortedTeam() : getTeamByRole(activeFilter);

  // Handle scroll shadows for tab navigation
  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowScrollShadows({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 10,
      });
    }
  };

  useEffect(() => {
    const tabsEl = tabsContainerRef.current;
    if (tabsEl) {
      tabsEl.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => tabsEl.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Scroll tabs left/right
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      tabsContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white py-24 dark:bg-black">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_100%)]"></div>
      <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10"></div>
      <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10"></div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Team header with animated underline */}
        <div className="mb-12 text-center">
          <motion.h1
            className="mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-5xl font-bold leading-tight text-transparent dark:from-white dark:to-gray-300 md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Meet our{" "}
            <span className="text-red-600 dark:text-red-500">Team</span>
          </motion.h1>

          <motion.div
            className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-red-600 to-red-300"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <motion.p
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            The passionate individuals who bring TEDxBeixinqiao to life.
            Together, we're dedicated to creating a platform where innovative
            ideas flourish and meaningful connections form.
          </motion.p>
        </div>

        {/* Team member filtering with animated tabs */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="relative">
            {/* Left shadow and scroll button */}
            <AnimatePresence>
              {showScrollShadows.left && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-y-0 left-0 z-10 flex items-center"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900"></div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative ml-1 rounded-full"
                    onClick={() => scrollTabs("left")}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right shadow and scroll button */}
            <AnimatePresence>
              {showScrollShadows.right && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-y-0 right-0 z-10 flex items-center"
                >
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900"></div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative mr-1 rounded-full"
                    onClick={() => scrollTabs("right")}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable tabs */}
            <div
              ref={tabsContainerRef}
              className="flex overflow-x-auto pb-2 scrollbar-hide"
            >
              <Tabs
                defaultValue="all"
                value={activeFilter}
                onValueChange={setActiveFilter}
                className="mx-auto"
              >
                <TabsList className="bg-gray-100/80 backdrop-blur dark:bg-gray-800/50">
                  {roleCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* Team members grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          layout
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                layout
                whileHover={{ y: -8 }}
              >
                <Card
                  className="group h-full overflow-hidden border-none bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-red-600/10 dark:bg-gray-900 dark:hover:shadow-red-600/20"
                  onClick={() => {
                    setSelectedMember(member);
                    setDialogOpen(true);
                  }}
                >
                  {/* Image with gradient overlay */}
                  <div
                    className="relative aspect-square w-full overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHoveredMember(member.name)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredMember === member.name
                          ? "scale-110"
                          : "scale-100"
                      )}
                    />
                  </div>

                  {/* Name, title and role chip */}
                  <div className="p-4 cursor-pointer">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-black dark:text-white">
                        {member.name}
                      </h3>
                      <div
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          member.role === "leadership"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : member.role === "communications"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : member.role === "operations"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                : member.role === "speakers"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                  : member.role === "creative"
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                    : member.role === "funding"
                                      ? "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
                                      : member.role === "technical"
                                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        )}
                      >
                        {member.role.charAt(0).toUpperCase() +
                          member.role.slice(1)}
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {member.title}
                    </p>

                    {/* Social icons without the Read Bio button */}
                    <div className="mt-auto flex items-center justify-end">
                      <div className="flex gap-1.5">
                        {member.socials?.slice(0, 2).map((social, idx) => (
                          <motion.a
                            key={idx}
                            href={social.url}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking social links
                          >
                            {getSocialIcon(social.platform)}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Hidden Dialog trigger component */}
                <Dialog
                  open={dialogOpen && selectedMember === member}
                  onOpenChange={(open) => {
                    if (!open) setDialogOpen(false);
                  }}
                >
                  <DialogTrigger className="hidden"></DialogTrigger>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Team modal component */}
        <TeamModal
          member={selectedMember}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </div>
  );
}
