import { render, screen } from "@testing-library/react";
import Search from "@/app/search/page";

describe("Sample Test Suite", () => {
  it("should pass a sample test", () => {
    render(<Search />);
    const titleElement = screen.getByTestId("title");
    expect(titleElement).toBeInTheDocument();
  });
});
