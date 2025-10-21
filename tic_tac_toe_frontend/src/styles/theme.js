// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-001
// User Story: As two local players, we want to play Tic Tac Toe with clear status,
//             accessible UI, and the ability to restart and audit our moves.
// Acceptance Criteria: Ocean theme, responsive UI, accessible focus, status/turn display,
//                      win/draw detection, restart, audit trail entries.
// GxP Impact: YES - UI logs in-memory audit entries for player moves (Attributable,
//            Contemporaneous, Accurate).
// Risk Level: LOW
// Validation Protocol: VP-TTT-UI-001
// ============================================================================
// ============================================================================
// IMPORTS AND DEPENDENCIES
// ============================================================================
// None - plain JS theme object
// ============================================================================

/**
 * Ocean Professional theme tokens for consistent styling
 * @typedef {Object} Theme
 * @property {string} name
 * @property {string} primary
 * @property {string} secondary
 * @property {string} success
 * @property {string} error
 * @property {string} background
 * @property {string} surface
 * @property {string} text
 * @property {string} focus
 * @property {string} shadow
 */

/** @type {Theme} */
export const theme = {
  name: "Ocean Professional",
  primary: "#3b82f6",
  secondary: "#64748b",
  success: "#06b6d4",
  error: "#EF4444",
  background: "#f9fafb",
  surface: "#ffffff",
  text: "#111827",
  focus: "#0ea5e9",
  shadow: "rgba(2, 6, 23, 0.08)",
};

/**
 * PUBLIC_INTERFACE
 * getCssVariables
 * Returns CSS variable map for inline style application
 * GxP Critical: No
 * @returns {Record<string, string>} CSS variables mapping
 */
export function getCssVariables() {
  return {
    "--ocean-primary": theme.primary,
    "--ocean-secondary": theme.secondary,
    "--ocean-success": theme.success,
    "--ocean-error": theme.error,
    "--ocean-bg": theme.background,
    "--ocean-surface": theme.surface,
    "--ocean-text": theme.text,
    "--ocean-focus": theme.focus,
    "--ocean-shadow": theme.shadow,
  };
}
