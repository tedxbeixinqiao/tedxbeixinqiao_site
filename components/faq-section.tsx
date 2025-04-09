import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Where is the event taking place?",
    answer: "The TEDxBeixinqiao event took place at Beixinqiao subdistrict, Dongcheng, Beijing on April 20, 2024.",
  },
  {
    question: "How can I get a ticket?",
    answer:
      "The event has already taken place. Follow our social media channels and website for information about future events and ticket availability.",
  },
  {
    question: "What time will the show begin?",
    answer:
      "The event has concluded. For future events, we typically start at 1:00 PM, with registration opening an hour earlier. Specific timing details will be shared closer to the event date.",
  },
  {
    question: "Can I watch the talks online?",
    answer:
      "Yes! All talks from TEDxBeixinqiao are available on our YouTube channel. You can also find them in the Speakers section of this website.",
  },
  {
    question: "How can I participate in future events?",
    answer:
      "You can participate as an attendee, volunteer, speaker, or sponsor. Contact us through the form on this website or via email for more information about future opportunities.",
  },
]

export default function FaqSection() {
  return (
    <section className="w-full bg-white py-20 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white md:text-4xl">
            Frequently Asked <span className="text-red-600 dark:text-red-500">Questions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Find answers to common questions about TEDxBeixinqiao.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
