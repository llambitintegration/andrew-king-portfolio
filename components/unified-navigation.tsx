"use client"

import type { NavigationProps, NavigationSection } from "@/types/navigation"

interface UnifiedNavigationProps extends NavigationProps {
  variant?: "homepage" | "standard"
  showHome?: boolean
}

export default function UnifiedNavigation({
  currentSection,
  onSectionChange,
  variant = "standard",
  showHome = true,
  className = "",
}: UnifiedNavigationProps) {
  const allNavigationItems = [
    { key: "home" as NavigationSection, label: "Home" },
    { key: "about" as NavigationSection, label: "About Me" },
    { key: "portfolio" as NavigationSection, label: "Portfolio" },
    { key: "consulting" as NavigationSection, label: "Consulting" },
  ]

  // Filter items based on current section and variant
  const navigationItems = allNavigationItems.filter((item) => {
    // Always exclude current section
    if (item.key === currentSection) return false
    
    // For homepage variant, exclude home button
    if (variant === "homepage" && item.key === "home") return false
    
    // For standard variant, optionally include home
    if (variant === "standard" && item.key === "home" && !showHome) return false
    
    return true
  })

  // Base button classes with the standardized teal style from homepage
  const baseButtonClasses = "px-3 md:px-4 py-2 rounded-full bg-teal-600/20 border border-teal-400/30 text-teal-200 font-normal text-xs hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200"

  if (variant === "homepage") {
    return (
      <div className={`flex gap-2 md:gap-3 flex-wrap ${className}`}>
        {navigationItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSectionChange(item.key)}
            className={baseButtonClasses}
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  }

  // Standard variant with centered container
  return (
    <div className={`flex gap-3 justify-center flex-wrap px-4 ${className}`}>
      <div className="flex gap-3 justify-center bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20 max-w-fit mx-auto">
        {navigationItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onSectionChange(item.key)}
            className={baseButtonClasses}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
