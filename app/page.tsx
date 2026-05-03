import ErrorBoundary from "@/components/error-boundary"
import PortfolioPage from "@/components/portfolio-page"

export default function Page() {
  return (
    <ErrorBoundary>
      <div className="ak-bg" aria-hidden />
      <div className="ak-scrim" aria-hidden />
      <div className="ak-grain" aria-hidden />
      <PortfolioPage />
    </ErrorBoundary>
  )
}
