"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, X, Linkedin, Twitter, Globe } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Social {
  type: "linkedin" | "twitter" | "website";
  url: string;
}

interface TeamMember {
  name: string;
  title: string;
  quote?: string;
  bio: string;
  socials: Social[];
}

const team: TeamMember[] = [
  {
    name: "Sophie Wu",
    title: "Lead Curator",
    quote: "If I could have a superpower, It'd be to fix the broken and heal the wounded; What would yours be?",
    bio: "With over a decade of experience as an operations professional and entrepreneur, Sophie has showcased remarkable leadership across various industries. As a TEDx Licensee and Lead Curator, she is deeply dedicated to merging corporate excellence with social impact within the technology sector. Sophie's passion lies in the creation and nurturing of thriving communities that foster positive innovation. She staunchly believes in the importance of persistent practices for ensuring sustainability and is unwavering in her commitment to leading by example. Beyond her professional endeavors, Sophie's insatiable curiosity fuels her love for travel, photography, and exploring diverse cultures. Her mission is not just limited to the corporate world; she aspires to tell the stories of underserved communities and make measurable strides towards creating a better world for all.",
    socials: [
      { type: "linkedin" as const, url: "#" },
      { type: "twitter" as const, url: "#" },
      { type: "website" as const, url: "#" }
    ],
  },
  {
    name: "Keith Collea",
    title: "Head of Operations",
    quote: "While in China I fell in love with the culture, the people and the food, HaHa",
    bio: "Over the years, Keith has produced hundreds of live shows for theater, numerous television productions, and several films, some of which he also wrote. One of his notable films was released by Lionsgate and featured an Academy Award-winning actor in a leading role. As a producer, Keith has designed, budgeted, supervised, and delivered films that have generated millions in revenue. He has imparted his knowledge by teaching production at UCLA and Shanghai University. Prior to his work in China, Keith contributed to over 20 Hollywood blockbusters, assisting some of Hollywood's greatest directors. His involvement in China's emerging film industry began over 14 years ago, working on several major box office successes. While in China, Keith fell in love with the culture, the people, and the food, humorously noting, \"I know that sounds funny, but it's true; I love it here.\"",
    socials: [
      { type: "linkedin" as const, url: "#" },
      { type: "twitter" as const, url: "#" }
    ],
  },
  {
    name: "Mihriban Tursun",
    title: "Head of Communications",
    bio: "Mihriban is a seasoned communications professional with extensive experience in public relations and media outreach. Her expertise lies in crafting compelling narratives that resonate with diverse audiences. Passionate about cross-cultural communication, Mihriban has worked on numerous international projects, facilitating dialogue and understanding between different communities. In her role as Head of Communications at TEDxBeixinqiao, she is dedicated to amplifying the event's message and ensuring effective engagement with the public.",
    socials: [
      { type: "linkedin" as const, url: "#" },
      { type: "twitter" as const, url: "#" }
    ],
  },
  {
    name: "Xiaodan Xi",
    title: "Head of Sponsorship",
    bio: "Xiaodan brings a wealth of experience in corporate partnerships and sponsorship acquisition. Her strategic approach has successfully secured funding and support for various large-scale events. She believes in building mutually beneficial relationships between organizations, ensuring that sponsors receive value while supporting meaningful initiatives. At TEDxBeixinqiao, Xiaodan is committed to fostering partnerships that align with the event's vision and contribute to its success.",
    socials: [
      { type: "linkedin" as const, url: "#" },
      { type: "twitter" as const, url: "#" }
    ],
  },
  {
    name: "Jacob Lish",
    title: "Communications / English Content",
    bio: "Jacob is a skilled content creator specializing in English-language communications. His background in journalism and editing ensures clarity and impact in all written materials. He has a keen eye for detail and a passion for storytelling, which he utilizes to engage audiences effectively. Jacob's role at TEDxBeixinqiao involves crafting and overseeing English content to ensure it aligns with the event's objectives and resonates with attendees.",
    socials: [
      { type: "linkedin", url: "#" },
      { type: "twitter", url: "#" }
    ],
  },
  {
    name: "Frank Liang",
    title: "Speakers / Coordination",
    bio: "Frank has extensive experience in event planning and speaker coordination. His organizational skills and attention to detail ensure that events run smoothly and speakers are well-prepared. He has worked with a diverse range of speakers, facilitating their participation and ensuring their messages are effectively delivered. At TEDxBeixinqiao, Frank is dedicated to curating a lineup of speakers who embody the event's theme and inspire the audience.",
    socials: [
      { type: "linkedin", url: "#" },
      { type: "twitter", url: "#" }
    ],
  },
  {
    name: "Badreldin Mostafa",
    title: "Communications Support / Video",
    bio: "Badreldin is a talented videographer and multimedia specialist with a passion for visual storytelling. His work captures the essence of events and conveys powerful messages through film. He has produced a variety of video content, from promotional materials to documentary-style pieces, showcasing his versatility and creativity. In his role at TEDxBeixinqiao, Badreldin focuses on creating engaging video content that highlights the event's key moments and messages.",
    socials: [
      { type: "linkedin", url: "#" },
      { type: "twitter", url: "#" }
    ],
  },
  {
    name: "Songbin Huang",
    title: "Sponsorship / Support",
    bio: "Songbin has a background in business development and client relations, with a focus on securing sponsorships and partnerships. His strategic mindset enables him to identify and cultivate opportunities that benefit all parties involved. He is adept at negotiating and structuring deals that align with organizational goals and values. At TEDxBeixinqiao, Songbin plays a crucial role in supporting sponsorship efforts and ensuring partners are engaged and satisfied.",
    socials: [
      { type: "linkedin", url: "#" },
      { type: "twitter", url: "#" }
    ],
  },
  {
    name: "Sebastian Sunday",
    title: "Head of Speakers",
    quote: "As you get older, 3 things happen. The first is your memory goes. And I can't remember the other two.",
    bio: "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he works as an assistant professor at Peking University. He is a Fellow of the Chinese Institute of Foreign Philosophy and a former Berggruen China Fellow. He works broadly in philosophy, on both practical and theoretical issues, ranging from aesthetics and the theory of knowledge to logic and the philosophy of mind, with a focus on foundational cognitive science and artificial intelligence. Recent popular pieces include 'AI's First Philosopher', 'Can Machines Be Conscious?', and 'Nietzsche and the Machines'.",
    socials: [
      { type: "linkedin", url: "#" },
      { type: "website", url: "#" }
    ],
  },
]

