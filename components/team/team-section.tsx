"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeamMember, getSortedTeam } from "@/data/team-members";

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get only 4 featured team members
  const featuredTeam = getSortedTeam().slice(0, 4);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="team" className="w-full py-24">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={itemVariants}
            className="mb-12 flex flex-col items-center text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Our Team
            </span>
            <h2 className="mb-6 text-4xl font-bold text-black dark:text-white md:text-5xl">
              Meet the{" "}
              <span className="text-red-600 dark:text-red-500">People</span>{" "}
              Behind TEDxBeixinqiao
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300">
              Our dedicated team brings together diverse talents and
              perspectives to create meaningful TEDx experiences that inspire
              and connect our community.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          >
            {featuredTeam.map((member) => (
              <Link href={`/team#${member.role}`} key={member.name} passHref>
                <div
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredMember(member.name)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="relative aspect-square bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700 ease-out",
                        hoveredMember === member.name
                          ? "scale-110"
                          : "scale-100"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300",
                        hoveredMember === member.name
                          ? "opacity-100"
                          : "opacity-70"
                      )}
                    ></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div
                      className={cn(
                        "mb-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                        member.role === "leadership"
                          ? "bg-red-600/80"
                          : member.role === "communications"
                            ? "bg-blue-600/80"
                            : member.role === "operations"
                              ? "bg-amber-600/80"
                              : member.role === "speakers"
                                ? "bg-emerald-600/80"
                                : member.role === "technical"
                                  ? "bg-indigo-600/80"
                                  : "bg-gray-600/80"
                      )}
                    >
                      {member.role.charAt(0).toUpperCase() +
                        member.role.slice(1)}
                    </div>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm text-white/90">{member.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <Button asChild>
              <Link href="/team" className="flex items-center gap-1">
                Meet All Team Members <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
