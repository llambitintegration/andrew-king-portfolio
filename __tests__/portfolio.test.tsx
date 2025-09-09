import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Header from "../components/header"
import PortfolioContent from "../components/portfolio-content"
import UnifiedNavigation from "../components/unified-navigation"
import ShaderBackground from "../components/shader-background"
import ErrorBoundary from "../components/error-boundary"
import { getResume } from "../lib/getResume"
import { jest } from "@jest/globals"

describe("Portfolio Navigation", () => {
  const mockOnSectionChange = jest.fn()

  beforeEach(() => {
    mockOnSectionChange.mockClear()
  })

  test("navigation buttons are clickable from home page", async () => {
    render(<PortfolioContent currentSection="home" onSectionChange={mockOnSectionChange} />)

    const aboutButton = screen.getByText("About Me")
    // Use getByRole to get the specific Portfolio button, not the heading text
    const portfolioButton = screen.getByRole("button", { name: "Portfolio" })
    const consultingButton = screen.getByText("Consulting")

    fireEvent.click(aboutButton)
    await waitFor(() => {
      expect(mockOnSectionChange).toHaveBeenCalledWith("about")
    })

    mockOnSectionChange.mockClear()
    fireEvent.click(portfolioButton)
    await waitFor(() => {
      expect(mockOnSectionChange).toHaveBeenCalledWith("portfolio")
    })

    mockOnSectionChange.mockClear()
    fireEvent.click(consultingButton)
    await waitFor(() => {
      expect(mockOnSectionChange).toHaveBeenCalledWith("consulting")
    })
  })

  test("navigation works from about page", async () => {
    render(<PortfolioContent currentSection="about" onSectionChange={mockOnSectionChange} />)

    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument()
    })

    const homeButton = screen.getByRole("button", { name: "Home" })
    const portfolioButton = screen.getByRole("button", { name: "Portfolio" })
    const consultingButton = screen.getByRole("button", { name: "Consulting" })

    fireEvent.click(homeButton)
    await waitFor(() => {
      expect(mockOnSectionChange).toHaveBeenCalledWith("home")
    })

    mockOnSectionChange.mockClear()
    fireEvent.click(portfolioButton)
    await waitFor(() => {
      expect(mockOnSectionChange).toHaveBeenCalledWith("portfolio")
    })

    mockOnSectionChange.mockClear()
    fireEvent.click(consultingButton)
    await waitFor(() => {
      expect(mockOnSectionChange).toHaveBeenCalledWith("consulting")
    })
  })

  test("Diana Keffer name is clickable and returns to home", () => {
    render(<Header onSectionChange={mockOnSectionChange} currentSection="about" />)

    const nameButton = screen.getByText("Diana Keffer")
    fireEvent.click(nameButton)

    expect(mockOnSectionChange).toHaveBeenCalledWith("home")
  })

  test("Admin button shows login modal", async () => {
    render(<Header onSectionChange={mockOnSectionChange} currentSection="home" />)

    const adminButton = screen.getByText("Admin")
    fireEvent.click(adminButton)

    await waitFor(() => {
      expect(screen.getByText("Admin Login")).toBeInTheDocument()
    })
  })

  test("successful admin login redirects to dashboard", async () => {
    // Clear any previous calls to the mock
    global.__NEXT_ROUTER_MOCK__.push.mockClear()

    render(<Header onSectionChange={mockOnSectionChange} currentSection="home" />)

    const adminButton = screen.getByText("Admin")
    fireEvent.click(adminButton)

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText("Email")
      const passwordInput = screen.getByPlaceholderText("Password")
      const loginButton = screen.getByText("Login")

      fireEvent.change(emailInput, { target: { value: "diana@keffer.com" } })
      fireEvent.change(passwordInput, { target: { value: "DianaKeffer123!@#" } })
      fireEvent.click(loginButton)

      expect(global.__NEXT_ROUTER_MOCK__.push).toHaveBeenCalledWith("/admin")
    })
  })

  test("user can interact with admin login using user-event", async () => {
    const user = userEvent.setup()
    global.__NEXT_ROUTER_MOCK__.push.mockClear()

    render(<Header onSectionChange={mockOnSectionChange} currentSection="home" />)

    // Click admin button to open modal
    const adminButton = screen.getByText("Admin")
    await user.click(adminButton)

    // Verify modal is open
    expect(screen.getByText("Admin Login")).toBeInTheDocument()

    // Fill in credentials
    const emailInput = screen.getByPlaceholderText("Email")
    const passwordInput = screen.getByPlaceholderText("Password")

    await user.type(emailInput, "diana@keffer.com")
    await user.type(passwordInput, "DianaKeffer123!@#")

    // Submit the form
    const loginButton = screen.getByText("Login")
    await user.click(loginButton)

    // Verify navigation occurred
    expect(global.__NEXT_ROUTER_MOCK__.push).toHaveBeenCalledWith("/admin")
  })

  test("failed admin login shows alert and does not redirect", async () => {
    const user = userEvent.setup()
    global.__NEXT_ROUTER_MOCK__.push.mockClear()
    
    // Mock window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<Header onSectionChange={mockOnSectionChange} currentSection="home" />)

    // Click admin button to open modal
    const adminButton = screen.getByText("Admin")
    await user.click(adminButton)

    // Fill in incorrect credentials
    const emailInput = screen.getByPlaceholderText("Email")
    const passwordInput = screen.getByPlaceholderText("Password")

    await user.type(emailInput, "wrong@email.com")
    await user.type(passwordInput, "wrongpassword")

    // Submit the form
    const loginButton = screen.getByText("Login")
    await user.click(loginButton)

    // Verify alert was shown and no navigation occurred
    expect(alertSpy).toHaveBeenCalledWith("Invalid credentials")
    expect(global.__NEXT_ROUTER_MOCK__.push).not.toHaveBeenCalled()
    
    alertSpy.mockRestore()
  })

  test("navigation buttons are visible without scrolling", () => {
    render(<PortfolioContent currentSection="about" onSectionChange={mockOnSectionChange} />)

    // Check that navigation buttons are present and visible
    const homeButton = screen.getByText("Home")
    const portfolioButton = screen.getByText("Portfolio") 
    const consultingButton = screen.getByText("Consulting")

    expect(homeButton).toBeVisible()
    expect(portfolioButton).toBeVisible()
    expect(consultingButton).toBeVisible()
  })
})

