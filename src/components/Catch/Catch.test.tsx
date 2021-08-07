import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Catch from "./index";

beforeEach(() => {
    const handleLogin = jest.fn()
    render(<Catch handleLogin={handleLogin} />)
})

describe("display", () => {
    it('should display heading', () => {
        expect(screen.getByText("大事なことに集中する")).toBeInTheDocument()
    });
})