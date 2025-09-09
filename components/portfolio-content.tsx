"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import JobDetailModal from "./job-detail-modal"
import RepositoryDetailModal from "./repository-detail-modal"
import PageLayout from "./page-layout"
import UnifiedNavigation from "./unified-navigation"
import { getResume } from "@/lib/getResume"
import { getGitHubRepositories, formatRepoDate, getRepoLanguageColor } from "@/lib/github"
import type { ProfessionalExperience } from "@/types/resume"
import type { NavigationSection } from "@/types/navigation"
import type { GitHubRepository } from "@/types/github"

interface PortfolioContentProps {
  currentSection: NavigationSection
  onSectionChange: (section: NavigationSection) => void
}

export default function PortfolioContent({ currentSection, onSectionChange }: PortfolioContentProps) {
  const resume = getResume()
  const [selectedJob, setSelectedJob] = useState<ProfessionalExperience | null>(null)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepository | null>(null)
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false)
  const [repositories, setRepositories] = useState<GitHubRepository[]>([])
  const [repositoriesLoading, setRepositoriesLoading] = useState(true)
  const [repositoriesError, setRepositoriesError] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const openJobModal = (job: ProfessionalExperience) => {
    setSelectedJob(job)
    setIsJobModalOpen(true)
  }

  const closeJobModal = () => {
    setIsJobModalOpen(false)
    setSelectedJob(null)
  }

  const openRepoModal = (repository: GitHubRepository) => {
    setSelectedRepository(repository)
    setIsRepoModalOpen(true)
  }

  const closeRepoModal = () => {
    setIsRepoModalOpen(false)
    setSelectedRepository(null)
  }

  const handleSectionChange = (section: NavigationSection) => {
    setIsTransitioning(true)
    setTimeout(() => {
      onSectionChange(section)
      setIsTransitioning(false)
    }, 300)
  }

  // Fetch GitHub repositories on component mount
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setRepositoriesLoading(true)
        const { repositories: repos, error } = await getGitHubRepositories()
        if (error) {
          setRepositoriesError(error)
        } else {
          setRepositories(repos)
          setRepositoriesError(null)
        }
      } catch (err) {
        setRepositoriesError('Failed to load repositories')
      } finally {
        setRepositoriesLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  if (currentSection === "home") {
    return (
      <div className="h-full flex flex-col">
        {/* Content takes full space with bottom-left positioned content */}
        <div className="flex-1 relative">
          <main
            role="main"
            className={`absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20 max-w-xs md:max-w-lg transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <div className="text-left space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl lg:leading-16 tracking-tight font-light text-white">
                  <button
                    onClick={() => handleSectionChange("home")}
                    className="hover:text-teal-200 transition-colors duration-200 text-left"
                    data-testid="andrew-name-button"
                  >
                    <span className="font-medium italic instrument">Andrew</span> King
                    <br />
                    <span className="font-light tracking-tight text-white">Portfolio</span>
                  </button>
                </h1>

                <p className="text-xs font-light text-white/70 leading-relaxed max-w-xs md:max-w-md">
                  {resume.professionalSummary.description}
                </p>
              </div>

              <div className="pt-3 md:pt-4">
                <UnifiedNavigation
                  variant="homepage"
                  currentSection={currentSection}
                  onSectionChange={handleSectionChange}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (currentSection === "about") {
    return (
      <PageLayout
        topRibbon={null}
        bottomRibbon={
          <UnifiedNavigation variant="standard" currentSection="about" onSectionChange={handleSectionChange} />
        }
      >
        <main
          role="main"
          className={`w-full h-full flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6 transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          <div className="flex-shrink-0 flex items-center justify-center w-full px-2 md:px-4">
            <div className="relative w-full max-w-md md:max-w-lg">
              <div
                className="w-full aspect-square max-w-md md:max-w-lg relative rounded-2xl overflow-hidden"
                style={{ filter: "url(#glass-effect)", objectFit: "cover" }}
              >
                <Image
                  src="/images/andrew-headshot.jpg"
                  alt="Andrew King"
                  fill
                  className="object-cover object-center"
                  style={{ objectPosition: "50% 20%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="w-full h-full overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
              <div className="text-white space-y-4 md:space-y-6 py-4">
                <h2 className="text-2xl md:text-4xl font-light mb-3 md:mb-4">
                  <span className="font-medium italic instrument">About</span> Me
                </h2>

                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                  {resume.professionalSummary.description}
                </p>

                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-medium text-teal-300">Core Expertise</h3>
                  <div className="grid gap-2 md:gap-3">
                    {resume.coreCompetencies.primarySkills.map((skill, index) => (
                      <div key={index} className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-3 md:p-4">
                        <h4 className="font-medium text-white mb-2 text-sm md:text-base">{skill.category}</h4>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {skill.skills.map((item, i) => (
                            <span key={i} className="text-xs bg-teal-600/20 text-teal-200 px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
    )
  }

  if (currentSection === "portfolio") {
    return (
      <PageLayout
        topRibbon={null}
        bottomRibbon={
          <UnifiedNavigation variant="standard" currentSection="portfolio" onSectionChange={handleSectionChange} />
        }
      >
        <main
          role="main"
          className={`w-full h-full p-4 md:p-6 transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          <div className="max-w-4xl mx-auto text-white h-full overflow-y-auto custom-scrollbar flex flex-col">
            <div className="text-center mb-4 lg:mb-6 flex-shrink-0">
              <h2 className="text-xl lg:text-3xl font-light mb-2">
                <span className="font-medium italic instrument">Professional</span> Portfolio
              </h2>
              <p className="text-white/70 text-xs lg:text-sm">{resume.personalInfo.title}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 flex-1">
              <div className="w-full lg:flex-[2] flex flex-col space-y-4 lg:space-y-6 order-1">
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-medium text-teal-300 mb-3 lg:mb-4">
                    Professional Experience
                  </h3>
                  <div className="space-y-4 lg:space-y-6">
                    {resume.professionalExperience.map((job, index) => (
                      <div key={index} className="border-l-2 border-teal-400/30 pl-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white">{job.position}</h4>
                            <p className="text-teal-300 text-sm">
                              {job.company} • {job.location}
                            </p>
                            {job.duration && <p className="text-white/60 text-xs">{job.duration}</p>}
                          </div>
                          <button
                            onClick={() => openJobModal(job)}
                            className="sm:ml-4 px-3 py-1 bg-teal-600/20 hover:bg-teal-600/30 text-teal-200 text-xs rounded-full border border-teal-400/30 transition-colors duration-200 flex-shrink-0 self-start"
                          >
                            View Details
                          </button>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {job.responsibilities.slice(0, 2).map((resp, i) => (
                            <li key={i} className="text-white/70 text-sm">
                              • {resp}
                            </li>
                          ))}
                          {job.responsibilities.length > 2 && (
                            <li className="text-teal-300 text-sm italic">
                              + {job.responsibilities.length - 2} more responsibilities...
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* GitHub Repositories Section */}
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-medium text-teal-300 mb-3 lg:mb-4">
                    GitHub Repositories
                  </h3>
                  <div className="space-y-4 max-h-64 lg:max-h-80 overflow-y-auto custom-scrollbar pr-2">
                    {repositoriesLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-white/60 text-sm">Loading repositories...</div>
                      </div>
                    ) : repositoriesError ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-red-400 text-sm">{repositoriesError}</div>
                      </div>
                    ) : repositories.length === 0 ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-white/60 text-sm">No repositories found</div>
                      </div>
                    ) : (
                      repositories.slice(0, 6).map((repo) => (
                        <div key={repo.id} className="border-l-2 border-teal-400/30 pl-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white">{repo.name}</h4>
                              <p className="text-teal-300 text-sm">
                                {repo.language && (
                                  <span className="inline-flex items-center gap-1">
                                    <div 
                                      className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: getRepoLanguageColor(repo.language) }}
                                    />
                                    {repo.language}
                                  </span>
                                )}
                                {repo.language && ' • '}
                                ⭐ {repo.stargazers_count}
                              </p>
                              <p className="text-white/60 text-xs">
                                Updated {formatRepoDate(repo.updated_at)}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:ml-4 sm:flex-shrink-0">
                              <button
                                onClick={() => openRepoModal(repo)}
                                className="px-3 py-1 bg-teal-600/20 hover:bg-teal-600/30 text-teal-200 text-xs rounded-full border border-teal-400/30 transition-colors duration-200 flex-shrink-0"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => window.open(repo.html_url, '_blank', 'noopener,noreferrer')}
                                className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 text-xs rounded-full border border-blue-400/30 transition-colors duration-200 flex-shrink-0"
                              >
                                View Repo
                              </button>
                            </div>
                          </div>
                          {repo.description && (
                            <p className="text-white/70 text-sm mt-2 line-clamp-2">
                              {repo.description}
                            </p>
                          )}
                          {repo.topics && repo.topics.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {repo.topics.slice(0, 3).map((topic) => (
                                <span key={topic} className="text-xs bg-gray-600/30 text-gray-300 px-2 py-0.5 rounded">
                                  {topic}
                                </span>
                              ))}
                              {repo.topics.length > 3 && (
                                <span className="text-xs text-gray-400">
                                  +{repo.topics.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              <div className="w-full lg:flex-[1] flex flex-col space-y-4 lg:space-y-6 order-2">
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-medium text-teal-300 mb-4">Education</h3>
                  <div className="border-l-2 border-teal-400/30 pl-4">
                    <h4 className="font-medium text-white">{resume.education.degree}</h4>
                    <p className="text-teal-300 text-sm">{resume.education.major}</p>
                    <p className="text-white/70 text-sm">
                      {resume.education.institution} • {resume.education.graduationYear}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 lg:p-6 flex-shrink-0">
                  <h3 className="text-lg lg:text-xl font-medium text-teal-300 mb-4">Contact</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-teal-300 font-medium sm:w-20 flex-shrink-0">Location:</span>
                      <span className="text-white/70">{resume.personalInfo.location.fullLocation}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-teal-300 font-medium sm:w-20 flex-shrink-0">Phone:</span>
                      <span className="text-white/70">{resume.personalInfo.contact.phoneFormatted}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-teal-300 font-medium sm:w-20 flex-shrink-0">Email:</span>
                      <span className="text-white/70 break-all">{resume.personalInfo.contact.email}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 lg:p-6 flex-shrink-0">
                  <h3 className="text-lg lg:text-xl font-medium text-teal-300 mb-4">Languages</h3>
                  <div className="space-y-3">
                    {resume.languages.map((lang, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 text-sm">
                        <span className="text-white font-medium">{lang.language}</span>
                        <span className="text-white/70 sm:text-right">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 lg:p-6 flex-shrink-0">
                  <h3 className="text-lg lg:text-xl font-medium text-teal-300 mb-4">Key Strengths</h3>
                  <div className="space-y-2">
                    {resume.professionalSummary.keyStrengths.map((strength, index) => (
                      <div key={index} className="text-xs bg-teal-600/20 text-teal-200 px-2 py-1 rounded">
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedJob && <JobDetailModal job={selectedJob} isOpen={isJobModalOpen} onClose={closeJobModal} />}
            {selectedRepository && <RepositoryDetailModal repository={selectedRepository} isOpen={isRepoModalOpen} onClose={closeRepoModal} />}
          </div>
        </main>
      </PageLayout>
    )
  }

  if (currentSection === "consulting") {
    return (
      <PageLayout
        topRibbon={null}
        bottomRibbon={
          <UnifiedNavigation variant="standard" currentSection="consulting" onSectionChange={handleSectionChange} />
        }
      >
        <main
          role="main"
          className={`w-full h-full flex items-center justify-center p-4 md:p-6 transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          <div className="max-w-2xl mx-auto text-center text-white space-y-3 md:space-y-6 max-h-full overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl md:text-4xl font-light mb-3 md:mb-4">
              <span className="font-medium italic instrument">Consulting</span> Services
            </h2>

            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              Experienced AI/ML engineer specializing in industrial robotics and intelligent automation systems. Available for consulting and
              contracting work to help businesses integrate cutting-edge AI/ML solutions into their manufacturing and automation
              operations.
            </p>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 md:p-8 space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-medium text-teal-300 mb-2 md:mb-3 text-sm md:text-base">Consulting Services</h3>
                <div className="grid gap-3 md:gap-4 text-left">
                  <div className="bg-gray-800/40 rounded-lg p-3 md:p-4">
                    <h4 className="font-medium text-white mb-2 text-sm md:text-base">AI/ML Systems Development</h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      Design and implement turn-key Machine Learning solutions using Python/FastAPI, TensorFlow, PyTorch, and modern AI frameworks for enterprise automation platforms.
                    </p>
                  </div>
                  <div className="bg-gray-800/40 rounded-lg p-3 md:p-4">
                    <h4 className="font-medium text-white mb-2 text-sm md:text-base">Industrial Robotics & Automation</h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      Integrate collaborative robotics, PLC programming, and vision systems using FANUC, KUKA, Universal Robots, and Allen Bradley platforms.
                    </p>
                  </div>
                  <div className="bg-gray-800/40 rounded-lg p-3 md:p-4">
                    <h4 className="font-medium text-white mb-2 text-sm md:text-base">Full Stack Development & Cloud</h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      Build complete solutions from database architecture to frontend interfaces using React/TypeScript, PostgreSQL, Docker, and Azure cloud technologies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 md:pt-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="text-left">
                    <h3 className="font-medium text-teal-300 mb-2 text-sm md:text-base">Email</h3>
                    <p className="text-white/80 text-xs md:text-sm">info@llambit.io</p>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-teal-300 mb-2 text-sm md:text-base">Phone</h3>
                    <p className="text-white/80 text-xs md:text-sm">On Request</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 md:pt-6">
                <div className="text-center space-y-3">
                  <h3 className="font-medium text-teal-300 mb-3 text-sm md:text-base">Client Portal</h3>
                  <p className="text-white/70 text-xs md:text-sm mb-4">
                    Register for an account to access project tracking, documentation, and direct communication channels.
                  </p>
                  <button
                    onClick={() => alert('Registration coming soon! Contact info@llambit.io to get started.')}
                    className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 rounded-lg transition-colors duration-200 border border-blue-400/30 font-medium text-sm"
                  >
                    Register for Account
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">
                  AI/ML Development
                </span>
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">
                  Industrial Robotics
                </span>
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">
                  Automation Systems
                </span>
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">Full Stack</span>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
    )
  }

  return null
}
