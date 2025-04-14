"use client"

// Types for speaker entries
export type BaseEntry = {
  id: string
  fullName: string
  submissionDate: string
  topic: string
  status: string
  priorTedTalk: string
  flagged: boolean
  notes: string
  rating: number
}

export type ApplicationEntry = BaseEntry & {
  type: "application"
  mobilePhone: string
  wechatId: string
  gender: string
  job: string
}

export type NominationEntry = BaseEntry & {
  type: "nomination"
  contact: string
  nominatedBy: string
}

export type SpeakerEntry = ApplicationEntry | NominationEntry

// Define the meta type for tanstack table with our custom functions
export type TableMeta = {
  updateStatus?: (id: string, status: string) => void;
  updateRating?: (id: string, rating: number) => void;
}

// Mock data for speaker applications
export const mockApplications: ApplicationEntry[] = [
  {
    id: "APP001",
    fullName: "Sarah Johnson",
    submissionDate: "2025-04-10",
    topic: "The Future of Sustainable Energy",
    mobilePhone: "+86 123 4567 8901",
    wechatId: "sarahjohnson",
    gender: "Female",
    job: "Energy Scientist",
    status: "under_review",
    priorTedTalk: "No",
    flagged: false,
    notes: "Strong candidate with relevant expertise",
    rating: 4,
    type: "application"
  },
  {
    id: "APP002",
    fullName: "Michael Zhang",
    submissionDate: "2025-04-08",
    topic: "AI Ethics in Healthcare",
    mobilePhone: "+86 132 9876 5432",
    wechatId: "mzhang",
    gender: "Male",
    job: "AI Researcher",
    status: "shortlisted",
    priorTedTalk: "Yes - TEDxShanghai 2023",
    flagged: true,
    notes: "Previous TED speaker, excellent presentation skills",
    rating: 5,
    type: "application"
  },
  {
    id: "APP003",
    fullName: "Olivia Chen",
    submissionDate: "2025-04-11",
    topic: "Rethinking Education for Gen Z",
    mobilePhone: "+86 139 5555 7777",
    wechatId: "olivia_chen",
    gender: "Female",
    job: "Education Consultant",
    status: "invited",
    priorTedTalk: "No",
    flagged: false,
    notes: "Fresh perspective on education reform",
    rating: 4,
    type: "application"
  },
  {
    id: "APP004",
    fullName: "David Lee",
    submissionDate: "2025-04-09",
    topic: "Blockchain Revolution in Supply Chain",
    mobilePhone: "+86 138 2222 3333",
    wechatId: "david_blockchain",
    gender: "Male",
    job: "Supply Chain Technologist",
    status: "rejected",
    priorTedTalk: "No",
    flagged: false,
    notes: "Topic too technical, needs refinement",
    rating: 2,
    type: "application"
  },
  {
    id: "APP005",
    fullName: "Emma Wilson",
    submissionDate: "2025-04-12",
    topic: "Mental Health in the Digital Age",
    mobilePhone: "+86 137 8888 9999",
    wechatId: "emma_w",
    gender: "Female",
    job: "Clinical Psychologist",
    status: "under_review",
    priorTedTalk: "No",
    flagged: true,
    notes: "Compelling personal story, needs coaching on delivery",
    rating: 3,
    type: "application"
  }
]

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
    type: "nomination"
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
    type: "nomination"
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
    type: "nomination"
  }
]

// Combined data for all entries
export const allEntries: SpeakerEntry[] = [...mockApplications, ...mockNominations]

// Status options for dropdown
export const statusOptions = [
  { label: "Under Review", value: "under_review" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Invited", value: "invited" },
  { label: "Rejected", value: "rejected" },
  { label: "Contacted", value: "contacted" },
  { label: "Flagged", value: "flagged" },
]