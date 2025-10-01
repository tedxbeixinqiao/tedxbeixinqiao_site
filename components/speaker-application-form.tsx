"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  sendSpeakerApplicationEmail,
  sendSpeakerNominationEmail,
} from "@/lib/email/resend-service";
import {
  createSpeakerApplication,
  createSpeakerNomination,
} from "@/lib/speakers-db-service";

// Speaker Application schema with validation
const speakerApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name cannot exceed 30 words." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobilePhone: z
    .string()
    .min(5, { message: "Please provide a valid phone number." })
    .max(30, { message: "Phone number cannot exceed 30 characters." }),
  wechatId: z
    .string()
    .min(2, { message: "Please provide your WeChat ID." })
    .max(30, { message: "WeChat ID cannot exceed 30 characters." }),
  priorTedTalk: z
    .string()
    .min(2, { message: "Please answer if you've given a TED talk before." })
    .max(30, { message: "Response cannot exceed 30 words." }),
  job: z
    .string()
    .min(2, { message: "Please provide your job information." })
    .max(30, { message: "Job information cannot exceed 30 words." }),
  remarks: z
    .string()
    .max(30, { message: "Remarks cannot exceed 30 words." })
    .optional(),
  ideaPresentation: z
    .string()
    .min(10, { message: "Please describe your idea in at least 10 words." })
    .refine(
      (value) => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount <= 50;
      },
      { message: "Description cannot exceed 50 words." }
    ),
  commonBelief: z
    .string()
    .min(5, { message: "Please describe the common belief." })
    .refine(
      (value) => {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= 150;
      },
      { message: "Response cannot exceed 150 words." }
    ),
  coreIdea: z
    .string()
    .min(5, { message: "Please describe your core idea." })
    .refine(
      (value) => {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= 150;
      },
      { message: "Response cannot exceed 150 words." }
    ),
  personalInsight: z
    .string()
    .min(5, { message: "Please share your personal insight or example." })
    .refine(
      (value) => {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= 150;
      },
      { message: "Response cannot exceed 150 words." }
    ),
  potentialImpact: z
    .string()
    .min(5, { message: "Please describe the potential impact." })
    .refine(
      (value) => {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= 150;
      },
      { message: "Response cannot exceed 150 words." }
    ),
  rehearsalAvailability: z
    .string()
    .min(2, { message: "Please provide your rehearsal availability." })
    .max(50, { message: "Response cannot exceed 50 words." }),
  // Note: File upload would be handled separately in a real implementation
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.string().length(0)),
});

type SpeakerApplicationValues = z.infer<typeof speakerApplicationSchema>;

// Nominate Speaker schema with validation
const nominateSpeakerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name cannot exceed 30 words." }),
  contact: z
    .string()
    .min(5, { message: "Please provide contact information." })
    .max(30, { message: "Contact information cannot exceed 30 words." }),
  priorTedTalk: z
    .string()
    .min(2, { message: "Please answer if they've given a TED talk before." })
    .max(30, { message: "Response cannot exceed 30 words." }),
  remarks: z
    .string()
    .min(2, { message: "Please provide some remarks." })
    .max(30, { message: "Remarks cannot exceed 30 words." }),
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.string().length(0)),
});

type NominateSpeakerValues = z.infer<typeof nominateSpeakerSchema>;

interface SpeakerFormProps {
  formType: "application" | "nomination";
}

