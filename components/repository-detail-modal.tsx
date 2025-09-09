"use client"

import { useState, useEffect } from "react"
import type { GitHubRepository } from "@/types/github"
import { formatRepoDate, getRepoLanguageColor, getRepositoryReadme } from "@/lib/github"

interface RepositoryDetailModalProps {
  repository: GitHubRepository
  isOpen: boolean
  onClose: () => void
}

export default function RepositoryDetailModal({ repository, isOpen, onClose }: RepositoryDetailModalProps) {
  const [readme, setReadme] = useState<string | null>(null)
  const [readmeLoading, setReadmeLoading] = useState(false)

  useEffect(() => {
    if (isOpen && repository) {
      const fetchReadme = async () => {
        setReadmeLoading(true)
        const readmeContent = await getRepositoryReadme(repository.owner.login, repository.name)
        setReadme(readmeContent)
        setReadmeLoading(false)
      }
      
      fetchReadme()
    }
  }, [isOpen, repository])

  if (!isOpen) return null

  const handleViewRepo = () => {
    window.open(repository.html_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 animate-modal-enter"
        style={{ filter: "url(#glass-effect)" }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-medium text-white mb-2">Repository Details</h3>
            <h4 className="text-xl font-medium text-teal-300 mb-2">{repository.name}</h4>
            <p className="text-white/70 text-sm">
              {repository.owner.login} • Created {formatRepoDate(repository.created_at)}
            </p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="space-y-6">
          {repository.description && (
            <div>
              <h4 className="text-lg font-medium text-teal-300 mb-3">Description</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {repository.description}
              </p>
            </div>
          )}

          {(readme || readmeLoading) && (
            <div>
              <h4 className="text-lg font-medium text-teal-300 mb-3">About</h4>
              {readmeLoading ? (
                <div className="text-white/60 text-sm">Loading README...</div>
              ) : readme ? (
                <div className="text-white/80 text-sm leading-relaxed bg-gray-800/20 rounded-lg p-3">
                  {readme}
                </div>
              ) : (
                <div className="text-white/60 text-sm">No README available</div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/20 rounded-lg p-4">
              <h5 className="text-teal-300 font-medium mb-2">Repository Stats</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Stars</span>
                  <span className="text-white">{repository.stargazers_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Forks</span>
                  <span className="text-white">{repository.forks_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Size</span>
                  <span className="text-white">{Math.round(repository.size / 1024)} MB</span>
                </div>
                {repository.open_issues_count !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Open Issues</span>
                    <span className="text-white">{repository.open_issues_count}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800/20 rounded-lg p-4">
              <h5 className="text-teal-300 font-medium mb-2">Repository Info</h5>
              <div className="space-y-2 text-sm">
                {repository.language && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Language</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getRepoLanguageColor(repository.language) }}
                      />
                      <span className="text-white">{repository.language}</span>
                    </div>
                  </div>
                )}
                {repository.license && (
                  <div className="flex justify-between">
                    <span className="text-white/70">License</span>
                    <span className="text-white">{repository.license.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/70">Last Updated</span>
                  <span className="text-white">{formatRepoDate(repository.updated_at)}</span>
                </div>
                {repository.default_branch && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Default Branch</span>
                    <span className="text-white">{repository.default_branch}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {repository.topics && repository.topics.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-teal-300 mb-3">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {repository.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="text-xs bg-teal-600/20 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 flex gap-3">
          <button
            onClick={handleViewRepo}
            className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            View Repository
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-600/20 hover:bg-gray-600/30 text-white rounded-lg transition-colors duration-200 border border-gray-400/30"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}