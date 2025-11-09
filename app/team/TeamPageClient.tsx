"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TeamModal } from "@/components/team/team-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getSortedTeam,
  getTeamByRole,
  roleCategories,
  type TeamMember,
} from "@/data/team-members";
import { cn } from "@/lib/utils";

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
  const handleScroll = useCallback(() => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowScrollShadows({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 10,
      });
    }
  }, []);

  useEffect(() => {
    const tabsEl = tabsContainerRef.current;
    if (tabsEl) {
      tabsEl.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => tabsEl.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

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
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,rgba(0,0,0,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(255,255,255,0)_100%)]" />
      <div className="absolute top-40 left-0 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10" />
      <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-red-600/5 blur-3xl dark:bg-red-600/10" />

      {/* Main content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Team header with animated underline */}
        <div className="mb-12 text-center">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text font-bold text-5xl text-transparent leading-tight md:text-6xl dark:from-white dark:to-gray-300"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            Meet our{" "}
            <span className="text-red-600 dark:text-red-500">Team</span>
          </motion.h1>

          <motion.div
            animate={{ width: 96, opacity: 1 }}
            className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-red-600 to-red-300"
            initial={{ width: 0, opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-gray-700 text-lg leading-relaxed dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            The passionate individuals who bring TEDxBeixinqiao to life.
            Together, we're dedicated to creating a platform where innovative
            ideas flourish and meaningful connections form.
          </motion.p>
        </div>

        {/* Team member filtering with animated tabs */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="relative">
            {/* Left shadow and scroll button */}
            <AnimatePresence>
              {showScrollShadows.left && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-y-0 left-0 z-10 flex items-center"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900" />
                  <Button
                    className="relative ml-1 rounded-full"
                    onClick={() => scrollTabs("left")}
                    size="icon"
                    variant="ghost"
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
                  animate={{ opacity: 1 }}
                  className="absolute inset-y-0 right-0 z-10 flex items-center"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900" />
                  <Button
                    className="relative mr-1 rounded-full"
                    onClick={() => scrollTabs("right")}
                    size="icon"
                    variant="ghost"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable tabs */}
            <div
              className="scrollbar-hide flex overflow-x-auto pb-2"
              ref={tabsContainerRef}
            >
              <Tabs
                className="mx-auto"
                defaultValue="all"
                onValueChange={setActiveFilter}
                value={activeFilter}
              >
                <TabsList className="bg-gray-100/80 backdrop-blur dark:bg-gray-800/50">
                  {roleCategories.map((category) => (
                    <TabsTrigger
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600"
                      key={category.id}
                      value={category.id}
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
          animate={{ opacity: 1 }}
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          layout
          transition={{ delay: 1, duration: 0.7 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                key={member.name}
                layout
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="group h-full overflow-hidden border-none bg-white shadow-lg transition-all duration-500 hover:shadow-red-600/10 hover:shadow-xl dark:bg-gray-900 dark:hover:shadow-red-600/20"
                  onClick={() => {
                    setSelectedMember(member);
                    setDialogOpen(true);
                  }}
                >
                  {/* Image with gradient overlay */}
                  <div
                    className="relative aspect-square w-full cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHoveredMember(member.name)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <Image
                      alt={member.name}
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredMember === member.name
                          ? "scale-110"
                          : "scale-100"
                      )}
                      fill
                      src={member.image}
                    />
                  </div>

                  {/* Name, title and role chip */}
                  <div className="cursor-pointer p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-semibold text-black text-lg dark:text-white">
                        {member.name}
                      </h3>
                      <div
                        className={cn(
                          "rounded-full px-2 py-0.5 font-medium text-xs",
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
                    <p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
                      {member.title}
                    </p>

                    {/* Social icons without the Read Bio button */}
                    <div className="mt-auto flex items-center justify-end">
                      <div className="flex gap-1.5">
                        {member.socials?.slice(0, 2).map((social, idx) => (
                          <motion.a
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            href={social.url}
                            key={idx}
                            onClick={(e) => e.stopPropagation()}
                            rel="noopener noreferrer"
                            target="_blank"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }} // Prevent modal from opening when clicking social links
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
                  onOpenChange={(open) => {
                    if (!open) {
                      setDialogOpen(false);
                    }
                  }}
                  open={dialogOpen && selectedMember === member}
                >
                  <DialogTrigger className="hidden" />
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Team modal component */}
        <TeamModal
          member={selectedMember}
          onOpenChange={setDialogOpen}
          open={dialogOpen}
        />
      </div>
    </div>
  );
}
