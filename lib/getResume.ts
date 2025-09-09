import rawResume from "@/data/resume.json"
import { ResumeSchema, type Resume } from "@/types/resume"

let cached: Resume | null = null

export function getResume(): Resume {
  if (cached) return cached
  
  const parsed = ResumeSchema.safeParse(rawResume)
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Resume JSON validation failed:", parsed.error.format())
    }
    throw new Error("Invalid resume.json structure")
  }
  
  cached = parsed.data
  return cached
}

// Helper function to reset cache for testing
export function resetResumeCache(): void {
  cached = null
}
