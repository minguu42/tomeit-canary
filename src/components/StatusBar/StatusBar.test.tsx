import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"

import StatusBar from "./index";

it('should display', () => {
    render(<StatusBar restCount={1} undoneTaskNumber={4} pomodoroNumber={8} />)

    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("休憩まで")).toBeInTheDocument()
});
