import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { TaskListItem } from "./index";
import { Task } from "types/task";

const task1: Task = {
  id: 1,
  title: "タスク1",
  expectedPomodoroNum: 4,
  actualPomodoroNum: 2,
  dueOn: new Date("2021-01-01T00:00:00Z"),
  isCompleted: false,
  completedAt: new Date("0001-01-01T00:00:00Z"),
  createdAt: new Date("0001-01-01T00:00:00Z"),
  updatedAt: new Date("0001-01-01T00:00:00Z"),
};

beforeEach(() => {
  const completeTask = jest.fn();
  const setTask = jest.fn()
  render(<TaskListItem task={task1} isPlaying={false} completeTask={completeTask} setTask={setTask} />);
});

describe("display", () => {
  it("should display title", () => {
    expect(screen.getByText("タスク1")).toBeInTheDocument();
  });

  it("should display expectedPomodoroNum", () => {
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("should display actualPomodoroNum", () => {
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should display dueOn", function () {
    expect(screen.getByText("2021年1月1日")).toBeInTheDocument();
  });
});
