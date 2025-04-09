import ContactForm from "@/components/contact-form"
import GoogleMap from "@/components/google-map"
import ContactInfo from "@/components/contact-info"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - TEDxBeixinqiao",
  description: "Get in touch with the TEDxBeixinqiao team.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-5xl">
          Get in <span className="text-red-600 dark:text-red-500">Touch</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          Have questions or want to learn more about TEDxBeixinqiao? Reach out to us!
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <ContactInfo />
          <div className="mt-8 h-[400px] w-full overflow-hidden rounded-lg">
            <GoogleMap />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
