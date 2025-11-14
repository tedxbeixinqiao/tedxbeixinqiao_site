// Define types for speaker data
export type Social = {
  platform: string;
  url: string;
};

export type Speaker = {
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
};

// Import previous speakers
export { previousSpeakers } from "./previous_speakers";

export const currentSpeakers: Speaker[] = [
  {
    name: "Abraham KC Ho",
    title: "Entrepreneur & Tech Innovator",
    talkTitle: "Building Bridges: Technology as a Force for Connection",
    description: "How technology can bring people together across cultures and borders",
    talkSummary:
      "Abraham KC Ho explores the transformative power of technology in creating meaningful connections across geographical and cultural boundaries. Drawing from his entrepreneurial experience, he shares insights on leveraging innovation to build bridges between diverse communities.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Abraham.png",
    duration: "",
    date: "2025",
    category: "Technology",
  },
  {
    name: "Tom Van Dillen",
    title: "Leadership Coach & Author",
    talkTitle: "The Courage to Lead: Embracing Vulnerability in Leadership",
    description: "Redefining strength in leadership through authenticity and vulnerability",
    talkSummary:
      "Tom Van Dillen challenges traditional notions of leadership by exploring how vulnerability and authenticity create stronger, more resilient teams. Through personal stories and practical insights, Tom Van Dillen demonstrates that true leadership requires the courage to be human.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Dillen.png",
    duration: "",
    date: "2025",
    category: "Leadership",
  },
  {
    name: "Jialan",
    title: "Environmental Scientist & Sustainability Advocate",
    talkTitle: "Small Actions, Big Impact: Reimagining Our Environmental Future",
    description: "Empowering individuals to create meaningful environmental change",
    talkSummary:
      "Jialan Wang reveals how individual actions, when multiplied across communities, can create transformative environmental impact. Through compelling research and real-world examples, Jialan demonstrates that sustainability isn't just about grand gestures—it's about the daily choices we all make.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Jialan.png",
    duration: "",
    date: "2025",
    category: "Environment",
  },
  {
    name: "Gian Luigi",
    title: "Chef & Culinary Artist",
    talkTitle: "The Art of Fusion: Where Culture Meets Cuisine",
    description: "Celebrating cultural identity through the universal language of food",
    talkSummary:
      "Gian Luigi takes us on a culinary journey that transcends borders and traditions. As a master of fusion cuisine, Gian Luigi shares how food serves as a powerful medium for cultural exchange, storytelling, and building understanding between different communities.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Luigi.jpg",
    duration: "",
    date: "2025",
    category: "Culture",
  },
  {
    name: "Madelyn Li",
    title: "Social Entrepreneur & Community Builder",
    talkTitle: "From I to We: Rebuilding Community in the Digital Age",
    description: "Creating meaningful connections in an increasingly disconnected world",
    talkSummary:
      "Madelyn Li addresses the paradox of modern connectivity—we're more digitally connected yet feel more isolated than ever. Through innovative community-building initiatives, Madelyn shows how we can harness technology to foster genuine human connection and rebuild the sense of belonging that our societies desperately need.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Madelyn.png",
    duration: "",
    date: "2025",
    category: "Community",
  },
  {
    name: "Nathan Midler",
    title: "AI Researcher & Ethics Advocate",
    talkTitle: "Human + Machine: Designing AI with Heart",
    description: "Ensuring artificial intelligence serves humanity's best interests",
    talkSummary:
      "Nathan Midler takes us into the fascinating world of artificial intelligence, exploring not just what AI can do, but what it should do. As an ethics advocate, Nathan argues for a human-centered approach to AI development that prioritizes empathy, fairness, and the preservation of human dignity in an automated world.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/NATHAN.png",
    duration: "",
    date: "2025",
    category: "Technology",
  },
  {
    name: "Dr.Sherwin Molayem",
    title: "Mental Health Advocate & Psychologist",
    talkTitle: "Breaking the Silence: Mental Health in Modern Society",
    description: "Destigmatizing mental health and fostering open conversations",
    talkSummary:
      "Dr.Sherwin Molayem courageously addresses the mental health crisis affecting communities worldwide. Through personal experience and professional expertise, Sherwin challenges the stigma surrounding mental health, advocating for open dialogue, compassion, and accessible support systems that can save lives.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Sherwin.png",
    duration: "",
    date: "2025",
    category: "Health",
  },
  {
    name: "Dr. Erica Urquhart",
    title: "Urban Planner & Design Thinker",
    talkTitle: "Cities for People: Reimagining Urban Spaces",
    description: "Designing cities that prioritize human wellbeing and connection",
    talkSummary:
      "Urquhart Thompson envisions a radical reimagining of urban spaces, placing human needs and community wellbeing at the center of city design. Drawing on innovative urban planning principles from around the world, Urquhart presents a compelling vision for cities that are not just efficient, but truly livable.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Urquhart.png",
    duration: "",
    date: "2025",
    category: "Urban Design",
  },
  {
    name: "Dr.Youmin Zhong",
    title: "Education Innovator & Learning Designer",
    talkTitle: "Learning Unleashed: Education Beyond the Classroom",
    description: "Transforming education for the 21st century learner",
    talkSummary:
      "Dr.Youmin Zhong challenges traditional educational paradigms by demonstrating how learning happens everywhere—not just in classrooms. Through innovative teaching methodologies and real-world examples, Youmin shows how we can create educational experiences that are engaging, relevant, and truly transformative for students of all ages.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Youmin.png",
    duration: "",
    date: "2025",
    category: "Education",
  },
  {
    name: "Zoie",
    title: "Artist & Creative Therapist",
    talkTitle: "The Healing Power of Creativity",
    description: "How artistic expression can transform trauma into triumph",
    talkSummary:
      "Zoie reveals the profound therapeutic potential of creative expression. Through powerful stories and artistic demonstrations, Zoie shows how painting, music, writing, and other creative outlets can help individuals process trauma, discover their voice, and reclaim their narrative in ways traditional therapy cannot always reach.",
    socials: [
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
    videoId: "",
    imageSrc: "/speakers/Zoie.png",
    duration: "",
    date: "2025",
    category: "Art & Healing",
  },
];

// Current speakers
export const speakers: Speaker[] = currentSpeakers;

// Helper functions
export const getAllSpeakers = () => speakers;

export const getSpeakerByName = (name: string) =>
  speakers.find((speaker) => speaker.name === name);
