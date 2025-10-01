"use client";

import { motion } from "framer-motion";
import { ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type SpeakerApplicationMessageModalProps = {
  variant?: "default" | "mobile";
  className?: string;
};

export function SpeakerApplicationMessageModal({
  variant = "default",
  className,
}: SpeakerApplicationMessageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        {variant === "default" ? (
          <Button
            className={cn(
              "group relative overflow-hidden bg-red-600 transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
              className
            )}
          >
            <motion.span
              className="absolute inset-0 bg-red-500/40"
              initial={{ width: "100%", height: "100%", x: "-101%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              whileHover={{ x: "101%" }}
            />
            <span className="z-10">Become a Speaker</span>
            <motion.div
              className="z-10"
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              whileHover={{ x: 3 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </Button>
        ) : (
          <Button
            className={cn(
              "group relative overflow-hidden bg-red-600 text-white transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
              className
            )}
            size="sm"
            variant="default"
          >
            <motion.span
              className="absolute inset-0 bg-red-500/40"
              initial={{ width: "100%", height: "100%", x: "-101%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              whileHover={{ x: "101%" }}
            />
            <span className="z-10">Become a Speaker</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Heart className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <DialogTitle className="text-center font-bold text-2xl text-red-600 dark:text-red-500">
            Thank You!
          </DialogTitle>
          <DialogDescription className="mt-4 text-center text-lg leading-relaxed">
            The response to the 2025 speaker applications has been extraordinary
            — thank you for sharing so many powerful ideas. Our 2025 speakers
            are now in the final stages. But 2026 is just around the corner!
            Join our Community Events to learn the TED format, get tips from
            coaches, and experience the stage live at our December 6th show. And
            stand by — the next round of speaker applications will open soon.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-center">
          <Button
            className="bg-red-600 px-8 py-2 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
