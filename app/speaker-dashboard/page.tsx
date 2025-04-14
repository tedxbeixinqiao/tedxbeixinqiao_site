import { SpeakerDashboardClient } from "./SpeakerDashboardClient"

// This server component defers rendering to the client component
export default function SpeakerDashboardPage() {
  return (
    <SpeakerDashboardClient />
  )
}