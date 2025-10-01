"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { TeamMember } from "@/data/team-members";

// Import getSocialIcon from TeamPageClient
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

// Import missing icons
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Globe,
  Mail,
} from "lucide-react";

interface TeamModalProps {
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeamModal({ member, open, onOpenChange }: TeamModalProps) {
  if (!member) return null;

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
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Role badge with elegant styling */}
              <div className="absolute top-6 left-6 z-10">
                <div
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
                    member.role === "leadership"
                      ? "bg-red-500/20 text-red-50 border border-red-500/30"
                      : member.role === "communications"
                        ? "bg-blue-500/20 text-blue-50 border border-blue-500/30"
                        : member.role === "operations"
                          ? "bg-amber-500/20 text-amber-50 border border-amber-500/30"
                          : member.role === "speakers"
                            ? "bg-emerald-500/20 text-emerald-50 border border-emerald-500/30"
                            : member.role === "creative"
                              ? "bg-purple-500/20 text-purple-50 border border-purple-500/30"
                              : member.role === "funding"
                                ? "bg-teal-500/20 text-teal-50 border border-teal-500/30"
                                : member.role === "technical"
                                  ? "bg-indigo-500/20 text-indigo-50 border border-indigo-500/30"
                                  : "bg-gray-500/20 text-gray-50 border border-gray-500/30"
                  )}
                >
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
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
                  {member.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-medium text-white/80"
                >
                  {member.title}
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
              {member.name} - {member.title}
            </DialogTitle>

            {/* Removed close button */}

            {/* Premium styled content area with custom scrollbar */}
            <div className="custom-scrollbar max-h-[400px] overflow-y-auto pr-6 md:max-h-[540px]">
              {/* Quote section with elegant styling */}
              {member.quote && (
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
                        d="M10.0999 8.26001C9.02992 8.95001 8.21992 9.76001 7.66992 10.69C7.15992 11.62 6.89992 12.48 6.89992 13.26C7.00992 13.23 7.13992 13.21 7.28992 13.19C7.43992 13.17 7.59992 13.16 7.75992 13.16C8.63992 13.16 9.34992 13.44 9.88992 14C10.4299 14.56 10.6999 15.25 10.6999 16.06C10.6999 16.9 10.4199 17.61 9.85992 18.19C9.29992 18.75 8.56992 19.03 7.66992 19.03C6.68992 19.03 5.85992 18.65 5.17992 17.89C4.49992 17.13 4.15992 16.05 4.15992 14.64C4.15992 12.68 4.70992 10.94 5.80992 9.42001C6.90992 7.90001 8.42992 6.76001 10.3699 6.00001L10.0999 8.26001ZM19.0699 8.26001C17.9999 8.95001 17.1899 9.76001 16.6399 10.69C16.1299 11.62 15.8699 12.48 15.8699 13.26C15.9799 13.23 16.1099 13.21 16.2599 13.19C16.4099 13.17 16.5699 13.16 16.7299 13.16C17.6099 13.16 18.3199 13.44 18.8599 14C19.3999 14.56 19.6699 15.25 19.6699 16.06C19.6699 16.9 19.3899 17.61 18.8299 18.19C18.2699 18.75 17.5399 19.03 16.6399 19.03C15.6599 19.03 14.8299 18.65 14.1499 17.89C13.4699 17.13 13.1299 16.05 13.1299 14.64C13.1299 12.68 13.6799 10.94 14.7799 9.42001C15.8799 7.90001 17.3999 6.76001 19.3399 6.00001L19.0699 8.26001Z"
                        fill="currentColor"
                      />
                    </svg>
                    <blockquote className="pl-4 text-lg italic text-gray-700 dark:text-gray-300">
                      {member.quote}
                    </blockquote>
                  </div>
                </motion.div>
              )}

              {/* Bio with premium typography */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                  About {member.firstName}
                </p>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-red-600 dark:first-letter:text-red-500">
                    {member.fullBio}
                  </p>
                </div>
              </motion.div>

              {/* Social media links with premium styling */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 border-t border-gray-200/50 pt-6 dark:border-gray-700/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Connect with {member.firstName}
                  </h3>
                  <div className="flex gap-3">
                    {member.socials?.map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.url}
                        className={cn(
                          "group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300",
                          social.platform === "linkedin"
                            ? "border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] dark:border-[#0A66C2]/50"
                            : social.platform === "twitter"
                              ? "border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:border-[#1DA1F2] dark:border-[#1DA1F2]/50"
                              : social.platform === "instagram"
                                ? "border-[#E4405F]/30 text-[#E4405F] hover:bg-[#E4405F] hover:border-[#E4405F] dark:border-[#E4405F]/50"
                                : social.platform === "facebook"
                                  ? "border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2] hover:border-[#1877F2] dark:border-[#1877F2]/50"
                                  : social.platform === "website"
                                    ? "border-gray-400/30 text-gray-500 hover:bg-gray-500 hover:border-gray-500 dark:border-gray-400/50"
                                    : "border-gray-400/30 text-gray-500 hover:bg-gray-500 hover:border-gray-500 dark:border-gray-400/50"
                        )}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(social.platform)}
                        <span className="absolute -bottom-7 opacity-0 text-xs font-medium transition-all group-hover:opacity-100 group-hover:-bottom-9">
                          {social.platform.charAt(0).toUpperCase() +
                            social.platform.slice(1)}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
