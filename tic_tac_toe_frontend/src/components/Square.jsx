// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-004
// User Story: As a player, I need interactive, accessible squares to make moves.
// Acceptance Criteria: Keyboard accessible button, aria-label, focus style, prevents overwriting.
// GxP Impact: NO
// Risk Level: LOW
// Validation Protocol: VP-TTT-UI-002
// ============================================================================
// ============================================================================
// IMPORTS AND DEPENDENCIES
// ============================================================================
// React only
// ============================================================================

import React from "react";

/**
 * PUBLIC_INTERFACE
 * Square
 * Renders a single square button.
 * GxP Critical: No
 * @param {{value: 'X'|'O'|null, onClick: () => void, highlighted?: boolean, index: number}} props
 * @returns {JSX.Element}
 */
export default function Square({ value, onClick, highlighted = false, index }) {
  const label =
    value === "X"
      ? `Square ${index + 1}, X`
      : value === "O"
      ? `Square ${index + 1}, O`
      : `Square ${index + 1}, empty`;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={!!value}
      onClick={onClick}
      className={`ttt-square ${highlighted ? "ttt-square-win" : ""}`}
      data-testid={`square-${index}`}
    >
      {value}
    </button>
  );
}
