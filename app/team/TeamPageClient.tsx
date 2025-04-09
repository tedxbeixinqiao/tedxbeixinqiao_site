"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Facebook, Twitter, Linkedin, Instagram, Globe, Mail, ChevronRight, X, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the team member type
interface Social {
  platform: string;
  url: string;
}

interface TeamMember {
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

// Define our team member data structure with comprehensive information
const team: TeamMember[] = [
  {
    name: "Sophie Wu",
    firstName: "Sophie",
    title: "Lead Curator",
    role: "leadership",
    quote: "If I could have a superpower, It'd be to fix the broken and heal the wounded; What would yours be?",
    bio: "With over a decade of experience as an operations professional and entrepreneur, Sophie has showcased remarkable leadership across various industries. As a TEDx Licensee and Lead Curator, she is deeply dedicated to merging corporate excellence with social impact within the technology sector. Sophie's passion lies in the creation and nurturing of thriving communities that foster positive innovation.",
    fullBio: "With over a decade of experience as an operations professional and entrepreneur, Sophie has showcased remarkable leadership across various industries. As a TEDx Licensee and Lead Curator, she is deeply dedicated to merging corporate excellence with social impact within the technology sector. Sophie's passion lies in the creation and nurturing of thriving communities that foster positive innovation. She staunchly believes in the importance of persistent practices for ensuring sustainability and is unwavering in her commitment to leading by example. Beyond her professional endeavors, Sophie's insatiable curiosity fuels her love for travel, photography, and exploring diverse cultures. Her mission is not just limited to the corporate world; she aspires to tell the stories of underserved communities and make measurable strides towards creating a better world for all.",
    image: "/team/sophie.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" },
      { platform: "website", url: "https://example.com/" }
    ],
  },
  {
    name: "Keith Collea",
    firstName: "Keith",
    title: "Head of Operations",
    role: "leadership",
    quote: "While in China I fell in love with the culture, the people and the food, HaHa",
    bio: "Over the years, Keith has produced hundreds of live shows for theater, television, and films. His notable work includes a film released by Lionsgate featuring an Academy Award-winning actor. Keith brings his extensive Hollywood experience to China's emerging film industry.",
    fullBio: "Over the years, Keith has produced hundreds of live shows for theater, numerous television productions, and several films, some of which he also wrote. One of his notable films was released by Lionsgate and featured an Academy Award-winning actor in a leading role. As a producer, Keith has designed, budgeted, supervised, and delivered films that have generated millions in revenue. He has imparted his knowledge by teaching production at UCLA and Shanghai University. Prior to his work in China, Keith contributed to over 20 Hollywood blockbusters, assisting some of Hollywood's greatest directors. His involvement in China's emerging film industry began over 14 years ago, working on several major box office successes. While in China, Keith fell in love with the culture, the people, and the food, humorously noting, \"I know that sounds funny, but it's true; I love it here.\"",
    image: "/team/keith.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" }
    ],
  },
  {
    name: "Mihriban Tursun",
    firstName: "Mihriban",
    title: "Head of Communications",
    role: "leadership",
    bio: "Mihriban is a seasoned communications professional with extensive experience in public relations and media outreach. Her expertise lies in crafting compelling narratives that resonate with diverse audiences. Passionate about cross-cultural communication.",
    fullBio: "Mihriban is a seasoned communications professional with extensive experience in public relations and media outreach. Her expertise lies in crafting compelling narratives that resonate with diverse audiences. Passionate about cross-cultural communication, Mihriban has worked on numerous international projects, facilitating dialogue and understanding between different communities. In her role as Head of Communications at TEDxBeixinqiao, she is dedicated to amplifying the event's message and ensuring effective engagement with the public.",
    image: "/team/mihriban.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" }
    ],
  },
  {
    name: "Xiaodan Xi",
    firstName: "Xiaodan",
    title: "Head of Sponsorship",
    role: "operations",
    bio: "Xiaodan brings a wealth of experience in corporate partnerships and sponsorship acquisition. Her strategic approach has successfully secured funding and support for various large-scale events, building mutually beneficial relationships between organizations.",
    fullBio: "Xiaodan brings a wealth of experience in corporate partnerships and sponsorship acquisition. Her strategic approach has successfully secured funding and support for various large-scale events. She believes in building mutually beneficial relationships between organizations, ensuring that sponsors receive value while supporting meaningful initiatives. At TEDxBeixinqiao, Xiaodan is committed to fostering partnerships that align with the event's vision and contribute to its success.",
    image: "/team/xiaodan.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" }
    ],
  },
  {
    name: "Jacob Lish",
    firstName: "Jacob",
    title: "Communications / English Content",
    role: "communications",
    bio: "Jacob is a skilled content creator specializing in English-language communications. His background in journalism and editing ensures clarity and impact in all written materials. He has a keen eye for detail and a passion for storytelling.",
    fullBio: "Jacob is a skilled content creator specializing in English-language communications. His background in journalism and editing ensures clarity and impact in all written materials. He has a keen eye for detail and a passion for storytelling, which he utilizes to engage audiences effectively. Jacob's role at TEDxBeixinqiao involves crafting and overseeing English content to ensure it aligns with the event's objectives and resonates with attendees.",
    image: "/team/jacob.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" }
    ],
  },
  {
    name: "Frank Liang",
    firstName: "Frank",
    title: "Speakers / Coordination",
    role: "speakers",
    bio: "Frank has extensive experience in event planning and speaker coordination. His organizational skills and attention to detail ensure that events run smoothly and speakers are well-prepared, facilitating memorable presentations.",
    fullBio: "Frank has extensive experience in event planning and speaker coordination. His organizational skills and attention to detail ensure that events run smoothly and speakers are well-prepared. He has worked with a diverse range of speakers, facilitating their participation and ensuring their messages are effectively delivered. At TEDxBeixinqiao, Frank is dedicated to curating a lineup of speakers who embody the event's theme and inspire the audience.",
    image: "/team/frank.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" }
    ],
  },
  {
    name: "Badreldin Mostafa",
    firstName: "Badr",
    title: "Communications Support / Video",
    role: "communications",
    bio: "Badreldin is a talented videographer and multimedia specialist with a passion for visual storytelling. His work captures the essence of events and conveys powerful messages through film, producing engaging content that highlights key moments.",
    fullBio: "Badreldin is a talented videographer and multimedia specialist with a passion for visual storytelling. His work captures the essence of events and conveys powerful messages through film. He has produced a variety of video content, from promotional materials to documentary-style pieces, showcasing his versatility and creativity. In his role at TEDxBeixinqiao, Badreldin focuses on creating engaging video content that highlights the event's key moments and messages.",
    image: "/team/badr.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "instagram", url: "https://instagram.com/" }
    ],
  },
  {
    name: "Songbin Huang",
    firstName: "Songbin",
    title: "Sponsorship / Support",
    role: "operations",
    bio: "Songbin has a background in business development and client relations, with a focus on securing sponsorships and partnerships. His strategic mindset enables him to identify and cultivate opportunities that benefit all parties involved.",
    fullBio: "Songbin has a background in business development and client relations, with a focus on securing sponsorships and partnerships. His strategic mindset enables him to identify and cultivate opportunities that benefit all parties involved. He is adept at negotiating and structuring deals that align with organizational goals and values. At TEDxBeixinqiao, Songbin plays a crucial role in supporting sponsorship efforts and ensuring partners are engaged and satisfied.",
    image: "/team/songbin.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" }
    ],
  },
  {
    name: "Abenezer Workija",
    firstName: "Ben",
    title: "Website / Design",
    role: "technical",
    bio: "Ben brings creativity and strategic thinking to the TEDxBeixinqiao team. With experience in design and content strategy, he ensures that the event's messaging and visual identity are cohesive and impactful.",
    fullBio: "Benjamin brings creativity and strategic thinking to the TEDxBeixinqiao team. With experience in design and content strategy, he ensures that the event's messaging and visual identity are cohesive and impactful. His innovative approach to problem-solving and ability to think outside the box have been invaluable in creating a distinctive and memorable experience for attendees. Ben works closely with cross-functional teams to bring creative ideas to life while maintaining the core values of the TEDx brand.",
    image: "/team/ben.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "website", url: "https://example.com/" }
    ],
  },
  {
    name: "Rida Ahmed",
    firstName: "Rida",
    title: "Community Engagement",
    role: "community",
    bio: "Rida specializes in building and nurturing community relationships. Her passion for connecting diverse groups of people helps TEDxBeixinqiao extend its reach and impact throughout the local area.",
    fullBio: "Rida specializes in building and nurturing community relationships. Her passion for connecting diverse groups of people helps TEDxBeixinqiao extend its reach and impact throughout the local area. With a background in community organizing and social impact initiatives, Rida brings valuable insights on how to engage effectively with different segments of the community. Her warm personality and natural networking abilities create genuine connections with community members, partners, and attendees alike.",
    image: "/team/rida.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "twitter", url: "https://twitter.com/" }
    ],
  },
  {
    name: "Ruili Wang",
    firstName: "Ruili",
    title: "Chinese Content Specialist",
    role: "communications",
    bio: "Ruili manages all Chinese language content for TEDxBeixinqiao. Her deep understanding of local culture and language nuances ensures all communications are culturally appropriate and effectively convey the intended messages.",
    fullBio: "Ruili manages all Chinese language content for TEDxBeixinqiao. Her deep understanding of local culture and language nuances ensures all communications are culturally appropriate and effectively convey the intended messages. With extensive experience in translation and localization, Ruili bridges the gap between global ideas and local context. She works diligently to maintain consistency across all platforms while adapting content to resonate with Chinese audiences. Her attention to detail and cultural sensitivity are essential to the success of the event's outreach efforts.",
    image: "/team/ruili.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "website", url: "https://example.com/" }
    ],
  },
  {
    name: "Sebastian Sunday",
    firstName: "Sebastian",
    title: "Head of Speakers",
    role: "leadership",
    quote: "As you get older, 3 things happen. The first is your memory goes. And I can't remember the other two.",
    bio: "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he works as an assistant professor at Peking University.",
    fullBio: "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he works as an assistant professor at Peking University. He is a Fellow of the Chinese Institute of Foreign Philosophy and a former Berggruen China Fellow. He works broadly in philosophy, on both practical and theoretical issues, ranging from aesthetics and the theory of knowledge to logic and the philosophy of mind, with a focus on foundational cognitive science and artificial intelligence. Recent popular pieces include 'AI's First Philosopher' (https://aeon.co/essays/why-we-should-remember-alan-turing-as-a-philosopher), 'Can Machines Be Conscious?' (https://philosophynow.org/issues/155/Can_Machines_Be_Conscious), and 'Nietzsche and the Machines' (https://archive.philosophersmag.com/nietzsche-and-the-machines/).",
    image: "/team/sebastian.jpg",
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/" },
      { platform: "website", url: "https://example.com/" }
    ],
  },
];

