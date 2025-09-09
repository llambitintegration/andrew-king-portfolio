// Shared navigation types for consistent typing across all components
export type NavigationSection = "home" | "about" | "portfolio" | "consulting"

// Interface for navigation components
export interface NavigationProps {
  currentSection: NavigationSection
  onSectionChange: (section: NavigationSection) => void
  className?: string
}

// Interface for components that only need section change handler
export interface SectionChangeProps {
  onSectionChange: (section: NavigationSection) => void
}
