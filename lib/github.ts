import { GitHubRepositorySchema, type GitHubRepository, type GitHubApiResponse } from '@/types/github'

const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_USERNAME = 'llambitintegration'

// Cache for repositories to avoid excessive API calls
let repositoriesCache: GitHubRepository[] | null = null
let cacheTimestamp: number | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getGitHubRepositories(): Promise<GitHubApiResponse> {
  try {
    // Check if we have valid cached data
    if (repositoriesCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      return { repositories: repositoriesCache }
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'Portfolio-Website/1.0',
        // Add token if available in environment (optional for public repos)
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    // Validate and parse the response
    const repositories = data.map((repo: any) => {
      const parsed = GitHubRepositorySchema.safeParse(repo)
      if (!parsed.success) {
        console.warn('Failed to parse repository data:', parsed.error.format())
        return null
      }
      return parsed.data
    }).filter(Boolean) as GitHubRepository[]

    // Filter out forks and archived repos, prioritize active projects
    const filteredRepositories = repositories
      .filter(repo => !repo.fork && !repo.archived)
      .sort((a, b) => {
        // Sort by stars first, then by last updated
        if (a.stargazers_count !== b.stargazers_count) {
          return b.stargazers_count - a.stargazers_count
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      })

    // Cache the results
    repositoriesCache = filteredRepositories
    cacheTimestamp = Date.now()

    return { repositories: filteredRepositories }
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    return { 
      repositories: [], 
      error: error instanceof Error ? error.message : 'Failed to fetch repositories' 
    }
  }
}

export function formatRepoDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export function getRepoLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'HTML': '#e34c26',
    'CSS': '#1572B6',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Swift': '#fa7343',
    'Kotlin': '#A97BFF',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
  }
  
  return colors[language || ''] || '#8b949e'
}