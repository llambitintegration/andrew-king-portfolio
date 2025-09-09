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
  professionalSummary: z.object({
    headline: z.string(),
    description: z.string(),
    keyStrengths: z.array(z.string()),
  }),
  coreCompetencies: z.object({
    primarySkills: z.array(z.object({
      category: z.string(),
      skills: z.array(z.string()),
    })),
    additionalSkills: z.array(z.string()),
  }),
  professionalExperience: z.array(z.object({
    position: z.string(),
    company: z.string(),
    location: z.string(),
    duration: z.string(),
    responsibilities: z.array(z.string()),
    relevantSkills: z.array(z.string()).optional(),
  })),
  education: z.object({
    degree: z.string(),
    major: z.string(),
    minor: z.string(),
    institution: z.string(),
    graduationYear: z.string(),
    relevantCoursework: z.array(z.string()),
  }),
  keyAchievements: z.array(z.string()),
  languages: z.array(z.object({
    language: z.string(),
    proficiency: z.string(),
    skills: z.array(z.string()),
  })),
  technicalSkills: z.object({
    softwareProficiency: z.array(z.object({
      category: z.string(),
      applications: z.array(z.string()),
      proficiencyLevel: z.string(),
    })),
    administrativeSkills: z.array(z.string()),
  }),
  personalQualities: z.array(z.object({
    quality: z.string(),
    description: z.string(),
  })),
})

export type Resume = z.infer<typeof ResumeSchema>
export type ProfessionalExperience = Resume['professionalExperience'][0]
export type CoreCompetency = Resume['coreCompetencies']['primarySkills'][0]
export type Language = Resume['languages'][0]
export type TechnicalSkillCategory = Resume['technicalSkills']['softwareProficiency'][0]
export type PersonalQuality = Resume['personalQualities'][0]