export function SpeakerApplicationForm({ formType }: SpeakerFormProps) {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Speaker Application Form
  const applicationForm = useForm<SpeakerApplicationValues>({
    resolver: zodResolver(speakerApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobilePhone: "",
      wechatId: "",
      priorTedTalk: "",
      job: "",
      remarks: "",
      ideaPresentation: "",
      commonBelief: "",
      coreIdea: "",
      personalInsight: "",
      potentialImpact: "",
      rehearsalAvailability: "",
      websiteUrl: "",
    },
  });

  // Nominate Speaker Form
  const nominationForm = useForm<NominateSpeakerValues>({
    resolver: zodResolver(nominateSpeakerSchema),
    defaultValues: {
      fullName: "",
      contact: "",
      priorTedTalk: "",
      remarks: "",
      websiteUrl: "",
    },
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;

    // Check file size if a file is selected (2MB limit)
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File too large", {
        description: "The PDF file must be smaller than 2MB",
      });
      event.target.value = ""; // Reset the input
      setFileSelected(null);
      return;
    }

    setFileSelected(file);
  }

  async function onSubmitApplication(values: SpeakerApplicationValues) {
    try {
      setIsSubmitting(true);

      // Create form data to include the file
      const formData = new FormData();

      // Add all form values
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // Add the file if selected
      if (fileSelected) {
        formData.append("pdfAttachment", fileSelected);
      }

      // Send email notification with form data
      const emailResult = await sendSpeakerApplicationEmail(
        values,
        fileSelected
      );

      if (!emailResult.success) {
        throw new Error("Failed to send application email");
      }

      // Save to database
      const dbResult = await createSpeakerApplication(values);

      if (!dbResult.success) {
        console.error("Database save failed but email sent:", dbResult.error);
        // Continue with success message since the email was sent
      }

      // Show success toast using Sonner
      toast.success("Application Submitted", {
        description:
          "Thank you for your speaker application. We'll review it and get back to you soon.",
      });

      // Reset the form
      applicationForm.reset();
      setFileSelected(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Submission Error", {
        description:
          "There was an error submitting your application. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSubmitNomination(values: NominateSpeakerValues) {
    try {
      setIsSubmitting(true);

      // Send email notification with form data
      const emailResult = await sendSpeakerNominationEmail(values);

      if (!emailResult.success) {
        throw new Error("Failed to send nomination email");
      }

      // Save to database
      const dbResult = await createSpeakerNomination(values);

      if (!dbResult.success) {
        console.error("Database save failed but email sent:", dbResult.error);
        // Continue with success message since the email was sent
      }

      // Show success toast using Sonner
      toast.success("Nomination Submitted", {
        description:
          "Thank you for your speaker nomination. We'll review it and consider reaching out to them.",
      });

      // Reset the form
      nominationForm.reset();
    } catch (error) {
      console.error("Error submitting nomination:", error);
      toast.error("Submission Error", {
        description:
          "There was an error submitting your nomination. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Speaker Application Form
  if (formType === "application") {
    return (
      <Form {...applicationForm}>
        <form
          onSubmit={applicationForm.handleSubmit(onSubmitApplication)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Personal Information
            </h3>

            <FormField
              control={applicationForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="rehearsalAvailability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Will you be available in Beijing for rehearsals any time in
                    September through November? If not, when?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(for example, Yes - available September through November, or No - only available in December)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mobile Phone <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your mobile phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="wechatId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    WeChat ID <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your WeChat ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="priorTedTalk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Given TED or TEDx talk before?{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(for example, Yes - TEDxShanghai 2023)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Job <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your current job/position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={applicationForm.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Any additional information"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Your Idea</h3>

            <FormField
              control={applicationForm.control}
              name="ideaPresentation"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > 50;

                return (
                  <FormItem>
                    <FormLabel>
                      In 50 words, what is the idea you would like to present on
                      stage, and why should we want you to do that on ours?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your idea and why it matters..."
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "text-red-500 font-medium" : "text-muted-foreground"}`}
                      >
                        {wordCount}/50 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="commonBelief"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > 150;

                return (
                  <FormItem>
                    <FormLabel>
                      1. Regarding your talk, what is the common belief/behavior
                      that your talk will challenge, (Most People Think){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Most people think..."
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "text-red-500 font-medium" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="coreIdea"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > 150;

                return (
                  <FormItem>
                    <FormLabel>
                      2. But I believe [your core idea]{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="But I believe..."
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "text-red-500 font-medium" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="personalInsight"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > 150;

                return (
                  <FormItem>
                    <FormLabel>
                      3. I've learned this through [brief example or personal
                      insight] <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I've learned this through..."
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "text-red-500 font-medium" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={applicationForm.control}
              name="potentialImpact"
              render={({ field }) => {
                // Calculate word count
                const wordCount = field.value
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean).length;
                const isOverLimit = wordCount > 150;

                return (
                  <FormItem>
                    <FormLabel>
                      4. I believe if more people embraced this idea, it would
                      [benefit / impact / change]{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I believe if more people embraced this idea, it would..."
                        className={`min-h-[100px] ${isOverLimit ? "border-red-500" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <p
                        className={`text-xs ${isOverLimit ? "text-red-500 font-medium" : "text-muted-foreground"}`}
                      >
                        {wordCount}/150 words
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="space-y-2">
              <Label htmlFor="file-upload">
                Optional PDF Upload (CV, portfolio, etc.)
              </Label>
              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                {fileSelected
                  ? `Selected: ${fileSelected.name}`
                  : "No file selected"}
              </p>
            </div>

            <FormField
              control={applicationForm.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Optional URL (personal website, video of speech, etc.)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(for example, https://yourwebsite.com or https://youtube.com/yourvideo)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-500 flex-grow">
              * The selection committee will invite some candidates for
              audition. Others may not hear back.
            </p>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 whitespace-nowrap"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  // Nominate Speaker Form
  return (
    <Form {...nominationForm}>
      <form
        onSubmit={nominationForm.handleSubmit(onSubmitNomination)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Nominee Information
          </h3>

          <FormField
            control={nominationForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Full Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nominee's full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contact (phone, email) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, +86 123 456 7890 or name@email.com)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="priorTedTalk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Given TED or TEDx talk before?{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, No, or Yes at TEDxBeijing 2022)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Remarks <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, Expert in AI ethics with unique perspectives)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={nominationForm.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  URL (personal website, video of speech, etc.){" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(for example, https://linkedin.com/in/nominee or video URL)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center gap-2">
          <p className="text-sm text-gray-500 flex-grow">
            * The selection committee will invite some candidates for audition.
            Others may not hear back.
          </p>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 whitespace-nowrap"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Nomination"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
