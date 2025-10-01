"use server";

import { v4 as uuidv4 } from "uuid";
import { db } from "@/db/drizzle";
import { speakerApplication, speakerNomination } from "@/db/schema";
import { eq } from "drizzle-orm";

// Speaker Application Types
interface SpeakerApplicationData {
  fullName: string;
  email: string;
  rehearsalAvailability: string;
  mobilePhone: string;
  wechatId: string;
  priorTedTalk: string;
  job: string;
  remarks?: string;
  ideaPresentation: string;
  commonBelief: string;
  coreIdea: string;
  personalInsight: string;
  potentialImpact: string;
  websiteUrl?: string;
}

interface SpeakerNominationData {
  fullName: string;
  contact: string;
  priorTedTalk: string;
  remarks: string;
  websiteUrl?: string;
}

export async function createSpeakerApplication(data: SpeakerApplicationData) {
  try {
    const now = new Date();
    const id = `APP${now.getTime().toString().slice(-6)}`;

    const result = await db.insert(speakerApplication).values({
      id,
      fullName: data.fullName,
      email: data.email,
      submissionDate: now,
      topic: data.ideaPresentation,
      mobilePhone: data.mobilePhone,
      wechatId: data.wechatId,
      gender: null, // Set null since we're not collecting this anymore
      job: data.job,
      rehearsalAvailability: data.rehearsalAvailability,
      availableInBeijing: null, // Not used anymore
      priorTedTalk: data.priorTedTalk,
      commonBelief: data.commonBelief,
      coreIdea: data.coreIdea,
      personalInsight: data.personalInsight,
      potentialImpact: data.potentialImpact,
      remarks: data.remarks || null,
      websiteUrl: data.websiteUrl || null,
      status: "under_review",
      flagged: false,
      notes: "",
      rating: 0,
      createdAt: now,
      updatedAt: now,
    });

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Failed to create speaker application:", error);
    return { success: false, error };
  }
}

export async function createSpeakerNomination(
  data: SpeakerNominationData,
  submitterName: string = "Website User"
) {
  try {
    const now = new Date();
    const id = `NOM${now.getTime().toString().slice(-6)}`;

    // Generate a topic from the remarks - taking the first sentence or first few words
    const topic = data.remarks.split(".")[0].trim();

    const result = await db.insert(speakerNomination).values({
      id,
      fullName: data.fullName,
      submissionDate: now,
      contact: data.contact,
      nominatedBy: submitterName,
      priorTedTalk: data.priorTedTalk,
      remarks: data.remarks,
      websiteUrl: data.websiteUrl || null,
      topic: topic.length > 10 ? topic : data.remarks.substring(0, 30) + "...",
      status: "under_review",
      flagged: false,
      notes: "",
      rating: 0,
      createdAt: now,
      updatedAt: now,
    });

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Failed to create speaker nomination:", error);
    return { success: false, error };
  }
}

export async function getAllSpeakerApplications() {
  try {
    const applications = await db.select().from(speakerApplication);
    return { success: true, data: applications };
  } catch (error) {
    console.error("Failed to fetch speaker applications:", error);
    return { success: false, error };
  }
}

