import { render, screen } from "@testing-library/react";

import { PomodoroList } from "components/reports/PomodoroRecordList";
import { Pomodoro } from "types/pomodoro";

const pomodoroRecords: Pomodoro[] = [
  {
    id: 1,
    taskTitle: "タスク1",
    completedOn: new Date("2021-01-01T00:00:00Z"),
    createdAt: new Date("2021-01-01T00:00:00Z"),
  },
  {
    id: 2,
    taskTitle: "タスク2",
    completedOn: new Date("2021-01-01T00:30:00Z"),
    createdAt: new Date("2021-01-01T00:30:00Z"),
  },
];

beforeEach(() => {
  render(<PomodoroList pomodoros={pomodoroRecords} />);
});

describe("display", () => {
  it("should display pomodoro record1", () => {
    expect(screen.getByText("タスク1")).toBeInTheDocument();
  });

  it("should display pomodoro record2", () => {
    expect(screen.getByText("タスク2")).toBeInTheDocument();
  });
});
