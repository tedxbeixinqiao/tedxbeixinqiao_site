"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [activeField, setActiveField] = useState<keyof typeof formData | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: false, amount: 0.3 });

  const handleFocus = (fieldName: keyof typeof formData) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value as keyof FormData }));
  };

  interface SubmitStatus {
    success: boolean;
    message: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      setSubmitStatus({
        success: true,
        message: "Your message has been sent! We'll get back to you soon.",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: false, message: "" });
      }, 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formLabelVariants = {
    initial: { y: 0 },
    focus: { y: -5, scale: 0.9 },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  const checkMarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={formRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="overflow-hidden rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900"
    >
      <motion.div
        variants={itemVariants}
        className="mb-6 flex flex-col space-y-2"
      >
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-red-600 dark:text-red-500">
          Get in Touch
        </span>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Send a Message
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Have questions or ideas? Reach out and let's start a conversation.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitStatus.success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center space-y-4 rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                className="h-8 w-8 text-green-600 dark:text-green-400"
              >
                <motion.path
                  d="M6 16L13 23L26 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={checkMarkVariants}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Message Sent!
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {submitStatus.message}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSubmitStatus({ success: false, message: "" })}
              className="mt-2 text-sm font-medium text-red-600 dark:text-red-400"
            >
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-1">
              <motion.label
                htmlFor="name"
                variants={formLabelVariants}
                initial="initial"
                animate={activeField === "name" ? "focus" : "initial"}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Name
              </motion.label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  required
                  className="border-gray-300 bg-gray-50 py-6 pl-4 pr-4 transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:focus:border-red-500"
                />
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: activeField === "name" ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <motion.label
                htmlFor="email"
                variants={formLabelVariants}
                initial="initial"
                animate={activeField === "email" ? "focus" : "initial"}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Email
              </motion.label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  required
                  className="border-gray-300 bg-gray-50 py-6 pl-4 pr-4 transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:focus:border-red-500"
                />
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: activeField === "email" ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <motion.label
                htmlFor="message"
                variants={formLabelVariants}
                initial="initial"
                animate={activeField === "message" ? "focus" : "initial"}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Message
              </motion.label>
              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Share your thoughts or questions with us..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  required
                  className="min-h-[150px] border-gray-300 bg-gray-50 py-4 pl-4 pr-4 transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:focus:border-red-500"
                />
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: activeField === "message" ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-red-500"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-8 py-3 text-white shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                <span className="flex items-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
