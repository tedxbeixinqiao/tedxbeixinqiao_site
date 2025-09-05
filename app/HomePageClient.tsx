'use client';

import { useEffect, useState } from 'react';
import ContactSection from '@/components/contact-section';
import AboutSection from '@/components/home/about-section';
import EventHighlights from '@/components/home/event-highlights';
import EventPopup from '@/components/home/event-popup';
import Hero from '@/components/home/hero';
import VideoShowcase from '@/components/home/video-showcase';
import SpeakersSection from '@/components/speakers/speakers-section';
import TeanSection from '@/components/team/team-section';

const POPUP_DELAY = 1000; // 1 second delay to let the page load

export default function HomePageClient() {
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    // Show the popup after a short delay when the component mounts
    const timer = setTimeout(() => {
      setShowEventPopup(true);
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <Hero />
        <AboutSection />
        <VideoShowcase />
        <EventHighlights />
        <TeanSection />
        <SpeakersSection />
        <ContactSection />
      </div>

      <EventPopup onOpenChange={setShowEventPopup} open={showEventPopup} />
    </>
  );
}
