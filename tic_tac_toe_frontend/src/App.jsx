// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-006
// User Story: As two local players, we want to play Tic Tac Toe with clear status,
//             accessible UI, audit trail, and the ability to restart.
// Acceptance Criteria: Centered board, turn display, prevent overwrite, win/draw detection,
//                      restart resets state and logs, audit entries per move (ISO timestamp,
//                      userId placeholders), responsive Ocean Professional styling.
// GxP Impact: YES - audit logging of moves and validation/error handling.
// Risk Level: LOW
// Validation Protocol: VP-TTT-APP-001
// ============================================================================
// ============================================================================
// IMPORTS AND DEPENDENCIES
// ============================================================================
// React 18, local components and logic
// Version comments: React ^18.2.0 from project package.json
// ============================================================================
import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import "./App.css";
import Board from "./components/Board";
import { calculateWinner, createEmptyBoard, getNextPlayer, isDraw, makeMove } from "./lib/gameLogic";
import { clearAuditTrail, getAuditTrail, recordAudit } from "./lib/audit";
import { getCssVariables } from "./styles/theme";

/**
 * PUBLIC_INTERFACE
 * App
 * Main game component. Manages board state, turn, status, audit, and restart.
 * GxP Critical: Yes
 * @returns {JSX.Element}
 */
export default function App() {
  // State
  const [board, setBoard] = useState(createEmptyBoard());
  const [status, setStatus] = useState("Player X's turn");
  const [winningLine, setWinningLine] = useState(null);
  const [error, setError] = useState("");
  const [turn, setTurn] = useState("X");

  // Apply Ocean theme CSS variables
  useEffect(() => {
    const vars = getCssVariables();
    Object.entries(vars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  }, []);

  // Compute winner/draw on board change
  useEffect(() => {
    const { winner, line } = calculateWinner(board);
    if (winner) {
      setWinningLine(line);
      setStatus(`Player ${winner} wins!`);
    } else if (isDraw(board)) {
      setWinningLine(null);
      setStatus("It's a draw.");
    } else {
      const next = getNextPlayer(board);
      setTurn(next);
      setWinningLine(null);
      setStatus(`Player ${next}'s turn`);
    }
  }, [board]);

  const audit = useMemo(() => getAuditTrail(), [board]); // re-evaluate for dev convenience

  /**
   * PUBLIC_INTERFACE
   * handleSquareClick
   * Handles user input for placing a mark, with validation and audit logging.
   * GxP Critical: Yes
   * Parameters:
   *  - index: number 0..8
   * Returns: void
   * Throws: none (errors captured and displayed)
   * Audit: Logs UPDATE with before/after states; ERROR entry if invalid.
   * @param {number} index
   */
  const handleSquareClick = (index) => {
    setError("");
    try {
      const currentPlayer = getNextPlayer(board);
      const before = [...board];

      const result = makeMove(board, index, currentPlayer);
      if (!result.valid) {
        setError(result.error || "Invalid move.");
        recordAudit({
          userId: `Player ${currentPlayer}`,
          action: "ERROR",
          before,
          after: before,
          reason: "Invalid move",
          message: result.error || "Invalid move",
        });
        return;
      }

      setBoard(result.board);
      recordAudit({
        userId: `Player ${currentPlayer}`,
        action: "UPDATE",
        before,
        after: result.board,
        reason: "Place mark",
      });
    } catch (e) {
      setError("An unexpected error occurred.");
      recordAudit({
        userId: "System",
        action: "ERROR",
        before: [...board],
        after: [...board],
        reason: "Exception",
        message: e?.message || "Unknown error",
      });
    }
  };

  /**
   * PUBLIC_INTERFACE
   * handleRestart
   * Resets game state and logs a CREATE entry to start a new game session.
   * GxP Critical: Yes
   * @returns {void}
   */
  const handleRestart = () => {
    const before = [...board];
    setBoard(createEmptyBoard());
    setTurn("X");
    setStatus("Player X's turn");
    setWinningLine(null);
    setError("");
    clearAuditTrail();
    recordAudit({
      userId: "System",
      action: "CREATE",
      before,
      after: createEmptyBoard(),
      reason: "Restart game",
      message: "New round initialized",
    });
  };

  return (
    <div className="ttt-app">
      <main className="ttt-container">
        <section className="ttt-header">
          <h1 className="ttt-title" aria-live="polite" data-testid="status">
            {status}
          </h1>
          {error ? (
            <div className="ttt-alert" role="alert" data-testid="error">
              {error}
            </div>
          ) : null}
        </section>

        <section className="ttt-board-wrap">
          <Board squares={board} onSquareClick={handleSquareClick} winningLine={winningLine} />
        </section>

        <section className="ttt-controls">
          <button
            type="button"
            className="ttt-button"
            onClick={handleRestart}
            aria-label="Restart game"
            data-testid="restart"
          >
            Restart
          </button>
        </section>

        <section className="ttt-audit" aria-label="Audit trail">
          <h2 className="ttt-subtitle">Audit Trail</h2>
          <ul className="ttt-audit-list" data-testid="audit-list">
            {audit.map((entry) => (
              <li key={entry.id} className="ttt-audit-item">
                <div className="ttt-audit-top">
                  <span className="ttt-audit-user">{entry.userId}</span>
                  <span
                    className={`ttt-badge ${
                      entry.action === "ERROR"
                        ? "ttt-badge-error"
                        : entry.action === "CREATE"
                        ? "ttt-badge-success"
                        : "ttt-badge-info"
                    }`}
                  >
                    {entry.action}
                  </span>
                  <span className="ttt-audit-time">{entry.timestamp}</span>
                </div>
                {entry.reason ? <div className="ttt-audit-reason">{entry.reason}</div> : null}
                {entry.message ? <div className="ttt-audit-msg">{entry.message}</div> : null}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