export async function getAllSpeakerNominations() {
  try {
    const nominations = await db.select().from(speakerNomination);
    return { success: true, data: nominations };
  } catch (error) {
    console.error("Failed to fetch speaker nominations:", error);
    return { success: false, error };
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await db
      .update(speakerApplication)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(speakerApplication.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update application status:", error);
    return { success: false, error };
  }
}

export async function updateNominationStatus(id: string, status: string) {
  try {
    await db
      .update(speakerNomination)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(speakerNomination.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update nomination status:", error);
    return { success: false, error };
  }
}

export async function updateApplicationRating(id: string, rating: number) {
  try {
    await db
      .update(speakerApplication)
      .set({
        rating,
        updatedAt: new Date(),
      })
      .where(eq(speakerApplication.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update application rating:", error);
    return { success: false, error };
  }
}

export async function updateNominationRating(id: string, rating: number) {
  try {
    await db
      .update(speakerNomination)
      .set({
        rating,
        updatedAt: new Date(),
      })
      .where(eq(speakerNomination.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update nomination rating:", error);
    return { success: false, error };
  }
}

export async function updateApplicationNotes(id: string, notes: string) {
  try {
    await db
      .update(speakerApplication)
      .set({
        notes,
        updatedAt: new Date(),
      })
      .where(eq(speakerApplication.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update application notes:", error);
    return { success: false, error };
  }
}

export async function updateNominationNotes(id: string, notes: string) {
  try {
    await db
      .update(speakerNomination)
      .set({
        notes,
        updatedAt: new Date(),
      })
      .where(eq(speakerNomination.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update nomination notes:", error);
    return { success: false, error };
  }
}

export async function toggleApplicationFlag(id: string) {
  try {
    // First get the current flag status
    const [application] = await db
      .select({
        flagged: speakerApplication.flagged,
      })
      .from(speakerApplication)
      .where(eq(speakerApplication.id, id));

    if (!application) {
      throw new Error("Application not found");
    }

    // Toggle the flag
    await db
      .update(speakerApplication)
      .set({
        flagged: !application.flagged,
        updatedAt: new Date(),
      })
      .where(eq(speakerApplication.id, id));

    return { success: true, flagged: !application.flagged };
  } catch (error) {
    console.error("Failed to toggle application flag:", error);
    return { success: false, error };
  }
}

export async function toggleNominationFlag(id: string) {
  try {
    // First get the current flag status
    const [nomination] = await db
      .select({
        flagged: speakerNomination.flagged,
      })
      .from(speakerNomination)
      .where(eq(speakerNomination.id, id));

    if (!nomination) {
      throw new Error("Nomination not found");
    }

    // Toggle the flag
    await db
      .update(speakerNomination)
      .set({
        flagged: !nomination.flagged,
        updatedAt: new Date(),
      })
      .where(eq(speakerNomination.id, id));

    return { success: true, flagged: !nomination.flagged };
  } catch (error) {
    console.error("Failed to toggle nomination flag:", error);
    return { success: false, error };
  }
}

// Function to create a new application from the dashboard
export async function createDashboardApplication(data: {
  fullName: string;
  topic: string;
  mobilePhone: string;
  wechatId: string;
  gender: string;
  job: string;
  priorTedTalk: string;
  status?: string;
  flagged?: boolean;
  notes?: string;
  rating?: number;
}) {
  try {
    const now = new Date();
    const id = `APP${now.getTime().toString().slice(-6)}`;

    const result = await db.insert(speakerApplication).values({
      id,
      fullName: data.fullName,
      submissionDate: now,
      topic: data.topic,
      mobilePhone: data.mobilePhone,
      wechatId: data.wechatId,
      gender: data.gender,
      job: data.job,
      availableInBeijing: "Yes",
      priorTedTalk: data.priorTedTalk,
      remarks: null,
      websiteUrl: null,
      status: data.status || "under_review",
      flagged: data.flagged || false,
      notes: data.notes || "",
      rating: data.rating || 0,
      createdAt: now,
      updatedAt: now,
    });

    return {
      success: true,
      data: {
        id,
        fullName: data.fullName,
        submissionDate: now,
        topic: data.topic,
        mobilePhone: data.mobilePhone,
        wechatId: data.wechatId,
        gender: data.gender,
        job: data.job,
        priorTedTalk: data.priorTedTalk,
        status: data.status || "under_review",
        flagged: data.flagged || false,
        notes: data.notes || "",
        rating: data.rating || 0,
      },
    };
  } catch (error) {
    console.error("Failed to create application from dashboard:", error);
    return { success: false, error };
  }
}

// Function to create a new nomination from the dashboard
export async function createDashboardNomination(data: {
  fullName: string;
  topic: string;
  contact: string;
  nominatedBy: string;
  priorTedTalk: string;
  status?: string;
  flagged?: boolean;
  notes?: string;
  rating?: number;
}) {
  try {
    const now = new Date();
    const id = `NOM${now.getTime().toString().slice(-6)}`;

    const result = await db.insert(speakerNomination).values({
      id,
      fullName: data.fullName,
      submissionDate: now,
      topic: data.topic,
      contact: data.contact,
      nominatedBy: data.nominatedBy,
      priorTedTalk: data.priorTedTalk,
      remarks: "",
      websiteUrl: null,
      status: data.status || "under_review",
      flagged: data.flagged || false,
      notes: data.notes || "",
      rating: data.rating || 0,
      createdAt: now,
      updatedAt: now,
    });

    return {
      success: true,
      data: {
        id,
        fullName: data.fullName,
        submissionDate: now,
        topic: data.topic,
        contact: data.contact,
        nominatedBy: data.nominatedBy,
        priorTedTalk: data.priorTedTalk,
        status: data.status || "under_review",
        flagged: data.flagged || false,
        notes: data.notes || "",
        rating: data.rating || 0,
      },
    };
  } catch (error) {
    console.error("Failed to create nomination from dashboard:", error);
    return { success: false, error };
  }
}

// Update an application's details
export async function updateApplicationDetails(
  id: string,
  data: {
    fullName?: string;
    topic?: string;
    mobilePhone?: string;
    wechatId?: string;
    gender?: string;
    job?: string;
    priorTedTalk?: string;
  }
) {
  try {
    await db
      .update(speakerApplication)
      .set({
        ...(data.fullName && { fullName: data.fullName }),
        ...(data.topic && { topic: data.topic }),
        ...(data.mobilePhone && { mobilePhone: data.mobilePhone }),
        ...(data.wechatId && { wechatId: data.wechatId }),
        ...(data.gender && { gender: data.gender }),
        ...(data.job && { job: data.job }),
        ...(data.priorTedTalk && { priorTedTalk: data.priorTedTalk }),
        updatedAt: new Date(),
      })
      .where(eq(speakerApplication.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update application details:", error);
    return { success: false, error };
  }
}

// Update a nomination's details
export async function updateNominationDetails(
  id: string,
  data: {
    fullName?: string;
    topic?: string;
    contact?: string;
    nominatedBy?: string;
    priorTedTalk?: string;
  }
) {
  try {
    await db
      .update(speakerNomination)
      .set({
        ...(data.fullName && { fullName: data.fullName }),
        ...(data.topic && { topic: data.topic }),
        ...(data.contact && { contact: data.contact }),
        ...(data.nominatedBy && { nominatedBy: data.nominatedBy }),
        ...(data.priorTedTalk && { priorTedTalk: data.priorTedTalk }),
        updatedAt: new Date(),
      })
      .where(eq(speakerNomination.id, id));

    return { success: true };
  } catch (error) {
    console.error("Failed to update nomination details:", error);
    return { success: false, error };
  }
}
