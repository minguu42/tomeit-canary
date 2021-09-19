import { render, screen } from "@testing-library/react";

import { HomeHeading } from "./index";
import { Task } from "types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "タスク1の名前を長くしてみた。もっともっと長く、長く",
    expectedPomodoroNumber: 0,
    actualPomodoroNumber: 0,
    dueOn: new Date("0001-01-01T00:00:00Z"),
    isCompleted: false,
    completedOn: new Date("0001-01-01T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
  {
    id: 2,
    title: "タスク2",
    expectedPomodoroNumber: 0,
    actualPomodoroNumber: 0,
    dueOn: new Date("2021-01-01T00:00:00Z"),
    isCompleted: false,
    completedOn: new Date("0001-01-01T00:00:00Z"),
    createdAt: new Date("0001-01-01T00:00:00Z"),
    updatedAt: new Date("0001-01-01T00:00:00Z"),
  },
];

beforeEach(() => {
  render(<HomeHeading headingText="いつか" tasks={tasks} />);
});

describe("display", () => {
  it("should display headingText", () => {
    expect(screen.getByText("いつか")).toBeInTheDocument();
  });

  it("should display number of task", () => {
    expect(screen.getByText("タスク数：2")).toBeInTheDocument();
  });
});
