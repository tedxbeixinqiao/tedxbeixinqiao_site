"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  X,
  ExternalLink,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { speakers, type Speaker } from "@/data/speakers";

// Create video data from speakers info - No need for separate mapping now
const videos = speakers;

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<Speaker>(videos[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const containerRef = useRef(null);
  const featuredRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 });

  // Effect to ensure activeVideo stays in sync with currentIndex
  useEffect(() => {
    console.log("Current index changed to:", currentIndex);
    setActiveVideo(videos[currentIndex]);
  }, [currentIndex]);

  // Filter videos based on category
  const filteredVideos =
    selectedCategory === "all"
      ? videos
      : videos.filter(
          (video) =>
            video.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const nextVideo = () => {
    console.log("Next button clicked");
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevVideo = () => {
    console.log("Prev button clicked");
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scaleUpVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } },
  };

  const slideUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="video-showcase"
      className="relative w-full overflow-hidden py-24"
    >
      {/* Decorative elements - keeping these as they're just subtle overlays */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-red-300 to-red-600/40 dark:from-red-900/30 dark:to-red-700/20 blur-[120px]"></div>
        <div className="absolute right-[10%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-gradient-to-tl from-red-400 to-pink-600/30 dark:from-red-900/20 dark:to-pink-800/10 blur-[100px]"></div>
      </div>

      {/* Subtle pattern overlay - adjusted for light/dark mode - REMOVE THIS */}
      {/* <div className="absolute inset-0 bg-[url('/patterns/dot-pattern.png')] opacity-5 dark:opacity-[0.03]"></div> */}

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 mx-auto px-4"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-3 inline-block rounded-full bg-red-100 dark:bg-red-900/30 px-6 py-1.5 text-sm font-medium text-red-600 dark:text-red-300"
            >
              Featured Talks
            </motion.div>

            <h2 className="relative mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="relative inline-block">
                Ideas worth
                <span className="relative ml-3 inline-block">
                  <span className="text-red-600 dark:text-red-500">
                    sharing
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-red-500 to-red-500/0 dark:from-red-600 dark:to-red-600/0"
                  ></motion.div>
                </span>
              </span>
            </h2>

            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Explore our collection of inspiring talks from TEDxBeixinqiao
              events that showcase innovative ideas and thought-provoking
              discussions.
            </p>
          </motion.div>

          {/* Featured Video Showcase */}
          <motion.div
            ref={featuredRef}
            variants={scaleUpVariants}
            initial="hidden"
            animate={isFeaturedInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-black shadow-2xl border border-gray-800">
              {/* <div className="absolute inset-0 bg-[url('/patterns/circuit-pattern.png')] opacity-10 mix-blend-overlay"></div> */}

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Video Area */}
                <div className="relative md:col-span-7 lg:col-span-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="group relative aspect-video w-full cursor-pointer overflow-hidden">
                        <motion.div
                          key={`featured-thumbnail-${activeVideo.videoId}`}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <Image
                            src={`https://img.youtube.com/vi/${activeVideo.videoId}/maxresdefault.jpg`}
                            alt={activeVideo.talkTitle}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            width={1200}
                            height={675}
                            priority
                          />
                        </motion.div>

                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-black/40">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className="flex flex-col items-center"
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-20 w-20 rounded-full border-2 border-white/80 bg-red-600/90 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] backdrop-blur-sm transition-transform duration-300 hover:bg-red-700"
                            >
                              <Play className="h-10 w-10" />
                              <motion.div
                                initial={{ scale: 1, opacity: 0.8 }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.8, 0, 0.8],
                                }}
                                transition={{ repeat: Infinity, duration: 2.5 }}
                                className="absolute -inset-3 rounded-full border-2 border-white/30"
                              />
                            </Button>
                            <span className="mt-4 font-medium text-white text-lg tracking-wide">
                              Play Video
                            </span>
                          </motion.div>
                        </div>

                        {/* Duration & Category Badge */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <div className="rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{activeVideo.duration}</span>
                            </div>
                          </div>
                          <div className="rounded-full bg-red-600/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                            {activeVideo.category}
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>

                    {/* Video Dialog/Modal - Removed close button */}
                    <DialogContent className="max-w-[90vw] sm:max-w-[1000px] p-0 border-none bg-transparent">
                      <div className="rounded-2xl bg-white/95 dark:bg-gray-900/95 shadow-2xl backdrop-blur-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        {/* Added DialogTitle for accessibility but removed the close button */}
                        <DialogTitle className="sr-only">
                          {activeVideo.talkTitle}
                        </DialogTitle>

                        <div className="aspect-video w-full">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                            title={activeVideo.talkTitle}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ aspectRatio: "16/9" }}
                            className="h-full w-full"
                          ></iframe>
                        </div>

                        <div className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {activeVideo.talkTitle}
                              </h3>
                              <div className="mt-1 flex items-center gap-1 text-red-600 dark:text-red-400">
                                <span className="text-sm font-medium">
                                  {activeVideo.name}
                                </span>
                                <span className="mx-1.5 h-1 w-1 rounded-full bg-red-600/70 dark:bg-red-400/70"></span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {activeVideo.title}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-full gap-1"
                              >
                                <Share2 className="h-3.5 w-3.5" />
                                <span>Share</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-full gap-1"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>YouTube</span>
                              </Button>
                            </div>
                          </div>

                          <div className="mb-4 flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-gray-700 dark:text-gray-200">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{activeVideo.date}</span>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-gray-700 dark:text-gray-200">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{activeVideo.duration}</span>
                            </div>
                            <div className="rounded-full bg-red-100 dark:bg-red-900/40 px-3 py-1 text-red-700 dark:text-red-300">
                              {activeVideo.category}
                            </div>
                          </div>

                          <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                            <p>{activeVideo.talkSummary}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Content Area */}
                <div className="md:col-span-5 lg:col-span-4 p-6 md:p-10 flex flex-col justify-center">
                  <motion.div
                    key={`featured-content-${activeVideo.videoId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-auto"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 mb-4">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="text-xs font-medium uppercase tracking-wider text-white">
                        Featured Talk
                      </span>
                    </div>

                    <h3 className="mb-4 text-2xl md:text-3xl font-bold text-white leading-tight">
                      {activeVideo.talkTitle}
                    </h3>

                    <div className="mb-4 flex items-center">
                      <div className="mr-4 h-10 w-10 overflow-hidden rounded-full border-2 border-red-500">
                        <Image
                          src={
                            activeVideo.imageSrc || "/speakers/placeholder.jpg"
                          }
                          alt={activeVideo.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {activeVideo.name}
                        </div>
                        <div className="text-sm text-gray-300">
                          {activeVideo.title}
                        </div>
                      </div>
                    </div>

                    <p className="mb-6 text-gray-300 line-clamp-3">
                      {activeVideo.talkSummary}
                    </p>
                  </motion.div>

                  {/* Navigation Controls - Fixed pointer events and z-index */}
                  <div className="flex justify-between items-center mt-6 border-t border-white/10 pt-6 relative z-20">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => prevVideo()}
                        disabled={currentIndex === 0}
                        className="h-10 w-10 rounded-full text-white hover:bg-white/20 disabled:opacity-40 relative z-30"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => nextVideo()}
                        disabled={currentIndex === videos.length - 1}
                        className="h-10 w-10 rounded-full text-white hover:bg-white/20 disabled:opacity-40 relative z-30"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="text-sm text-gray-300">
                      <span className="font-medium text-white">
                        {currentIndex + 1}
                      </span>
                      <span className="mx-1">/</span>
                      <span>{videos.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div variants={itemVariants} className="mb-10">
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setSelectedCategory}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-flow-col auto-cols-auto gap-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-full">
                  <TabsTrigger value="all" className="rounded-full px-6">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="technology" className="rounded-full px-4">
                    Technology
                  </TabsTrigger>
                  <TabsTrigger
                    value="storytelling"
                    className="rounded-full px-4"
                  >
                    Storytelling
                  </TabsTrigger>
                  <TabsTrigger value="design" className="rounded-full px-4">
                    Design
                  </TabsTrigger>
                  <TabsTrigger value="ideas" className="rounded-full px-4">
                    Ideas
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <VideoGrid videos={videos} />
              </TabsContent>

              <TabsContent value="technology" className="mt-0">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "technology"
                  )}
                />
              </TabsContent>

              <TabsContent value="storytelling" className="mt-0">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "storytelling"
                  )}
                />
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "design"
                  )}
                />
              </TabsContent>

              <TabsContent value="ideas" className="mt-0">
                <VideoGrid
                  videos={videos.filter(
                    (v) => v.category.toLowerCase() === "ideas"
                  )}
                />
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            variants={slideUpVariants}
            className="mt-16 flex justify-center"
          >
            <Button
              variant="default"
              size="lg"
              className="group relative overflow-hidden bg-red-600 dark:bg-red-700 px-8 py-6 text-lg font-medium text-white transition-all duration-300 hover:bg-red-700 dark:hover:bg-red-800"
            >
              <motion.span
                initial={{ width: "100%", height: "100%", x: "-101%" }}
                whileHover={{ x: "101%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 bg-red-500/40 dark:bg-red-600/40"
              />
              <span className="relative z-10 flex items-center gap-2">
                View all talks
                <motion.div
                  className="relative z-10"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Video Grid Component with proper typing
function VideoGrid({ videos }: { videos: Speaker[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} index={index} />
      ))}
    </div>
  );
}

// Video Card Component with proper typing
function VideoCard({ video, index }: { video: Speaker; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Card className="group cursor-pointer overflow-hidden border-none bg-white dark:bg-gray-800 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-red-200 dark:hover:shadow-red-900/20 h-full flex flex-col">
            {/* Video Thumbnail with Hover Effects */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.talkTitle}
                width={640}
                height={360}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay with Play Button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-2 border-white bg-red-600/90 text-white hover:bg-red-700 shadow-lg"
                    >
                      <Play className="h-7 w-7 ml-1" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 rounded-full bg-red-600/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                {video.category}
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                {video.duration}
              </div>

              {/* Talk Title Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <h3 className="line-clamp-2 text-lg font-semibold text-white">
                  {video.talkTitle}
                </h3>
              </div>
            </div>

            <CardContent className="p-5">
              {/* Speaker Profile and Name */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-red-500/20 dark:ring-red-500/40">
                    <Image
                      src={video.imageSrc || "/speakers/placeholder.jpg"}
                      alt={video.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {video.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {video.title}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className="inline-flex h-6 items-center rounded-full bg-red-50 dark:bg-red-900/20 px-2 text-xs font-medium text-red-600 dark:text-red-400">
                    {video.date.split(" ")[0]}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-w-[90vw] sm:max-w-[900px] p-0 border-none bg-transparent">
          <div className="rounded-2xl bg-white/95 dark:bg-gray-900/95 shadow-2xl backdrop-blur-xl overflow-hidden border border-gray-100 dark:border-gray-800">
            {/* Added DialogTitle for accessibility but removed DialogHeader and close button */}
            <DialogTitle className="sr-only">{video.talkTitle}</DialogTitle>

            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                title={video.talkTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ aspectRatio: "16/9" }}
                className="h-full w-full"
              ></iframe>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {video.talkTitle}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-red-600 dark:text-red-400">
                    <span className="text-sm font-medium">{video.name}</span>
                    <span className="mx-1.5 h-1 w-1 rounded-full bg-red-600/70 dark:bg-red-400/70"></span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {video.title}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full gap-1"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full gap-1"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>YouTube</span>
                  </Button>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-gray-700 dark:text-gray-200">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{video.date}</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-gray-700 dark:text-gray-200">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{video.duration}</span>
                </div>
                <div className="rounded-full bg-red-100 dark:bg-red-900/40 px-3 py-1 text-red-700 dark:text-red-300">
                  {video.category}
                </div>
              </div>

              <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                <p>{video.talkSummary}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
