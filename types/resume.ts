import { z } from "zod"

export const ResumeSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    title: z.string(),
    subtitle: z.string(),
    location: z.object({
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      fullLocation: z.string(),
    }),
    contact: z.object({
      email: z.string(),
      phone: z.string(),
      phoneFormatted: z.string(),
    }),
    tagline: z.string(),
    availability: z.string(),
  }),
  coreCompetencies: z.object({
    primarySkills: z.array(
      z.object({
        category: z.string(),
        skills: z.array(z.string()),
      }),
    ),
    additionalSkills: z.array(z.string()),
  }),
  professionalExperience: z.array(
    z.object({
      position: z.string(),
      company: z.string(),
      location: z.string(),
      duration: z.string(),
      responsibilities: z.array(z.string()),
      relevantSkills: z.array(z.string()).optional(),
      media: z
        .union([
          z.object({
            kind: z.literal("youtube"),
            videoId: z.string(),
            title: z.string(),
            caption: z.string().optional(),
          }),
          z.object({
            kind: z.literal("video"),
            src: z.string(),
            title: z.string(),
            caption: z.string().optional(),
            poster: z.string().optional(),
          }),
        ])
        .optional(),
      gallery: z
        .array(
          z.object({
            src: z.string(),
            alt: z.string(),
            caption: z.string().optional(),
            href: z.string().optional(),
          }),
        )
        .optional(),
      videos: z
        .array(
          z.object({
            src: z.string(),
            title: z.string().optional(),
            caption: z.string().optional(),
            poster: z.string().optional(),
          }),
        )
        .optional(),
    }),
  ),
  education: z.object({
    degree: z.string(),
    major: z.string(),
    minor: z.string(),
    institution: z.string(),
    graduationYear: z.string(),
  }),
})

export type Resume = z.infer<typeof ResumeSchema>
export type ProfessionalExperience = Resume["professionalExperience"][0]
export type CoreCompetency = Resume["coreCompetencies"]["primarySkills"][0]
