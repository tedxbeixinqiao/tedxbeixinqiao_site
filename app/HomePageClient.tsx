"use client";

import ContactSection from "@/components/contact-section";
import AboutSection from "@/components/home/about-section";
import EventHighlights from "@/components/home/event-highlights";
import Hero from "@/components/home/hero";
import VideoShowcase from "@/components/home/video-showcase";
import SpeakersSection from "@/components/speakers/speakers-section";
import TeanSection from "@/components/team/team-section";

export default function HomePageClient() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <AboutSection />
      <VideoShowcase />
      <EventHighlights />
      <TeanSection />
      <SpeakersSection />
      <ContactSection />
    </div>
  );
}
