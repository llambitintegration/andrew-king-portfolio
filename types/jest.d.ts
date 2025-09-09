// Jest DOM type declarations
import "@testing-library/jest-dom"

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
    }
  }

  // Global test mocks
  var __NEXT_ROUTER_MOCK__: {
    push: jest.MockedFunction<any>
    replace: jest.MockedFunction<any>
  }
}

export {}
