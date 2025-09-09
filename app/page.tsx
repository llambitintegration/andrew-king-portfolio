"use client"

import { useState } from "react"
import Header from "@/components/header"
import PortfolioContent from "@/components/portfolio-content"
import FooterBranding from "@/components/footer-branding"
import ShaderBackground from "@/components/shader-background"
import ErrorBoundary from "@/components/error-boundary"
import type { NavigationSection } from "@/types/navigation"

export default function DianaPortfolio() {
  const [currentSection, setCurrentSection] = useState<NavigationSection>("home")

  return (
    <ErrorBoundary>
      <ShaderBackground>
        <div className="h-screen flex flex-col overflow-hidden">
          <Header onSectionChange={setCurrentSection} currentSection={currentSection} />
          <div className="flex-1 overflow-hidden">
            <PortfolioContent currentSection={currentSection} onSectionChange={setCurrentSection} />
          </div>
          <FooterBranding />
        </div>
      </ShaderBackground>
    </ErrorBoundary>
  )
}
