import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { PomodoroPlayer } from "./index";
import { Task } from "types/task";

const task: Task = {
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
  const handlePlayClick = jest.fn();
  const handleStopClick = jest.fn();
  const handleSkipClick = jest.fn();

  render(
    <PomodoroPlayer
      time={1500}
      playingTask={task}
      isNextPomodoro={true}
      isActive={false}
      handlePlayClick={handlePlayClick}
      handleStopClick={handleStopClick}
      handleSkipClick={handleSkipClick}
    />
  );
});

describe("display", () => {
  it("should display time", () => {
    expect(screen.getByText("25：00")).toBeInTheDocument();
  });

  it("should display task title", () => {
    expect(screen.getByText("タスク1")).toBeInTheDocument();
  });

  it("should display button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
