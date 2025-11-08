"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export function IdeasInMotionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="max-w-md overflow-visible p-0">
        <DialogTitle className="sr-only">
          Ideas in Motion Event Advertisement
        </DialogTitle>
        <div className="relative">
          {/* Close button */}
          <DialogClose className="-top-4 -right-4 absolute z-20 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-colors hover:bg-gray-50">
            <X className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Event poster */}
          <a
            className="relative block aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-95"
            href="https://yoopay.cn/event/23161665"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Ideas in Motion Event Poster - Click to register"
              className="object-contain"
              fill
              priority
              src="/ideas_in_motion_event_oct27.png"
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
