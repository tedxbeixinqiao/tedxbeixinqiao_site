import type { Metadata } from "next"
import TeamPageClient from "./TeamPageClient"

export const metadata: Metadata = {
  title: "Team - TEDxBeixinqiao",
  description: "Meet the dedicated team behind TEDxBeixinqiao.",
}

export default function TeamPage() {
  return <TeamPageClient />
}
