// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-TEST-APP
// Tests UI behaviors and audit logging.
// ============================================================================

import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../App.jsx";

function clickSquare(i) {
  fireEvent.click(screen.getByTestId(`square-${i}`));
}

describe("App UI", () => {
  test("renders centered 3x3 board with status", () => {
    render(<App />);
    expect(screen.getByRole("grid", { name: /tic tac toe board/i })).toBeInTheDocument();
    expect(screen.getByTestId("status").textContent).toMatch(/Player X/i);
  });

  test("players can click empty squares to place mark and switch turns", () => {
    render(<App />);
    clickSquare(0);
    expect(screen.getByTestId("square-0")).toHaveTextContent("X");
    expect(screen.getByTestId("status").textContent).toMatch(/Player O/i);
  });

  test("prevents overwriting squares and shows error", () => {
    render(<App />);
    clickSquare(0); // X
    clickSquare(0); // invalid
    expect(screen.getByTestId("square-0")).toHaveTextContent("X");
    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  test("detects a win and highlights winning line", () => {
    render(<App />);
    // X 1, O 3, X 2, O 4, X 3 -> top row win
    clickSquare(0); // X
    clickSquare(3); // O
    clickSquare(1); // X
    clickSquare(4); // O
    clickSquare(2); // X wins
    expect(screen.getByTestId("status").textContent).toMatch(/wins/i);
    // winning squares should have class ttt-square-win
    expect(screen.getByTestId("square-0").className).toMatch(/ttt-square-win/);
    expect(screen.getByTestId("square-1").className).toMatch(/ttt-square-win/);
    expect(screen.getByTestId("square-2").className).toMatch(/ttt-square-win/);
  });

  test("detects draw", () => {
    render(<App />);
    // Produce a draw
    // X O X
    // X X O
    // O X O
    clickSquare(0); // X
    clickSquare(1); // O
    clickSquare(2); // X
    clickSquare(5); // O
    clickSquare(3); // X
    clickSquare(6); // O
    clickSquare(4); // X
    clickSquare(8); // O
    clickSquare(7); // X
    expect(screen.getByTestId("status").textContent).toMatch(/draw/i);
  });

  test("restart resets board and logs new audit entry", () => {
    render(<App />);
    clickSquare(0);
    const beforeAuditCount = within(screen.getByTestId("audit-list")).getAllByRole("listitem").length;
    fireEvent.click(screen.getByTestId("restart"));
    // New game status
    expect(screen.getByTestId("status").textContent).toMatch(/Player X/i);
    // Square cleared
    expect(screen.getByTestId("square-0")).toHaveTextContent("");
    // New audit list entries (cleared + one new CREATE)
    const afterAuditItems = within(screen.getByTestId("audit-list")).queryAllByRole("listitem");
    expect(afterAuditItems.length).toBeGreaterThanOrEqual(1);
  });

  test("audit entries appear for moves and invalid actions", () => {
    render(<App />);
    const startCount = within(screen.getByTestId("audit-list")).queryAllByRole("listitem").length;
    clickSquare(0); // valid
    clickSquare(0); // invalid
    const entries = within(screen.getByTestId("audit-list")).queryAllByRole("listitem");
    expect(entries.length).toBeGreaterThan(startCount);
  });
});
