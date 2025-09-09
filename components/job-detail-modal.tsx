"use client"

import type { ProfessionalExperience } from "@/types/resume"

interface JobDetailModalProps {
  job: ProfessionalExperience
  isOpen: boolean
  onClose: () => void
}

export default function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        className="bg-gray-900/85 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 animate-modal-enter"
        style={{ filter: "url(#glass-effect)" }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-medium text-white mb-2">Professional Details</h3>
            <h4 className="text-xl font-medium text-teal-300 mb-2">{job.position}</h4>
            <p className="text-teal-300 text-lg">
              {job.company} • {job.location}
            </p>
            {job.duration && <p className="text-white/70 text-sm mt-1">{job.duration}</p>}
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-teal-300 mb-3">Key Responsibilities</h4>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="text-white/80 text-sm flex items-start">
                  <span className="text-teal-400 mr-2">•</span>
                  {resp}
                </li>
              ))}
            </ul>
          </div>


          {job.relevantSkills && (
            <div>
              <h4 className="text-lg font-medium text-teal-300 mb-3">Relevant Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.relevantSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-teal-600/20 text-teal-200 px-3 py-1 rounded-full border border-teal-400/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/20">
          <button
            onClick={onClose}
            className="w-full py-3 bg-teal-600/20 hover:bg-teal-600/30 text-teal-200 rounded-lg transition-colors duration-200 border border-teal-400/30"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )
}
