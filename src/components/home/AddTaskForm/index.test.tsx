import { render, screen } from "@testing-library/react";

import { AddTaskForm } from "./index";

describe("display", () => {
  beforeEach(() => {
    const handleNameChange = jest.fn();
    const handleExpectedPomodoroNumChange = jest.fn();
    const handleDeadlineChange = jest.fn();
    const handleSubmit = jest.fn();

    render(
      <AddTaskForm
        title=""
        handleTitleChange={handleNameChange}
        expectedPomodoroNumber={0}
        handleExpectedPomodoroNumberChange={handleExpectedPomodoroNumChange}
        dueOn={new Date("2021-01-01T00:00:00Z")}
        handleDueOnChange={handleDeadlineChange}
        handleSubmit={handleSubmit}
      />
    );
  });

  it("should display name field", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should display expectedPomodoroNum field", () => {
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("should display deadline field", () => {
    expect(screen.getByDisplayValue("2021-01-01")).toBeInTheDocument();
  });
});
