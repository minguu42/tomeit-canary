import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { GoogleLoginButton } from "./index";

describe("display", () => {
  it("should display google logo", function () {
    const handleLogin = jest.fn();
    render(<GoogleLoginButton handleLogin={handleLogin} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should display button", () => {
    const handleLogin = jest.fn();
    render(<GoogleLoginButton handleLogin={handleLogin} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should display button text", function () {
    const handleLogin = jest.fn();
    render(<GoogleLoginButton handleLogin={handleLogin} />);

    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });
});