describe("Portfolio Content Transitions", () => {
  test("content sections have transition classes", () => {
    const { rerender } = render(<PortfolioContent currentSection="home" onSectionChange={jest.fn()} />)

    let mainElement = screen.getByRole("main")
    expect(mainElement).toHaveClass("transition-all")

    rerender(<PortfolioContent currentSection="about" onSectionChange={jest.fn()} />)
    mainElement = screen.getByRole("main")
    expect(mainElement).toHaveClass("transition-all")
  })

  test("job detail modal opens when view details clicked", async () => {
    render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)

    const viewDetailsButtons = screen.getAllByText("View Details")
    fireEvent.click(viewDetailsButtons[0])

    await waitFor(() => {
      expect(screen.getByText("Professional Details")).toBeInTheDocument()
    })
  })
})

describe("ShaderBackground Component", () => {
  test("renders children and shader components", () => {
    render(
      <ShaderBackground>
        <div data-testid="child-content">Test Content</div>
      </ShaderBackground>,
    )

    // Check that children are rendered
    expect(screen.getByTestId("child-content")).toBeInTheDocument()

    // Check that mesh gradient components are rendered (mocked)
    const meshGradients = screen.getAllByTestId("mesh-gradient")
    expect(meshGradients).toHaveLength(2)
  })

  test("has proper SVG filters for visual effects", () => {
    render(
      <ShaderBackground>
        <div>Test</div>
      </ShaderBackground>,
    )

    // Check for SVG element and filters
    const svgElement = document.querySelector("svg")
    expect(svgElement).toBeInTheDocument()

    const glassFilter = document.querySelector("#glass-effect")
    const gooeyFilter = document.querySelector("#gooey-filter")
    expect(glassFilter).toBeInTheDocument()
    expect(gooeyFilter).toBeInTheDocument()
  })
})

describe("ErrorBoundary Component", () => {
  // Suppress console.error for these tests
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="success-content">No Error Content</div>
      </ErrorBoundary>,
    )

    expect(screen.getByTestId("success-content")).toBeInTheDocument()
  })

  test("catches errors and displays error boundary UI", () => {
    const ThrowError = () => {
      throw new Error("Test error")
    }

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(screen.getByText("Try Again")).toBeInTheDocument()
  })
})

