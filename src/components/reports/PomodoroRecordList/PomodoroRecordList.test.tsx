import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { PomodoroRecordList } from "components/reports/PomodoroRecordList";
import { PomodoroRecord } from "types/pomodoro";

const pomodoroRecords: PomodoroRecord[] = [
  {
    id: 1,
    taskTitle: "タスク1",
    completedAt: new Date("2021-01-01T00:00:00Z"),
  },
  {
    id: 2,
    taskTitle: "タスク2",
    completedAt: new Date("2021-01-01T00:30:00Z"),
  },
];

beforeEach(() => {
  render(<PomodoroRecordList pomodoroRecords={pomodoroRecords} />);
});

describe("display", () => {
  it("should display pomodoro record1", () => {
    expect(screen.getByText("タスク1")).toBeInTheDocument();
  });

  it("should display pomodoro record2", () => {
    expect(screen.getByText("タスク2")).toBeInTheDocument();
  });
});
