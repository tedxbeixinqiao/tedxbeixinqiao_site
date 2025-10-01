// Define types for team member data
export interface Social {
  platform: string;
  url: string;
}

export interface TeamMember {
  name: string;
  firstName: string;
  title: string;
  role: string;
  quote?: string;
  bio: string;
  fullBio: string;
  image: string;
  socials: Social[];
}

// Define role categories for filtering
export interface RoleCategory {
  id: string;
  label: string;
}

export const roleCategories: RoleCategory[] = [
  { id: "all", label: "All Team" },
  { id: "leadership", label: "Leadership" },
  { id: "communications", label: "Communications" },
  { id: "funding", label: "Funding" },
  { id: "speakers", label: "Speakers" },
  { id: "operations", label: "Operations" },
];

// Centralized team data with updated positions based on the provided information
export const teamMembers: TeamMember[] = [
  {
    name: "Max",
    firstName: "Max",
    title: "Production Manager",
    role: "operations",
    quote: "If it looks effortless on stage, that means we did our job.",
    bio: "Max ensures every technical aspect of the TEDxBeixinqiao event runs smoothly — from lights and sound to stage transitions — crafting an unforgettable experience.",
    fullBio:
      "Max is a seasoned event producer with a background in live theater and television production. Originally from Australia and now based in Beijing, she has worked on everything from underground art shows to large-scale festivals. With over a decade of experience coordinating lighting, audio, and stage design, Max brings both creative vision and logistical precision to TEDxBeixinqiao. Her passion lies in turning ambitious concepts into reality, and making sure every cue hits right on time.",
    image: "/team/max.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/maxkeith" },
      { platform: "website", url: "https://maxkeithstudio.com" },
    ],
  },
  {
    name: "Yossy",
    firstName: "Yossy",
    title: "Lead, Business & Brand Development",
    role: "leadership",
    bio: "As Lead of Business & Brand Development, Yossy brings strategic vision and creativity to TEDxBeixinqiao. She expertly navigates partnerships and brand growth opportunities.",
    fullBio:
      "As Lead of Business & Brand Development, Yossy brings strategic vision and creativity to TEDxBeixinqiao. With her extensive background in brand strategy and business development, she expertly navigates partnerships and growth opportunities that align with TEDx values. Yossy's passion for connecting innovative ideas with the right audiences helps establish TEDxBeixinqiao as a premier platform for thought leadership in Beijing. Her collaborative approach to brand building ensures that each event reflects both global TEDx standards and local cultural significance.",
    image: "/team/yossy.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Floria",
    firstName: "Floria",
    title: "Director of Operations & Flow",
    role: "operations",
    bio: "Floria oversees all operational aspects of TEDxBeixinqiao events, ensuring seamless execution from planning to delivery with meticulous attention to detail and process efficiency.",
    fullBio:
      "Floria oversees all operational aspects of TEDxBeixinqiao events, ensuring seamless execution from planning to delivery. With her exceptional organizational skills and strategic mindset, she creates frameworks that allow ideas to flourish while maintaining practical feasibility. Floria's meticulous attention to detail and process efficiency transforms creative visions into well-executed experiences. She leads the operations team with a clear focus on excellence, ensuring that every TEDxBeixinqiao event flows smoothly for speakers, attendees, and volunteers alike. Her background in event management and operations provides the perfect foundation for creating memorable TEDx experiences.",
    image: "/team/floria.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
  },
  {
    name: "Elena",
    firstName: "Elena",
    title: "Head of Communications & Voice",
    role: "communications",
    bio: "Elena leads TEDxBeixinqiao's communications strategy, crafting compelling narratives that represent our vision and connect with diverse audiences across multiple platforms.",
    fullBio:
      "Elena leads TEDxBeixinqiao's communications strategy, crafting compelling narratives that represent our vision and connect with diverse audiences. Her expertise in strategic communications ensures that TEDx ideas reach beyond the event itself, creating lasting impact through thoughtful messaging and storytelling. Elena oversees all external communications, from press relations to social media presence, maintaining a consistent voice that embodies the essence of TEDxBeixinqiao. Her background in journalism and content strategy brings valuable perspective to how we share ideas worth spreading with the world.",
    image: "/team/elena.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Keith Collea",
    firstName: "Keith",
    title: "Lead Curator & Vision Director",
    role: "leadership",
    quote: "since childhood Keith has wanted to save the butterflies",
    bio: "Keith brings extensive experience in production and storytelling to TEDxBeixinqiao, having produced hundreds of live shows and numerous film and television productions.",
    fullBio:
      "Over the years, Keith has produced hundreds of live shows for theater, numerous television productions, and several films, some of which he also wrote. One of his notable films was released by Lionsgate and featured an Academy Award-winning actor in a leading role. As a producer, Keith has designed, budgeted, supervised, and delivered films that have generated millions in revenue. He has imparted his knowledge by teaching production at UCLA and Shanghai University. Prior to his work in China, Keith contributed to over 20 Hollywood blockbusters, assisting some of Hollywood's greatest directors. His involvement in China's emerging film industry began over 14 years ago, working on several major box office successes. While in China, Keith fell in love with the culture, the people, and the food, humorously noting, \"I know that sounds funny, but it's true; I love it here.\"",
    image: "/team/keith.jpg",
    socials: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/keith-collea-9a70984/",
      },
      { platform: "website", url: "https://keithc-portfolio.vercel.app" },
    ],
  },
  {
    name: "Songbin Huang",
    firstName: "Songbin",
    title: "Strategic Sponsorships Lead",
    role: "funding",
    bio: "Songbin leads TEDxBeixinqiao's sponsorship strategy, developing valuable partnerships that align with our vision while providing meaningful benefits to our supporting organizations.",
    fullBio:
      "Songbin leads TEDxBeixinqiao's sponsorship strategy, developing valuable partnerships that align with our vision while providing meaningful benefits to our supporting organizations. With a background in business development and client relations, his strategic approach to partnership building goes beyond traditional sponsorship to create authentic collaborations. Songbin's ability to identify and cultivate mutually beneficial relationships ensures TEDxBeixinqiao has the resources needed to bring powerful ideas to our community. He works closely with partners to create custom activation opportunities that enhance the event experience while showcasing their support meaningfully.",
    image: "/team/songbin.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/songbin-huang/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Sebastian Sunday",
    firstName: "Sebastian",
    title: "Head of Speaker Development",
    role: "leadership",
    bio: "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he has worked at Peking University since autumn 2019.",
    fullBio:
      "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he has worked at Peking University since autumn 2019. He is a Fellow of the Institute of Foreign Philosophy at Peking University and a former Berggruen China Fellow. He works broadly in philosophy, on both practical and theoretical issues.",
    image: "/team/sebastian.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/xiaosai/" },
      { platform: "website", url: " https://www.yhposolihp.com/" },
    ],
  },
  {
    name: "Frank Liang",
    firstName: "Frank",
    title: "Speaker Logistics & Coordination Lead",
    role: "speakers",
    bio: "Frank orchestrates all aspects of speaker logistics, ensuring presenters have everything they need to deliver powerful talks through meticulous coordination and personalized support.",
    fullBio:
      "Frank orchestrates all aspects of speaker logistics, ensuring presenters have everything they need to deliver powerful talks at TEDxBeixinqiao. His organizational skills and attention to detail create a supportive environment where speakers can focus entirely on their presentations. Frank manages the complex coordination of schedules, technical requirements, and speaker preparation, maintaining clear communication throughout the process. He works closely with the Speaker Development team to ensure a seamless journey for all presenters, from initial selection through post-event follow-up. His dedication to supporting speakers creates the foundation for memorable, impactful TEDx talks.",
    image: "/team/frank.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Jacob Lish",
    firstName: "Jacob",
    title: "English Content & Messaging Lead",
    role: "communications",
    bio: "Jacob oversees English language content strategy and development for TEDxBeixinqiao, crafting clear, compelling messaging that communicates our mission and speakers' ideas effectively.",
    fullBio:
      "Jacob oversees English language content strategy and development for TEDxBeixinqiao, crafting clear, compelling messaging that communicates our mission and speakers' ideas effectively. With a background in journalism and content creation, he ensures all English communications maintain the highest standards of clarity and impact. Jacob works across platforms to develop consistent messaging that resonates with our diverse audience, from event descriptions to speaker introductions. His editorial expertise helps shape how ideas are presented and received, ensuring that the essence of each talk is captured faithfully in all written materials. Jacob collaborates closely with the communications team to create cohesive bilingual content strategies.",
    image: "/team/jacob.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Rida Ahmed",
    firstName: "Rida",
    title: "Community Experience & Engagement Manager",
    role: "communications",
    bio: "Rida creates meaningful connections between TEDxBeixinqiao and our community, developing engagement strategies that extend our impact before, during, and after events.",
    fullBio:
      "Rida creates meaningful connections between TEDxBeixinqiao and our community, developing engagement strategies that extend our impact before, during, and after events. Her expertise in community building and audience development helps create inclusive spaces where diverse perspectives can flourish. Rida designs innovative ways for attendees to interact with speakers' ideas, fostering deeper engagement and lasting impact. She works to ensure that the TEDxBeixinqiao experience goes beyond passive listening to create genuine connections and inspire action. Her approach to community engagement emphasizes accessibility, ensuring that our events welcome participants from all backgrounds and perspectives.",
    image: "/team/rida.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Ruili Wang",
    firstName: "Ruili",
    title: "Chinese Language & Cultural Content Specialist",
    role: "communications",
    bio: "Ruili ensures that TEDxBeixinqiao's communications resonate authentically with Chinese audiences, providing cultural context and nuanced translations that preserve the essence of each idea.",
    fullBio:
      "Ruili ensures that TEDxBeixinqiao's communications resonate authentically with Chinese audiences, providing cultural context and nuanced translations that preserve the essence of each idea. Her deep understanding of Chinese language and culture allows her to bridge international concepts with local perspectives, creating content that feels native rather than translated. Ruili works across all platforms to maintain consistent messaging that honors both global TEDx standards and Chinese communication styles. Her expertise ensures that complex ideas remain accessible and engaging when presented in Chinese, maintaining the impact of each speaker's original message while adapting to cultural nuances.",
    image: "/team/ruili.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "website", url: "https://example.com/" },
    ],
  },
  {
    name: "Xiaodan Xi",
    firstName: "Xiaodan",
    title: "Sponsorship Support & Activation Coordinator",
    role: "funding",
    bio: "Xiaodan coordinates the implementation of sponsorship agreements, ensuring that partner activations are executed flawlessly while maintaining the integrity of the TEDxBeixinqiao experience.",
    fullBio:
      "Xiaodan coordinates the implementation of sponsorship agreements, ensuring that partner activations are executed flawlessly while maintaining the integrity of the TEDxBeixinqiao experience. Working closely with the Strategic Sponsorships Lead, she manages the practical aspects of partner integration, from branding placement to on-site activations. Xiaodan's attention to detail and organizational skills ensure that sponsor expectations are met or exceeded while enhancing rather than distracting from the event itself. Her background in event coordination and client relations provides valuable perspective in balancing commercial considerations with TEDx principles.",
    image: "/team/xiaodan.jpg",
    socials: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/xiaodan-xi-5498b2a6/",
      },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Mihriban Tursun",
    firstName: "Mihriban",
    title: "Senior Consultant",
    role: "leadership",
    bio: "As Senior Consultant, Mihriban provides strategic guidance to the TEDxBeixinqiao leadership team, drawing on her extensive experience in communications and cross-cultural projects.",
    fullBio:
      "As Senior Consultant, Mihriban provides strategic guidance to the TEDxBeixinqiao leadership team, drawing on her extensive experience in communications and cross-cultural projects. Her advisory role helps shape the organization's direction while maintaining alignment with TEDx principles. Mihriban's expertise in public relations and media outreach informs our communications strategy, ensuring that we effectively engage with diverse audiences. Her perspective as a seasoned professional brings valuable insights to our planning and evaluation processes, helping us continuously improve our approach. Mihriban's commitment to facilitating dialogue across communities aligns perfectly with TEDxBeixinqiao's mission to share ideas worth spreading.",
    image: "/team/mihriban.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
    ],
  },
  {
    name: "Badreldin Mostafa",
    firstName: "Badreldin",
    title: "Communications Support / Video",
    role: "communications",
    bio: "Badreldin creates compelling visual content that captures the essence of TEDxBeixinqiao, developing videos that extend our reach and impact beyond the live event experience.",
    fullBio:
      "Badreldin creates compelling visual content that captures the essence of TEDxBeixinqiao, developing videos that extend our reach and impact beyond the live event experience. His talent for visual storytelling transforms complex ideas into accessible, engaging content that resonates with diverse audiences. Working within the Communications team, Badreldin produces everything from promotional teasers to comprehensive event documentation, ensuring that each video reflects our brand identity and values. His creative approach to videography helps bring speakers' ideas to life, creating visual narratives that enhance understanding and emotional connection.",
    image: "/team/badr.jpg",
    socials: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/badreldin-mostafa-71a6645/",
      },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
  },
  {
    name: "Sophie Wu",
    firstName: "Sophie",
    title: "Founding Curator & Lead Instigator",
    role: "leadership",
    quote:
      "If I could have a superpower, It'd be to fix the broken and heal the wounded; What would yours be?",
    bio: "With over a decade of experience as an operations professional and entrepreneur, Sophie has showcased remarkable leadership across various industries.",
    fullBio:
      "With over a decade of experience as an operations professional and entrepreneur, Sophie has showcased remarkable leadership across various industries. As a TEDx Licensee and Lead Curator, she is deeply dedicated to merging corporate excellence with social impact within the technology sector. Sophie's passion lies in the creation and nurturing of thriving communities that foster positive innovation. She staunchly believes in the importance of persistent practices for ensuring sustainability and is unwavering in her commitment to leading by example. Beyond her professional endeavors, Sophie's insatiable curiosity fuels her love for travel, photography, and exploring diverse cultures. Her mission is not just limited to the corporate world; she aspires to tell the stories of underserved communities and make measurable strides towards creating a better world for all.",
    image: "/team/sophie.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/sophiefanwu/" },
      { platform: "instagram", url: "https://instagram.com/" },
    ],
  },
  {
    name: "Abenezer Workija",
    firstName: "Ben",
    title: "Digital Experience & Technical",
    role: "communications",
    bio: "Ben leads TEDxBeixinqiao's digital presence and technical execution, ensuring seamless online experiences and innovative implementation of technology throughout our events.",
    fullBio:
      "Ben leads TEDxBeixinqiao's digital presence and technical execution, bringing creativity and strategic thinking to our online platforms and event technology. With extensive experience in web development, UX design, and digital strategy, he ensures that our online presence reflects our commitment to innovation and accessibility. Ben's technical expertise enables the seamless integration of digital elements into our physical events, creating immersive experiences that extend beyond the venue. His approach combines creative vision with practical implementation, resulting in digital touchpoints that enhance audience engagement and amplify our speakers' ideas across multiple platforms.",
    image: "/team/ben.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "website", url: "https://example.com/" },
    ],
  },
];

// Helper function to sort team members (leadership first, then alphabetically)
export const getSortedTeam = () => {
  return [...teamMembers].sort((a, b) => {
    if (a.role === "leadership" && b.role !== "leadership") return -1;
    if (a.role !== "leadership" && b.role === "leadership") return 1;
    return a.name.localeCompare(b.name);
  });
};

// Get team members filtered by role
export const getTeamByRole = (role: string) => {
  if (role === "all") return getSortedTeam();
  return teamMembers.filter((member) => member.role === role);
};

// Get a specific team member by name
export const getTeamMemberByName = (name: string) => {
  return teamMembers.find((member) => member.name === name);
};
