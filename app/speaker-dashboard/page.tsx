import { SpeakerDashboardClient } from "./SpeakerDashboardClient"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

// This server component checks for authentication before rendering
export default async function SpeakerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;

  return (
    <SpeakerDashboardClient user={user} />
  )
}