// Sort team by leadership first, then alphabetically
const sortedTeam = [...team].sort((a, b) => {
  if (a.role === "leadership" && b.role !== "leadership") return -1;
  if (a.role !== "leadership" && b.role === "leadership") return 1;
  return a.name.localeCompare(b.name);
});

interface RoleCategory {
  id: string;
  label: string;
}

const roleCategories: RoleCategory[] = [
  { id: "all", label: "All Team" },
  { id: "leadership", label: "Leadership" },
  { id: "communications", label: "Communications" },
  { id: "operations", label: "Operations" },
  { id: "speakers", label: "Speakers" },
  { id: "community", label: "Community" },
  { id: "technical", label: "Technical" },
];

function getSocialIcon(platform: string) {
  switch(platform) {
    case "linkedin": return <Linkedin className="h-4 w-4" />;
    case "twitter": return <Twitter className="h-4 w-4" />;
    case "facebook": return <Facebook className="h-4 w-4" />;
    case "instagram": return <Instagram className="h-4 w-4" />;
    case "website": return <Globe className="h-4 w-4" />;
    case "email": return <Mail className="h-4 w-4" />;
    default: return <Globe className="h-4 w-4" />;
  }
}

export default function TeamPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showScrollShadows, setShowScrollShadows] = useState({ left: false, right: true });
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Filter team members based on active filter
  const filteredTeam = activeFilter === "all" 
    ? sortedTeam 
    : sortedTeam.filter(member => member.role === activeFilter);

  // Handle scroll shadows for tab navigation
  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowScrollShadows({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 10
      });
    }
  };

  useEffect(() => {
    const tabsEl = tabsContainerRef.current;
    if (tabsEl) {
      tabsEl.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      return () => tabsEl.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll tabs left/right
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      tabsContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth' 
      });
    }
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24 pt-24 dark:from-gray-900 dark:to-gray-950">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-red-600/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-600/5 blur-3xl"></div>
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl"></div>
      </div>
      
      {/* Main content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Team header with animated underline */}
        <div className="mb-12 text-center">
          <motion.h1 
            className="mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-5xl font-bold leading-tight text-transparent dark:from-white dark:to-gray-300 md:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Meet our <span className="text-red-600 dark:text-red-500">Team</span>
          </motion.h1>
          
          <motion.div
            className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-red-600 to-red-300"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          
          <motion.p 
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            The passionate individuals who bring TEDxBeixinqiao to life. Together, we're dedicated to creating a platform where innovative ideas flourish and meaningful connections form.
          </motion.p>
        </div>

        {/* Team member filtering with animated tabs */}
        <motion.div 
          className="relative mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="relative">
            {/* Left shadow and scroll button */}
            <AnimatePresence>
              {showScrollShadows.left && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-y-0 left-0 z-10 flex items-center"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900"></div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative ml-1 rounded-full" 
                    onClick={() => scrollTabs('left')}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          
            {/* Right shadow and scroll button */}
            <AnimatePresence>
              {showScrollShadows.right && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-y-0 right-0 z-10 flex items-center"
                >
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900"></div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative mr-1 rounded-full" 
                    onClick={() => scrollTabs('right')}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          
            {/* Scrollable tabs */}
            <div 
              ref={tabsContainerRef}
              className="flex overflow-x-auto pb-2 scrollbar-hide"
            >
              <Tabs 
                defaultValue="all" 
                value={activeFilter}
                onValueChange={setActiveFilter}
                className="mx-auto"
              >
                <TabsList className="bg-gray-100/80 backdrop-blur dark:bg-gray-800/50">
                  {roleCategories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* Team members grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          layout
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.05
                }}
                layout
                whileHover={{ y: -8 }}
              >
                <Card 
                  className="group h-full overflow-hidden border-none bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-red-600/10 dark:bg-gray-900 dark:hover:shadow-red-600/20"
                  onClick={() => {
                    setSelectedMember(member);
                    setDialogOpen(true);
                  }}
                >
                  {/* Image with gradient overlay */}
                  <div 
                    className="relative aspect-square w-full overflow-hidden cursor-pointer"
                    onMouseEnter={() => setHoveredMember(member.name)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredMember === member.name ? "scale-110" : "scale-100"
                      )}
                    />
                    
                    {/* Subtle overlay on hover instead of button */}
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300",
                      hoveredMember === member.name ? "opacity-100" : "opacity-0"
                    )}>
                      <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                        View Details
                      </span>
                    </div>
                  </div>
                  
                  {/* Name, title and role chip */}
                  <div className="p-4 cursor-pointer">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-black dark:text-white">{member.name}</h3>
                      <div className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        member.role === "leadership" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                        member.role === "communications" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                        member.role === "operations" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                        member.role === "speakers" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                        member.role === "creative" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                        member.role === "community" ? "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" :
                        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      )}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{member.title}</p>
                    
                    {/* Social icons without the Read Bio button */}
                    <div className="mt-auto flex items-center justify-end">
                      <div className="flex gap-1.5">
                        {member.socials?.slice(0, 2).map((social, idx) => (
                          <motion.a
                            key={idx}
                            href={social.url}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Prevent modal from opening when clicking social links
                          >
                            {getSocialIcon(social.platform)}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Hidden Dialog trigger component */}
                <Dialog open={dialogOpen && selectedMember === member} onOpenChange={(open) => {
                  if (!open) setDialogOpen(false);
                }}>
                  <DialogTrigger className="hidden"></DialogTrigger>
                  {/* ...existing dialog content... */}
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Fancy team member modal dialog */}
        {selectedMember && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedMember.name}</DialogTitle>
                <DialogClose className="absolute right-4 top-4">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogHeader>
              
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {/* Left column: image and socials */}
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
                    <Image 
                      src={selectedMember.image} 
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Social icons bar */}
                  <div className="flex justify-center gap-3">
                    {selectedMember.socials?.map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.url}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getSocialIcon(social.platform)}
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                {/* Right column: role, title, quote, bio */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium w-fit",
                      selectedMember.role === "leadership" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                      selectedMember.role === "communications" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                      selectedMember.role === "operations" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                      selectedMember.role === "speakers" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" :
                      selectedMember.role === "creative" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                      selectedMember.role === "community" ? "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" :
                      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    )}>
                      {selectedMember.role.charAt(0).toUpperCase() + selectedMember.role.slice(1)}
                    </div>
                    <h3 className="text-xl font-semibold">{selectedMember.title}</h3>
                  </div>
                  
                  {/* Animated quote with gradient background */}
                  {selectedMember.quote && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-lg bg-gradient-to-r from-gray-50 to-white p-4 italic text-gray-800 shadow-sm dark:from-gray-800 dark:to-gray-900 dark:text-gray-200"
                    >
                      "{selectedMember.quote}"
                    </motion.div>
                  )}
                  
                  {/* Detailed biography */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="prose prose-sm dark:prose-invert"
                  >
                    <p className="text-gray-700 dark:text-gray-300">{selectedMember.fullBio}</p>
                  </motion.div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}