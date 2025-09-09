"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo)
    this.setState({ error, errorInfo })
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} retry={this.retry} />
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <h2 className="text-xl font-medium text-red-400 mb-4">Something went wrong</h2>
              <p className="text-red-200/80 mb-4 text-sm">
                An unexpected error occurred. This might be related to shader rendering or component loading.
              </p>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left mb-4">
                  <summary className="text-red-300 text-sm cursor-pointer mb-2">Error Details</summary>
                  <pre className="text-xs text-red-200/60 overflow-auto bg-black/20 p-2 rounded">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <button
                onClick={this.retry}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
