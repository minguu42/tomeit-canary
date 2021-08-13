import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { LoadingCover } from "./index";

it("should display loading...", () => {
  render(<LoadingCover />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
