import { render, screen } from "@testing-library/react";

import { TaskRecordList } from "./index";
import { Task } from "types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "タスク1",
    expectedPomodoroNumber: 0,
    actualPomodoroNumber: 0,
    dueOn: new Date("0001-01-01T00:00:00Z"),
    isCompleted: true,
    completedOn: new Date("2021-08-31T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
  {
    id: 2,
    title: "タスク2",
    expectedPomodoroNumber: 4,
    actualPomodoroNumber: 2,
    dueOn: new Date("2021-01-01T00:00:00Z"),
    isCompleted: true,
    completedOn: new Date("2021-08-31T01:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
];

beforeEach(() => {
  render(<TaskRecordList tasks={tasks} />);
});

describe("display", () => {
  it("should display task1", () => {
    expect(screen.getByText("タスク1")).toBeInTheDocument();
  });

  it("should display task2", () => {
    expect(screen.getByText("タスク2")).toBeInTheDocument();
  });
});
