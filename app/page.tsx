import Hero from "@/components/home/hero"
import VideoShowcase from "@/components/home/video-showcase"
import AboutSection from "@/components/home/about-section"
import EventHighlights from "@/components/home/event-highlights"
import ContactSection from "@/components/contact-section"
import type { Metadata } from "next"
import TeanSection from "@/components/team/team-section"
import SpeakersSection from "@/components/speakers/speakers-section"

export const metadata: Metadata = {
  title: "TEDxBeixinqiao - Ideas That Move",
  description:
    "TEDxBeixinqiao celebrates powerful ideas that move us - whether it's a leap of innovation, a shift in mindset, or a story that stirs something deep within us.",
}

export default function Home() {
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
  )
}
