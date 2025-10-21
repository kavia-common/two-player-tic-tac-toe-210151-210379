// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-005
// User Story: As players, we need a 3x3 board with winning highlight.
// Acceptance Criteria: 3x3 grid, click to play, highlight winning line.
// GxP Impact: NO
// Risk Level: LOW
// Validation Protocol: VP-TTT-UI-003
// ============================================================================
// ============================================================================
// IMPORTS AND DEPENDENCIES
// ============================================================================
// React, local components
// ============================================================================

import React from "react";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board
 * Displays a 3x3 Tic Tac Toe grid.
 * GxP Critical: No
 * @param {{
 *   squares: Array<'X'|'O'|null>,
 *   onSquareClick: (index: number) => void,
 *   winningLine: number[]|null
 * }} props
 * @returns {JSX.Element}
 */
export default function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((val, idx) => (
        <div role="gridcell" key={idx} className="ttt-cell">
          <Square
            value={val}
            index={idx}
            onClick={() => onSquareClick(idx)}
            highlighted={Array.isArray(winningLine) && winningLine.includes(idx)}
          />
        </div>
      ))}
    </div>
  );
}
