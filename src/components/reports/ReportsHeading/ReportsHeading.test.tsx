import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ReportsHeading } from "./index";

beforeEach(() => {
  render(<ReportsHeading date={new Date("2021-08-01T00:00:00Z")} />);
});

describe("display", () => {
  it("should display heading", () => {
    expect(screen.getByText("今日のレポート")).toBeInTheDocument();
  });

  it("should display date", function () {
    expect(screen.getByText("8月1日日曜日"));
  });
});
