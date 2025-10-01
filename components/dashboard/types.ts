"use client";

// Types for speaker entries
export type BaseEntry = {
  id: string;
  fullName: string;
  submissionDate: string;
  topic: string;
  status: string;
  priorTedTalk: string;
  flagged: boolean;
  notes: string;
  rating: number;
};

export type ApplicationEntry = BaseEntry & {
  type: "application";
  email: string;
  mobilePhone: string;
  wechatId: string;
  gender?: string | null;
  job: string;
  rehearsalAvailability: string;
  commonBelief: string;
  coreIdea: string;
  personalInsight: string;
  potentialImpact: string;
};

export type NominationEntry = BaseEntry & {
  type: "nomination";
  contact: string;
  nominatedBy: string;
};

export type SpeakerEntry = ApplicationEntry | NominationEntry;

// Mock data for speaker applications - commented out since using real database data
// export const mockApplications: ApplicationEntry[] = []

// Mock data for speaker nominations
export const mockNominations: NominationEntry[] = [
  {
    id: "NOM001",
    fullName: "Dr. Wei Liu",
    submissionDate: "2025-04-07",
    topic: "Quantum Computing Breakthroughs",
    contact: "wei.liu@quantum.tech",
    nominatedBy: "James Wilson",
    status: "under_review",
    priorTedTalk: "No",
    flagged: true,
    notes: "Leading researcher in quantum computing",
    rating: 5,
    type: "nomination",
  },
  {
    id: "NOM002",
    fullName: "Sofia Rodriguez",
    submissionDate: "2025-04-09",
    topic: "Cultural Integration in Global Business",
    contact: "+86 135 6666 7777",
    nominatedBy: "Michael Chen",
    status: "contacted",
    priorTedTalk: "Yes - TEDxMadrid 2022",
    flagged: false,
    notes: "International perspective, multilingual speaker",
    rating: 4,
    type: "nomination",
  },
  {
    id: "NOM003",
    fullName: "Ahmed Hassan",
    submissionDate: "2025-04-10",
    topic: "Urban Planning for Climate Resilience",
    contact: "a.hassan@urbansolutions.org",
    nominatedBy: "Sarah Johnson",
    status: "shortlisted",
    priorTedTalk: "No",
    flagged: false,
    notes: "Innovative approaches to city design",
    rating: 4,
    type: "nomination",
  },
];

// Combined data for all entries - commented out since using real database data
// export const allEntries: SpeakerEntry[] = []

// Status options for dropdown
export const statusOptions = [
  { label: "Under Review", value: "under_review" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Invited", value: "invited" },
  { label: "Rejected", value: "rejected" },
  { label: "Contacted", value: "contacted" },
  { label: "Flagged", value: "flagged" },
];
