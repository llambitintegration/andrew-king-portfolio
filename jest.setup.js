require("@testing-library/jest-dom")

// Mock window.location for tests
Object.defineProperty(window, "location", {
  value: {
    href: "",
  },
  writable: true,
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock next/image to behave like a plain img
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const React = require("react")
    const { src, alt, fill, width, height, ...rest } = props
    // Convert Next.js Image props to standard img props
    const imgProps = {
      src,
      alt,
      ...rest
    }
    // Handle Next.js specific props
    if (fill) {
      imgProps.style = { ...imgProps.style, objectFit: 'cover', width: '100%', height: '100%' }
    }
    if (width) imgProps.width = width
    if (height) imgProps.height = height
    
    return React.createElement("img", imgProps)
  },
}))

// Mock next/navigation
const mockPush = jest.fn()
const mockReplace = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}))

// Make the mocks available globally for tests
global.__NEXT_ROUTER_MOCK__ = {
  push: mockPush,
  replace: mockReplace
}

// Mock @paper-design/shaders-react components
jest.mock("@paper-design/shaders-react", () => ({
  MeshGradient: (props) => {
    const React = require("react")
    const { colors, speed, className, style, wireframe, ...rest } = props
    return React.createElement("div", {
      className: `mesh-gradient ${className || ''}`,
      "data-testid": "mesh-gradient",
      style: style,
      "data-colors": colors?.join(','),
      "data-speed": speed,
      "data-wireframe": wireframe,
      ...rest
    })
  },
  ShaderMount: (props) => {
    const React = require("react")
    return React.createElement("div", {
      className: "shader-mount",
      "data-testid": "shader-mount",
      ...props
    })
  }
}))

// Mock WebGL and Canvas APIs for shader components
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Array(4) })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => ({ data: new Array(4) })),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
}))

// Mock WebGL context
global.WebGLRenderingContext = jest.fn()
global.WebGL2RenderingContext = jest.fn()
