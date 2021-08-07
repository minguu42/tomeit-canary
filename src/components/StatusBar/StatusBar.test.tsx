import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import StatusBar from "./index";

beforeEach(() => {
  render(<StatusBar restCount={1} undoneTaskNumber={4} pomodoroNumber={8} />);
});

describe("display", () => {
  it("should display restCount", function () {
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should display restCount caption", () => {
    expect(screen.getByText("休憩まで")).toBeInTheDocument();
  });

  it("should display undoneTaskNumber", () => {
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("should display undoneTaskNumber caption", () => {
    expect(screen.getByText("残りタスク数")).toBeInTheDocument();
  });

  it("should display pomodoroNumber", () => {
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("should display", () => {
    expect(screen.getByText("今日のポモドーロ数")).toBeInTheDocument();
  });
});
