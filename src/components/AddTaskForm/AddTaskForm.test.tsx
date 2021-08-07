import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { AddTaskForm } from "./index";

beforeEach(() => {
  const handleNameChange = jest.fn();
  const handlePriorityChange = jest.fn();
  const handleDeadlineChange = jest.fn();
  const handleSubmit = jest.fn();
  render(
    <AddTaskForm
      name=""
      handleNameChange={handleNameChange}
      priority={0}
      handlePriorityChange={handlePriorityChange}
      deadline="2021-01-01"
      handleDeadlineChange={handleDeadlineChange}
      handleSubmit={handleSubmit}
    />
  );
});

describe("display", () => {
  it("should display name field", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("should display priority field", () => {
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });
  it("should display deadline field", () => {
    expect(screen.getByDisplayValue("2021-01-01")).toBeInTheDocument();
  });
});
