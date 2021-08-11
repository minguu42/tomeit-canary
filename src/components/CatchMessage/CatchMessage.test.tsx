import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { CatchMessage } from "./index";

beforeEach(() => {
  render(<CatchMessage />);
});

describe("display", () => {
  it("should display advertising slogan", () => {
    expect(
      screen.getByText("tomeit でやるべきことのみをやる")
    ).toBeInTheDocument();
  });
  it("should display description", () => {
    expect(
      screen.getByText(
        "tomeit は必要なことだけに集中するためのタスク管理アプリです。 ポモドーロ・テクニックを使って、今やるべきことのみを行い, 時間を有意義に使いましょう！"
      )
    ).toBeInTheDocument();
  });
});