export default function TeamSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  }
  
  const profileVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.9 }
  }
  
  interface Social {
    type: "linkedin" | "twitter" | "website";
    url: string;
  }

  interface TeamMember {
    name: string;
    title: string;
    quote?: string;
    bio: string;
    socials: Social[];
  }
  const getSocialIcon = (type: Social["type"]): React.ReactNode => {
    const icons = {
      linkedin: <Linkedin className="h-4 w-4" />,
      twitter: <Twitter className="h-4 w-4" />,
      website: <Globe className="h-4 w-4" />,
    };
    return icons[type] || null;
  };

  return (
    <section id="team" className="relative w-full overflow-hidden bg-gray-50 py-24 dark:bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,rgba(255,255,255,0)_100%)]"></div>
        
        {/* Interactive background elements */}
        <motion.div 
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-red-500/10 blur-3xl"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 15, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div 
        ref={containerRef}
        className="container mx-auto px-4"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto max-w-6xl"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-16 flex flex-col items-center text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
              Behind the Ideas
            </span>
            <h2 className="mb-6 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:to-gray-400 md:text-5xl">
              Meet the <span className="text-red-600 dark:text-red-500">Team</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              The passionate individuals who bring TEDxBeixinqiao to life. Each member contributes their unique expertise to create an unforgettable experience.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {team.map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredMember(index)}
                onHoverEnd={() => setHoveredMember(null)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Card className={cn(
                  "group relative overflow-hidden border-0 bg-white transition-all duration-500 dark:bg-gray-900",
                  hoveredMember === index ? "shadow-xl" : "shadow-md"
                )}>
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={`/team/${member.name.split(' ')[0].toLowerCase()}.jpg`}
                      alt={member.name}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        hoveredMember === index ? "scale-105" : "scale-100"
                      )}
                    />
                    
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300",
                      hoveredMember === index ? "opacity-100" : "opacity-0"
                    )}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-white bg-transparent text-white backdrop-blur-sm hover:bg-white hover:text-red-600"
                            onClick={() => setSelectedMember(member)}
                          >
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{member.name}</DialogTitle>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-4 top-4"
                              onClick={() => {
                                const focusGuard = document.querySelector('[data-radix-focus-guard]');
                                if (focusGuard?.nextSibling instanceof HTMLElement) {
                                  focusGuard.nextSibling.click();
                                }
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </DialogHeader>
                          <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={profileVariants}
                            className="flex flex-col gap-4"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{member.title}</p>
                              <div className="flex gap-2">
                                {member.socials?.map((social, idx) => (
                                  <motion.a 
                                    key={idx}
                                    href={social.url}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {getSocialIcon(social.type)}
                                  </motion.a>
                                ))}
                              </div>
                            </div>

                            {member.quote && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-lg bg-gradient-to-r from-red-50 to-transparent p-4 italic dark:from-red-900/20 dark:to-transparent"
                              >
                                "{member.quote}"
                              </motion.div>
                            )}

                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {member.bio}
                            </motion.p>
                          </motion.div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-black dark:text-white">{member.name}</h3>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{member.title}</p>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mt-3 flex justify-between"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="group p-0 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                          >
                            <span>Read Bio</span>
                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          {/* Dialog content handled above */}
                        </DialogContent>
                      </Dialog>
                      
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
                          >
                            {getSocialIcon(social.type)}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
