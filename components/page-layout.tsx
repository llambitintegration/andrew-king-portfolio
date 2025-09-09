"use client"

import type { ReactNode } from "react"

interface PageLayoutProps {
  topRibbon: ReactNode
  children: ReactNode
  bottomRibbon?: ReactNode
  className?: string
}

export default function PageLayout({ topRibbon, children, bottomRibbon, className = "" }: PageLayoutProps) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Top Ribbon - only render if provided */}
      {topRibbon && <div className="flex-shrink-0 z-30">{topRibbon}</div>}

      {/* Page Content - takes remaining space and centers content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">{children}</div>
      </div>

      {/* Bottom Ribbon */}
      {bottomRibbon && <div className="flex-shrink-0 pb-4 md:pb-8">{bottomRibbon}</div>}
    </div>
  )
}
