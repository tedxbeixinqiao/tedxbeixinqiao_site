import SpeakersPageClient from "./SpeakersPageClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Speakers - TEDxBeixinqiao",
  description: "Meet the innovative minds who shared their ideas at TEDxBeixinqiao.",
}

export default function SpeakersPage() {
  return <SpeakersPageClient />
}
