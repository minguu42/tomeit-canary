import { render, screen } from "@testing-library/react";

import { LoadingCover } from "./index";

it("should display loading...", () => {
  render(<LoadingCover />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
