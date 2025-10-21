import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders initial status", () => {
  render(<App />);
  expect(screen.getByTestId("status")).toBeInTheDocument();
});
