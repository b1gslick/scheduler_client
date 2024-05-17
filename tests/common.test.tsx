import { render } from "@testing-library/react";

import "jest-canvas-mock";

import App from "../src/App";

describe("common render", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it("App render with state for rows", () => {
    const setRows = jest.fn();
    const { getByTestId } = render(<App {setRows} />);
  });
});
