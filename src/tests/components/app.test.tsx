import { render, screen } from "@testing-library/react";

import App from "../../components/App";

describe("App component tests", () => {
  beforeEach(() => {
    // write someting before each test
  });

  afterEach(() => {
    // write someting after each test
  });

  it("Renders correctly initial document", async () => {
    /* first we visit /login and test if the string in the element with class "login-label"  has"Please Log In" is there */
    render(<App />);
    const hello = screen.getByText("Hello");

    expect(hello).toBe("Hello");
  });
});
