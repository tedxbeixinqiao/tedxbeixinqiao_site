"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SpeakerApplicationForm } from "@/components/speaker-application-form";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SpeakerApplicationModalProps {
  variant?: "default" | "mobile";
  className?: string;
}

export function SpeakerApplicationModal({
  variant = "default",
  className,
}: SpeakerApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("application");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {variant === "default" ? (
          <Button
            className={cn(
              "group relative overflow-hidden bg-red-600 transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
              className
            )}
          >
            <motion.span
              initial={{ width: "100%", height: "100%", x: "-101%" }}
              whileHover={{ x: "101%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-red-500/40"
            />
            <span className="z-10">Become a Speaker</span>
            <motion.div
              className="z-10"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className={cn(
              "group relative overflow-hidden bg-red-600 text-white transition-all duration-300 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
              className
            )}
          >
            <motion.span
              initial={{ width: "100%", height: "100%", x: "-101%" }}
              whileHover={{ x: "101%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-red-500/40"
            />
            <span className="z-10">Become a Speaker</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-red-600 dark:text-red-500">
            Speaker Portal
          </DialogTitle>
          <DialogDescription className="text-center">
            Apply as a speaker or nominate someone for our TEDx event.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="application"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger
              value="application"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Speaker Application
            </TabsTrigger>
            <TabsTrigger
              value="nomination"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Nominate Speaker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="application">
            <SpeakerApplicationForm formType="application" />
          </TabsContent>

          <TabsContent value="nomination">
            <SpeakerApplicationForm formType="nomination" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
