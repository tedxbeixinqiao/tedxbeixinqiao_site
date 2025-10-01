import { SpeakerDashboardClient } from "./SpeakerDashboardClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAllSpeakerApplications,
  getAllSpeakerNominations,
} from "@/lib/speakers-db-service";
import {
  ApplicationEntry,
  NominationEntry,
  SpeakerEntry,
} from "@/components/dashboard/types";

// This server component checks for authentication before rendering
export default async function SpeakerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;

  // Fetch speaker applications and nominations from the database
  const applicationsResult = await getAllSpeakerApplications();
  const nominationsResult = await getAllSpeakerNominations();

  // Transform database results to match the expected format for the dashboard
  const applications: ApplicationEntry[] =
    applicationsResult.success && applicationsResult.data
      ? applicationsResult.data.map((app) => ({
          id: app.id,
          fullName: app.fullName,
          email: app.email || "",
          submissionDate: app.submissionDate.toISOString(),
          topic: app.topic,
          mobilePhone: app.mobilePhone,
          wechatId: app.wechatId,
          gender: app.gender,
          job: app.job,
          rehearsalAvailability: app.rehearsalAvailability || "",
          commonBelief: app.commonBelief || "",
          coreIdea: app.coreIdea || "",
          personalInsight: app.personalInsight || "",
          potentialImpact: app.potentialImpact || "",
          status: app.status,
          priorTedTalk: app.priorTedTalk,
          flagged: app.flagged,
          notes: app.notes || "",
          rating: app.rating || 0, // Ensure rating is never null
          type: "application",
        }))
      : [];

  const nominations: NominationEntry[] =
    nominationsResult.success && nominationsResult.data
      ? nominationsResult.data.map((nom) => ({
          id: nom.id,
          fullName: nom.fullName,
          submissionDate: nom.submissionDate.toISOString(),
          topic: nom.topic,
          contact: nom.contact,
          nominatedBy: nom.nominatedBy,
          status: nom.status,
          priorTedTalk: nom.priorTedTalk,
          flagged: nom.flagged,
          notes: nom.notes || "",
          rating: nom.rating || 0, // Ensure rating is never null
          type: "nomination",
        }))
      : [];

  // Combine applications and nominations
  const allEntries: SpeakerEntry[] = [...applications, ...nominations];

  return <SpeakerDashboardClient user={user} initialEntries={allEntries} />;
}