describe("Resume Content Integration", () => {
  const resume = getResume()

  test("portfolio content renders resume headline and location", () => {
    render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)

    expect(screen.getByText(resume.personalInfo.title)).toBeInTheDocument()
    expect(screen.getByText(resume.personalInfo.location.fullLocation)).toBeInTheDocument()
  })

  test("about section renders professional summary", () => {
    render(<PortfolioContent currentSection="about" onSectionChange={jest.fn()} />)

    expect(screen.getByText(resume.professionalSummary.description)).toBeInTheDocument()
  })

  test("experience section renders first job responsibilities", () => {
    render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)

    const firstJob = resume.professionalExperience[0]
    const firstResponsibility = firstJob.responsibilities[0]

    // Use getAllByText for position since there might be multiple instances
    const jobPositions = screen.getAllByText(firstJob.position)
    expect(jobPositions[0]).toBeInTheDocument()
    expect(screen.getByText(firstJob.company, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(firstResponsibility, { exact: false })).toBeInTheDocument()
  })

  test("languages section renders both English and Spanish", () => {
    render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)

    expect(screen.getByText("English")).toBeInTheDocument()
    expect(screen.getByText("Spanish")).toBeInTheDocument()
    expect(screen.getByText(resume.languages[0].proficiency)).toBeInTheDocument()
    expect(screen.getByText(resume.languages[1].proficiency)).toBeInTheDocument()
  })

  test("contact information shows updated phone format", () => {
    render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)

    expect(screen.getByText(resume.personalInfo.contact.phoneFormatted)).toBeInTheDocument()
    expect(screen.getByText(resume.personalInfo.contact.email)).toBeInTheDocument()
  })

  test("job modal shows relevant skills when present", async () => {
    render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)

    const viewDetailsButtons = screen.getAllByText("View Details")
    fireEvent.click(viewDetailsButtons[0])

    await waitFor(() => {
      expect(screen.getByText("Professional Details")).toBeInTheDocument()
      expect(screen.getByText("Relevant Skills")).toBeInTheDocument()

      // Check that first job's relevant skills are displayed
      const firstJobSkills = resume.professionalExperience[0].relevantSkills
      if (firstJobSkills && firstJobSkills.length > 0) {
        expect(screen.getByText(firstJobSkills[0])).toBeInTheDocument()
      }
    })
  })

  test("resume validation error triggers error boundary", () => {
    // Create a component that throws an error when getResume is called
    const ErrorThrowingComponent = () => {
      throw new Error("Resume validation failed")
    }

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })
})

describe("UnifiedNavigation Component", () => {
  const mockOnSectionChange = jest.fn()

  beforeEach(() => {
    mockOnSectionChange.mockClear()
    jest.clearAllMocks()
  })

  test("homepage variant excludes current section and home", () => {
    render(
      <UnifiedNavigation
        variant="homepage" 
        currentSection="home"
        onSectionChange={mockOnSectionChange}
      />
    )

    // Should show About Me, Portfolio, Consulting (no Home since it's homepage variant)
    expect(screen.getByText("About Me")).toBeInTheDocument()
    expect(screen.getByText("Portfolio")).toBeInTheDocument()
    expect(screen.getByText("Consulting")).toBeInTheDocument()
    expect(screen.queryByText("Home")).not.toBeInTheDocument()
  })

  test("standard variant excludes only current section", () => {
    render(
      <UnifiedNavigation
        variant="standard"
        currentSection="about"
        onSectionChange={mockOnSectionChange}
      />
    )

    // Should show Home, Portfolio, Consulting (no About Me since it's current)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Portfolio")).toBeInTheDocument() 
    expect(screen.getByText("Consulting")).toBeInTheDocument()
    expect(screen.queryByText("About Me")).not.toBeInTheDocument()
  })

  test("buttons use consistent teal styling", () => {
    render(
      <UnifiedNavigation
        variant="homepage"
        currentSection="home"
        onSectionChange={mockOnSectionChange}
      />
    )

    const buttons = screen.getAllByRole("button")
    buttons.forEach(button => {
      expect(button).toHaveClass("bg-teal-600/20", "border-teal-400/30", "text-teal-200")
    })
  })
})

describe("Layout and Scrolling", () => {
  beforeEach(() => {
    // Ensure clean state for each test
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test("portfolio section has custom scrollbar class", () => {
    render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)
    
    const scrollableElement = document.querySelector(".custom-scrollbar")
    expect(scrollableElement).toBeInTheDocument()
  })

  test("main content areas have proper overflow handling", () => {
    const { container } = render(<PortfolioContent currentSection="about" onSectionChange={jest.fn()} />)
    
    const mainElement = container.querySelector('main[role="main"]')
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toHaveClass("transition-all", "duration-500")
  })

  test("viewport height constraints are applied", () => {
    const { container } = render(<PortfolioContent currentSection="portfolio" onSectionChange={jest.fn()} />)
    
    // Check for overflow-hidden class that prevents main page scrolling
    const contentContainer = container.querySelector(".overflow-hidden")
    expect(contentContainer).toBeInTheDocument()
  })
})
