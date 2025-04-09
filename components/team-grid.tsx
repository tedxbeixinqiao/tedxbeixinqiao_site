"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const team = [
  {
    name: "Sophie Wu",
    title: "Lead Curator",
    quote: "If I could have a superpower, It'd be to fix the broken and heal the wounded; What would yours be?",
    bio: "With over a decade of experience as an operations professional and entrepreneur, Sophie has showcased remarkable leadership across various industries. As a TEDx Licensee and Lead Curator, she is deeply dedicated to merging corporate excellence with social impact within the technology sector. Sophie's passion lies in the creation and nurturing of thriving communities that foster positive innovation. She staunchly believes in the importance of persistent practices for ensuring sustainability and is unwavering in her commitment to leading by example. Beyond her professional endeavors, Sophie's insatiable curiosity fuels her love for travel, photography, and exploring diverse cultures. Her mission is not just limited to the corporate world; she aspires to tell the stories of underserved communities and make measurable strides towards creating a better world for all.",
  },
  {
    "name": "Sebastian Sunday",
    "title": "Head of Speakers",
    "quote": "As you get older, 3 things happen. The first is you rmemory goes, and i can't remember the other two.",
    "bio": "Sebastian is a German philosopher, who was educated in Oxford and is living in Beijing, where he works as an assistant professor at Peking University. He is a Fellow of the Chinese Institute of Foreign Philosophy and a former Berggruen China Fellow. He works broadly in philosophy, on both practical and theoretical issues, ranging from aesthetics and the theory of knowledge to logic and the philosophy of mind, with a focus on foundational cognitive science and artificial intelligence. Recent popular pieces include ‘AI’s First Philosopher’ (https://aeon.co/essays/why-we-should-remember-alan-turing-as-a-philosopher), ‘Can Machines Be Conscious?’ (https://philosophynow.org/issues/155/Can_Machines_Be_Conscious), and ‘Nietzsche and the Machines’ (https://archive.philosophersmag.com/nietzsche-and-the-machines/)."
  },
  {
    name: "Keith Collea",
    title: "Head of Operations",
    quote: "While in China I fell in love with the culture, the people and the food, HaHa",
    bio: "Over the years, Keith has produced hundreds of live shows for theater, numerous television productions, and several films, some of which he also wrote. One of his notable films was released by Lionsgate and featured an Academy Award-winning actor in a leading role. As a producer, Keith has designed, budgeted, supervised, and delivered films that have generated millions in revenue. He has imparted his knowledge by teaching production at UCLA and Shanghai University. Prior to his work in China, Keith contributed to over 20 Hollywood blockbusters, assisting some of Hollywood's greatest directors. His involvement in China's emerging film industry began over 14 years ago, working on several major box office successes. While in China, Keith fell in love with the culture, the people, and the food, humorously noting, \"I know that sounds funny, but it's true; I love it here.\"",
  },
  {
    name: "Mihriban Tursun",
    title: "Head of Communications",
    bio: "Mihriban is a seasoned communications professional with extensive experience in public relations and media outreach. Her expertise lies in crafting compelling narratives that resonate with diverse audiences. Passionate about cross-cultural communication, Mihriban has worked on numerous international projects, facilitating dialogue and understanding between different communities. In her role as Head of Communications at TEDxBeixinqiao, she is dedicated to amplifying the event's message and ensuring effective engagement with the public.",
  },
  {
    name: "Xiaodan Xi",
    title: "Head of Sponsorship",
    bio: "Xiaodan brings a wealth of experience in corporate partnerships and sponsorship acquisition. Her strategic approach has successfully secured funding and support for various large-scale events. She believes in building mutually beneficial relationships between organizations, ensuring that sponsors receive value while supporting meaningful initiatives. At TEDxBeixinqiao, Xiaodan is committed to fostering partnerships that align with the event's vision and contribute to its success.",
  },
  {
    name: "Jacob Lish",
    title: "Communications / English Content",
    bio: "Jacob is a skilled content creator specializing in English-language communications. His background in journalism and editing ensures clarity and impact in all written materials. He has a keen eye for detail and a passion for storytelling, which he utilizes to engage audiences effectively. Jacob's role at TEDxBeixinqiao involves crafting and overseeing English content to ensure it aligns with the event's objectives and resonates with attendees.",
  },
  {
    name: "Frank Liang",
    title: "Speakers / Coordination",
    bio: "Frank has extensive experience in event planning and speaker coordination. His organizational skills and attention to detail ensure that events run smoothly and speakers are well-prepared. He has worked with a diverse range of speakers, facilitating their participation and ensuring their messages are effectively delivered. At TEDxBeixinqiao, Frank is dedicated to curating a lineup of speakers who embody the event's theme and inspire the audience.",
  },
  {
    name: "Badreldin Mostafa",
    title: "Communications Support / Video",
    bio: "Badreldin is a talented videographer and multimedia specialist with a passion for visual storytelling. His work captures the essence of events and conveys powerful messages through film. He has produced a variety of video content, from promotional materials to documentary-style pieces, showcasing his versatility and creativity. In his role at TEDxBeixinqiao, Badreldin focuses on creating engaging video content that highlights the event's key moments and messages.",
  },
  {
    name: "Songbin Huang",
    title: "Sponsorship / Support",
    bio: "Songbin has a background in business development and client relations, with a focus on securing sponsorships and partnerships. His strategic mindset enables him to identify and cultivate opportunities that benefit all parties involved. He is adept at negotiating and structuring deals that align with organizational goals and values. At TEDxBeixinqiao, Songbin plays a crucial role in supporting sponsorship efforts and ensuring partners are engaged and satisfied.",
  },
]

export default function TeamGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {team.map((member, index) => (
        <motion.div key={index} variants={item}>
          <Dialog>
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-red-600/10 dark:bg-gray-900 dark:hover:shadow-red-600/20">
              <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={`/team/${member.name.split(' ')[0].toLowerCase()}.jpg`}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm font-medium">{member.title}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-black dark:text-white">{member.name}</h3>
                <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">{member.title}</p>

                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group flex w-full items-center justify-between p-0 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                  >
                    <span>Read Bio</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
              </CardContent>
            </Card>

            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{member.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                  <Image
                    src={`/team/${member.name.split(' ')[0].toLowerCase()}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{member.title}</p>

                {member.quote && (
                  <div className="rounded-lg bg-gray-100 p-4 italic dark:bg-gray-800">"{member.quote}"</div>
                )}

                <p className="text-gray-700 dark:text-gray-300">{member.bio}</p>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </motion.div>
  )
}
