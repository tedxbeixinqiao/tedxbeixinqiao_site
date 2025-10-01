// Define types for speaker data
export interface Social {
  platform: string;
  url: string;
}

export interface Speaker {
  name: string;
  title: string;
  talkTitle: string;
  description: string;
  talkSummary: string;
  socials: Social[];
  videoId: string;
  imageSrc: string;
  duration: string;
  date: string;
  category: string;
}

// Centralized speakers data
export const speakers: Speaker[] = [
  {
    name: "Cheryl Yang",
    title: "Blockchain Expert",
    talkTitle: "The Future of Data Privacy",
    description:
      "The Transformative Impact of Blockchain Technology in the Next Decade",
    talkSummary:
      "In this thought-provoking talk, Cheryl Yang explores how blockchain technology is fundamentally changing our approach to data privacy. She discusses the implications for individuals, businesses, and governments as we move toward a more decentralized digital ecosystem.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "jImojqkaTHo",
    imageSrc: "/speakers/cheryl.jpg",
    duration: "7:53",
    date: "April 20, 2024",
    category: "Technology",
  },
  {
    name: "Joseph C. Stewart",
    title: "International School Art Teacher",
    talkTitle: "How to Become Reptile-Skinned",
    description:
      "Challenges and Opportunities for Parents of Children with Developmental Disorders",
    talkSummary:
      "Joseph Stewart shares personal insights and professional expertise on developing resilience in the face of challenges. Drawing from his experiences as an educator, he offers practical strategies for fostering emotional strength in ourselves and our children.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "DSu2O5twi5A",
    imageSrc: "/speakers/joseph.jpg",
    duration: "15:42",
    date: "April 20, 2024",
    category: "Education",
  },
  {
    name: "Merna Al Nasser",
    title: "CGTN Editor/Moderator",
    talkTitle: "We are all Storytellers",
    description: "Transforming Media Narratives For Global Understandings",
    talkSummary:
      "Merna Al Nasser delves into the power of storytelling as a universal human trait and its critical role in shaping our perception of reality. Drawing from her extensive experience in international media, she demonstrates how thoughtful narrative construction can bridge cultural divides and foster global understanding.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "acSQUrNqNAo",
    imageSrc: "/speakers/merna.jpg",
    duration: "14:19",
    date: "April 20, 2024",
    category: "Storytelling",
  },
  {
    name: "Niamh Cunningham",
    title: "Visual Artist",
    talkTitle: "Rekindling our Bond with Nature",
    description: "Nourishing Growth and Understanding through Tree Stories",
    talkSummary:
      "In this visually stunning presentation, Niamh Cunningham explores how our disconnection from nature impacts our wellbeing and creativity. Through her artwork and research on trees, she offers a compelling vision for rekindling our relationship with the natural world and finding inspiration in its patterns and processes.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "pHwQZ35obSM",
    imageSrc: "/speakers/niamh.jpg",
    duration: "10:11",
    date: "April 20, 2024",
    category: "Nature",
  },
  {
    name: "Saverio Quaia",
    title: "Interior Designer",
    talkTitle: "What the Office of Tomorrow Looks Like",
    description:
      "Workplace Transformation and Future Trends in the Post-Epidemic Era",
    talkSummary:
      "Interior design visionary Saverio Quaia presents his research-backed predictions for workplace evolution in the post-pandemic world. His talk combines insights from psychology, architecture, and organizational behavior to envision spaces that enhance productivity, wellbeing, and connection in our changing work culture.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "CPlLRSXy7Hw",
    imageSrc: "/speakers/saverio.jpg",
    duration: "12:13",
    date: "April 20, 2024",
    category: "Design",
  },
  {
    name: "Stephanie Sam",
    title: "International Communications Specialist",
    talkTitle: "Rethinking the Way We Communicate",
    description:
      "Rethinking the Way We Communicate in the Age of Globalization",
    talkSummary:
      "Stephanie Sam challenges conventional communication paradigms in this engaging talk about cross-cultural dialogue. Drawing from her experiences across continents, she proposes innovative frameworks for meaningful exchange in our interconnected world, emphasizing empathy and context as essential elements of effective communication.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "RjoRzRzsfmA",
    imageSrc: "/speakers/stephanie.jpg",
    duration: "15:42",
    date: "April 20, 2024",
    category: "Ideas",
  },
];

// Helper functions
export const getAllSpeakers = () => {
  return speakers;
};

export const getSpeakerByName = (name: string) => {
  return speakers.find((speaker) => speaker.name === name);
};
