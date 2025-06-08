import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Sample Test Suite", () => {
  it("should pass a sample test", () => {
    render(<Home />);
    const titleElement = screen.getByTestId("title");
    expect(titleElement).toBeInTheDocument();
  });
});
