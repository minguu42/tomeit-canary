import { render, screen } from "@testing-library/react";

import { Loading } from "./index";

it("should display loading...", () => {
  render(<Loading />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
