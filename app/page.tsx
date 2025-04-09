import Hero from "@/components/hero"
import VideoShowcase from "@/components/video-showcase"
import AboutSection from "@/components/about-section"
import EventHighlights from "@/components/event-highlights"
import ContactSection from "@/components/contact-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TEDxBeixinqiao - Innovation Illustrated",
  description:
    "TEDxBeixinqiao is an independently organized TED event that took place in Beijing, bringing people together to share ideas worth spreading.",
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <AboutSection />
      <VideoShowcase />
      <EventHighlights />
      <ContactSection />
    </div>
  )
}
