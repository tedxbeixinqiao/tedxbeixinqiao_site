"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"

// Speaker Application schema with validation
const speakerApplicationSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name cannot exceed 30 words." }),
  availableInBeijing: z.string().min(2, { message: "Please provide availability information." })
    .max(30, { message: "Response cannot exceed 30 words." }),
  mobilePhone: z.string().min(5, { message: "Please provide a valid phone number." })
    .max(30, { message: "Phone number cannot exceed 30 characters." }),
  wechatId: z.string().min(2, { message: "Please provide your WeChat ID." })
    .max(30, { message: "WeChat ID cannot exceed 30 characters." }),
  priorTedTalk: z.string().min(2, { message: "Please answer if you've given a TED talk before." })
    .max(30, { message: "Response cannot exceed 30 words." }),
  job: z.string().min(2, { message: "Please provide your job information." })
    .max(30, { message: "Job information cannot exceed 30 words." }),
  gender: z.string().min(1, { message: "Please provide gender information." })
    .max(30, { message: "Response cannot exceed 30 words." }),
  remarks: z.string().max(30, { message: "Remarks cannot exceed 30 words." }).optional(),
  ideaPresentation: z.string().min(10, { message: "Please describe your idea in at least 10 words." })
    .max(50, { message: "Description cannot exceed 50 words." }),
  // Note: File upload would be handled separately in a real implementation
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.string().length(0)),
})

type SpeakerApplicationValues = z.infer<typeof speakerApplicationSchema>

// Nominate Speaker schema with validation
const nominateSpeakerSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name cannot exceed 30 words." }),
  contact: z.string().min(5, { message: "Please provide contact information." })
    .max(30, { message: "Contact information cannot exceed 30 words." }),
  priorTedTalk: z.string().min(2, { message: "Please answer if they've given a TED talk before." })
    .max(30, { message: "Response cannot exceed 30 words." }),
  remarks: z.string().min(2, { message: "Please provide some remarks." })
    .max(30, { message: "Remarks cannot exceed 30 words." }),
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.string().length(0)),
})

type NominateSpeakerValues = z.infer<typeof nominateSpeakerSchema>

interface SpeakerFormProps {
  formType: "application" | "nomination"
}

export function SpeakerApplicationForm({ formType }: SpeakerFormProps) {
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  // Speaker Application Form
  const applicationForm = useForm<SpeakerApplicationValues>({
    resolver: zodResolver(speakerApplicationSchema),
    defaultValues: {
      fullName: "",
      availableInBeijing: "",
      mobilePhone: "",
      wechatId: "",
      priorTedTalk: "",
      job: "",
      gender: "",
      remarks: "",
      ideaPresentation: "",
      websiteUrl: "",
    },
  })

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
  })

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setFileSelected(file);
  }

  function onSubmitApplication(values: SpeakerApplicationValues) {
    // Handle form submission - this would typically send data to an API
    console.log(values);
    console.log("File:", fileSelected);
    
    // Show success toast
    toast({
      title: "Application Submitted",
      description: "Thank you for your speaker application. We'll review it and get back to you soon.",
    });

    // Reset the form
    applicationForm.reset();
    setFileSelected(null);
  }

  function onSubmitNomination(values: NominateSpeakerValues) {
    // Handle form submission - this would typically send data to an API
    console.log(values);
    
    // Show success toast
    toast({
      title: "Nomination Submitted",
      description: "Thank you for your speaker nomination. We'll review it and consider reaching out to them.",
    });

    // Reset the form
    nominationForm.reset();
  }

  // Speaker Application Form
  if (formType === "application") {
    return (
      <Form {...applicationForm}>
        <form onSubmit={applicationForm.handleSubmit(onSubmitApplication)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
            
            <FormField
              control={applicationForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={applicationForm.control}
              name="availableInBeijing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available for auditions, rehearsals, show in Beijing? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Yes/No and details" {...field} />
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
                  <FormLabel>Mobile Phone <span className="text-red-500">*</span></FormLabel>
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
                  <FormLabel>WeChat ID <span className="text-red-500">*</span></FormLabel>
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
                  <FormLabel>Given TED or TEDx talk before? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Yes/No and details" {...field} />
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
                  <FormLabel>Job <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Your current job/position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={applicationForm.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Your gender" {...field} />
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
                    <Input placeholder="Any additional information" {...field} />
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In 50 words, what is the idea you would like to present on stage, and why should we want you to do that on ours? <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your idea and why it matters..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label htmlFor="file-upload">Optional PDF Upload (CV, portfolio, etc.)</Label>
              <Input 
                id="file-upload" 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                {fileSelected ? `Selected: ${fileSelected.name}` : "No file selected"}
              </p>
            </div>
            
            <FormField
              control={applicationForm.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optional URL (personal website, video of speech, etc.)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between items-center gap-2">
            <p className="text-sm text-gray-500 flex-grow">
              * The selection committee will invite some candidates for audition. Others may not hear back.
            </p>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 whitespace-nowrap">Submit Application</Button>
          </div>
        </form>
      </Form>
    )
  }
  
  // Nominate Speaker Form
  return (
    <Form {...nominationForm}>
      <form onSubmit={nominationForm.handleSubmit(onSubmitNomination)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Nominee Information</h3>
          
          <FormField
            control={nominationForm.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
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
                <FormLabel>Contact (phone, email) <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Nominee's contact information" {...field} />
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
                <FormLabel>Given TED or TEDx talk before? <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Yes/No and details" {...field} />
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
                <FormLabel>Remarks <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Why would they make a good speaker?" {...field} />
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
                <FormLabel>URL (personal website, video of speech, etc.) <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm text-gray-500 flex-grow">
            * The selection committee will invite some candidates for audition. Others may not hear back.
          </p>
          <Button type="submit" className="bg-red-600 hover:bg-red-700 whitespace-nowrap">Submit Nomination</Button>
        </div>
      </form>
    </Form>
  )
}