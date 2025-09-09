import { z } from "zod"

export const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  size: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  private: z.boolean(),
  fork: z.boolean(),
  archived: z.boolean(),
  topics: z.array(z.string()).optional(),
  owner: z.object({
    login: z.string(),
    id: z.number(),
    avatar_url: z.string(),
    html_url: z.string(),
    type: z.string(),
  }),
  default_branch: z.string().optional(),
  open_issues_count: z.number().optional(),
  license: z.object({
    key: z.string(),
    name: z.string(),
    spdx_id: z.string(),
  }).nullable().optional(),
})

export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>

export interface GitHubApiResponse {
  repositories: GitHubRepository[]
  error?: string
}