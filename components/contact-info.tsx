"use client";

import Image from "next/image";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactInfo() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      <motion.div variants={item} className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
          <Mail className="h-6 w-6" />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">
            Email
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Info@tedxbeixinqiao.com
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
          <MessageSquare className="h-6 w-6" />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">
            WeChat
          </h3>
          <p className="text-gray-700 dark:text-gray-300">TedxBeixinqiao2025</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Scan the QR-Code below to follow our official WeChat Page
          </p>
          <div className="mt-4 h-40 w-40 overflow-hidden rounded bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-105 dark:bg-gray-800">
            <div className="relative h-full w-full">
              <Image
                src="/qrcode.jpg"
                alt="TEDxBeixinqiao WeChat QR Code"
                width={144}
                height={144}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
          <MapPin className="h-6 w-6" />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">
            Address
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Beixinqiao subdistrict, Dongcheng, Beijing
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
