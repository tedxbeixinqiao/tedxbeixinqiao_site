"use client";

import { X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type EventPopupProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EventPopup({ open, onOpenChange }: EventPopupProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <DialogTitle className="sr-only">
          Modernista Event Advertisement
        </DialogTitle>
        <div className="relative">
          {/* Close button */}
          <DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {/* Event poster */}
          <a
            className="relative block aspect-[3/4] w-full cursor-pointer transition-opacity hover:opacity-95"
            href="https://yoopay.cn/event/55464416"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Modernista Event Poster - Click to register"
              className="object-contain"
              fill
              priority
              src="/modernista_event.png"
            />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
