import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { PomodoroRecordListItem } from "./PomodoroRecordListItem";
import { Pomodoro } from "types/pomodoro";

const pomodoroRecord1: Pomodoro = {
  id: 1,
  taskTitle: "タスク1",
  completedOn: new Date("2021-01-01T00:00:00Z"),
  createdAt: new Date("2021-01-01T00:00:00Z"),
};

beforeEach(() => {
  render(<PomodoroRecordListItem pomodoroRecord={pomodoroRecord1} />);
});

describe("display", () => {
  it("should display taskTitle", function () {
    expect(screen.getByText("タスク1")).toBeInTheDocument();
  });
});
