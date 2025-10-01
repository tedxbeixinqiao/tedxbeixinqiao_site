import type { Metadata } from "next";
import { SpeakerApplicationForm } from "@/components/speaker-application-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Speaker Application - TEDxBeixinqiao",
  description: "Apply to be a speaker or nominate someone for TEDxBeixinqiao.",
};

export default function SpeakerApplicationPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl text-black md:text-5xl dark:text-white">
          Speaker <span className="text-red-600 dark:text-red-500">Portal</span>
        </h1>
        <p className="mx-auto max-w-2xl text-gray-700 text-lg dark:text-gray-300">
          Apply as a speaker or nominate someone for our TEDx event.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <Tabs className="w-full" defaultValue="application">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              value="application"
            >
              Speaker Application
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              value="nomination"
            >
              Nominate Speaker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="application">
            <div className="rounded-lg border bg-card p-6 shadow-lg">
              <SpeakerApplicationForm formType="application" />
            </div>
          </TabsContent>

          <TabsContent value="nomination">
            <div className="rounded-lg border bg-card p-6 shadow-lg">
              <SpeakerApplicationForm formType="nomination" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
