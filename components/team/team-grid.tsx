"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { teamMembers } from "@/data/team-members";

// Removed duplicate team data array as it's now imported from data/team-members.ts

export default function TeamGrid() {
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
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {teamMembers.map((member, index) => (
        <motion.div key={index} variants={item}>
          <Dialog>
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-red-600/10 bg-white/90 backdrop-blur-sm dark:bg-gray-900/70 dark:backdrop-blur-md dark:hover:shadow-red-600/20 border-0">
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={`/team/${member.name.split(" ")[0].toLowerCase()}.jpg`}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm font-medium">{member.title}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {member.name}
                </h3>
                <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                  {member.title}
                </p>

                <DialogTrigger asChild>
                  {/* Making the entire card clickable but without showing a button */}
                  <div className="absolute inset-0 cursor-pointer">
                    <span className="sr-only">Read bio for {member.name}</span>
                  </div>
                </DialogTrigger>
              </CardContent>
            </Card>

            <DialogContent className="max-w-3xl p-0 border-0 bg-transparent">
              <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <Image
                      src={`/team/${member.name.split(" ")[0].toLowerCase()}.jpg`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                      {member.title}
                    </p>

                    {member.quote && (
                      <div className="rounded-lg bg-gray-100 p-4 italic dark:bg-gray-800 mb-4">
                        "{member.quote}"
                      </div>
                    )}

                    <p className="text-gray-700 dark:text-gray-300">
                      {member.bio}
                    </p>
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
