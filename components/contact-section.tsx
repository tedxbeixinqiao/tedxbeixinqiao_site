"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  interface SubmitEvent {
    preventDefault: () => void;
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="w-full bg-white py-20 dark:bg-black">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white md:text-4xl">
              Get in{" "}
              <span className="text-red-600 dark:text-red-500">Touch</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300">
              Have questions about our upcoming events or interested in
              partnership opportunities? Reach out to our team, and we'll be
              happy to assist you.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mx-auto grid gap-8 md:grid-cols-2"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
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
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-black dark:text-white">
                    WeChat
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    TedxBeixinqiao2025
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Scan the QR-Code below to follow our official WeChat Page
                  </p>
                  <div className="mt-4 h-40 w-40 overflow-hidden rounded bg-white p-2 shadow-sm dark:bg-gray-800">
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
              </div>

              <div className="flex items-start gap-4">
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
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-gray-900"
            >
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[120px] border-gray-300 dark:border-gray-700"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
