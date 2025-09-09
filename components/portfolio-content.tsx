"use client"

import Image from "next/image"
import { useState } from "react"
import JobDetailModal from "./job-detail-modal"
import PageLayout from "./page-layout"
import UnifiedNavigation from "./unified-navigation"
import { getResume } from "@/lib/getResume"
import type { ProfessionalExperience } from "@/types/resume"
import type { NavigationSection } from "@/types/navigation"

interface PortfolioContentProps {
  currentSection: NavigationSection
  onSectionChange: (section: NavigationSection) => void
}

export default function PortfolioContent({ currentSection, onSectionChange }: PortfolioContentProps) {
  const resume = getResume()
  const [selectedJob, setSelectedJob] = useState<ProfessionalExperience | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const openJobModal = (job: ProfessionalExperience) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const closeJobModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  const handleSectionChange = (section: NavigationSection) => {
    setIsTransitioning(true)
    setTimeout(() => {
      onSectionChange(section)
      setIsTransitioning(false)
    }, 300)
  }

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
                  Bilingual Administrative Professional specializing in legal support, client relations, and office
                  operations. 12+ years of experience with expertise in document management and confidential information
                  handling.
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
          <div className="flex-shrink-0 flex items-center justify-center w-full md:w-1/3 px-2 md:px-4">
            <div className="relative w-full max-w-xs md:max-w-none">
              <div
                className="w-full aspect-square max-w-xs md:max-w-none relative rounded-2xl overflow-hidden"
                style={{ filter: "url(#glass-effect)" }}
              >
                <Image
                  src="/images/andrew-headshot.jpg"
                  alt="Andrew King"
                  fill
                  className="object-cover object-center"
                  style={{ objectPosition: "50% 30%" }}
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
          <div className="max-w-4xl mx-auto text-white h-full flex flex-col">
            <div className="text-center mb-4 md:mb-6 flex-shrink-0">
              <h2 className="text-xl md:text-3xl font-light mb-2">
                <span className="font-medium italic instrument">Professional</span> Portfolio
              </h2>
              <p className="text-white/70 text-xs md:text-sm">{resume.personalInfo.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-1 min-h-0">
              <div className="md:col-span-2 flex flex-col min-h-0 order-1 md:order-none">
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 md:p-6 flex-1 flex flex-col min-h-0">
                  <h3 className="text-lg md:text-xl font-medium text-teal-300 mb-3 md:mb-4 flex-shrink-0">
                    Professional Experience
                  </h3>
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 md:space-y-6 pr-2 min-h-0">
                    {resume.professionalExperience.map((job, index) => (
                      <div key={index} className="border-l-2 border-teal-400/30 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{job.position}</h4>
                            <p className="text-teal-300 text-sm">
                              {job.company} • {job.location}
                            </p>
                            {job.duration && <p className="text-white/60 text-xs">{job.duration}</p>}
                          </div>
                          <button
                            onClick={() => openJobModal(job)}
                            className="ml-4 px-3 py-1 bg-teal-600/20 hover:bg-teal-600/30 text-teal-200 text-xs rounded-full border border-teal-400/30 transition-colors duration-200 flex-shrink-0"
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

                <div className="hidden md:block bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 md:p-6 mt-4 md:mt-6 flex-shrink-0">
                  <h3 className="text-lg md:text-xl font-medium text-teal-300 mb-4">Education</h3>
                  <div className="border-l-2 border-teal-400/30 pl-4">
                    <h4 className="font-medium text-white">{resume.education.degree}</h4>
                    <p className="text-teal-300 text-sm">{resume.education.major}</p>
                    <p className="text-white/70 text-sm">
                      {resume.education.institution} • {resume.education.graduationYear}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4 md:space-y-6 min-h-0 order-2 md:order-none">
                <div className="block md:hidden bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 flex-shrink-0">
                  <h3 className="text-lg font-medium text-teal-300 mb-4">Education</h3>
                  <div className="border-l-2 border-teal-400/30 pl-4">
                    <h4 className="font-medium text-white">{resume.education.degree}</h4>
                    <p className="text-teal-300 text-sm">{resume.education.major}</p>
                    <p className="text-white/70 text-sm">
                      {resume.education.institution} • {resume.education.graduationYear}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 md:p-6 flex-shrink-0">
                  <h3 className="text-lg md:text-xl font-medium text-teal-300 mb-4">Contact</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-white/70">{resume.personalInfo.location.fullLocation}</p>
                    <p className="text-white/70">{resume.personalInfo.contact.phoneFormatted}</p>
                    <p className="text-white/70">{resume.personalInfo.contact.email}</p>
                  </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 md:p-6 flex-shrink-0">
                  <h3 className="text-lg md:text-xl font-medium text-teal-300 mb-4">Languages</h3>
                  <div className="space-y-2">
                    {resume.languages.map((lang, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-white">{lang.language}</span>
                        <span className="text-white/70">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 md:p-6 flex-shrink-0">
                  <h3 className="text-lg md:text-xl font-medium text-teal-300 mb-4">Key Strengths</h3>
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

            {selectedJob && <JobDetailModal job={selectedJob} isOpen={isModalOpen} onClose={closeJobModal} />}
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
              Bridging traditional administrative excellence with modern AI technology. Available for consulting and
              contracting work to help businesses integrate AI solutions into their administrative and legal support
              operations.
            </p>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 md:p-8 space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <h3 className="font-medium text-teal-300 mb-2 md:mb-3 text-sm md:text-base">Consulting Services</h3>
                <div className="grid gap-3 md:gap-4 text-left">
                  <div className="bg-gray-800/40 rounded-lg p-3 md:p-4">
                    <h4 className="font-medium text-white mb-2 text-sm md:text-base">Administrative AI Integration</h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      Streamline document management, scheduling, and data entry processes using AI tools and
                      automation.
                    </p>
                  </div>
                  <div className="bg-gray-800/40 rounded-lg p-3 md:p-4">
                    <h4 className="font-medium text-white mb-2 text-sm md:text-base">Legal Support Automation</h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      Implement AI solutions for legal document processing, client communication, and case management
                      systems.
                    </p>
                  </div>
                  <div className="bg-gray-800/40 rounded-lg p-3 md:p-4">
                    <h4 className="font-medium text-white mb-2 text-sm md:text-base">Bilingual AI Solutions</h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      Develop multilingual AI workflows for English-Spanish business operations and client
                      communications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 md:pt-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="text-left">
                    <h3 className="font-medium text-teal-300 mb-2 text-sm md:text-base">Email</h3>
                    <p className="text-white/80 text-xs md:text-sm">{resume.personalInfo.contact.email}</p>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-teal-300 mb-2 text-sm md:text-base">Phone</h3>
                    <p className="text-white/80 text-xs md:text-sm">{resume.personalInfo.contact.phoneFormatted}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">
                  AI Integration
                </span>
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">
                  Process Automation
                </span>
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">
                  Bilingual Solutions
                </span>
                <span className="text-xs bg-teal-600/20 text-teal-200 px-2 md:px-3 py-1 rounded-full">Legal Tech</span>
              </div>
            </div>
          </div>
        </main>
      </PageLayout>
    )
  }

  return null
}
