"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const initialIconState = {
    opacity: 0,
    rotate: 0,
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md border-0 bg-transparent text-gray-800 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/70"
    >
      <div className="relative h-4 w-4">
        {/* Moon icon (visible in light mode) */}
        <motion.div
          initial={initialIconState}
          animate={
            mounted
              ? {
                  opacity: theme === "light" ? 1 : 0,
                  rotate: theme === "light" ? 0 : -90,
                }
              : initialIconState
          }
          transition={{ duration: 0.25 }}
          className="absolute inset-0 text-gray-700 dark:text-blue-300"
        >
          <Moon className="h-4 w-4" />
        </motion.div>

        {/* Sun icon (visible in dark mode) */}
        <motion.div
          initial={initialIconState}
          animate={
            mounted
              ? {
                  opacity: theme === "dark" ? 1 : 0,
                  rotate: theme === "dark" ? 0 : 90,
                }
              : initialIconState
          }
          transition={{ duration: 0.25 }}
          className="absolute inset-0 text-yellow-400 dark:text-yellow-300"
        >
          <Sun className="h-4 w-4" />
        </motion.div>
      </div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
