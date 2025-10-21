# Ocean Professional Tic Tac Toe (Frontend)

Modern, accessible, and compliant local two-player Tic Tac Toe built with React.

## Features
- 3x3 board, Player X/O turn status
- Prevents overwriting squares
- Win and draw detection with winning line highlight
- Restart flow resets game and logs a new audit entry
- In-memory audit trail: ISO timestamp, user ID ("Player X"/"Player O"), action type, before/after states, optional reason
- Ocean Professional theme, responsive, accessible (ARIA labels, focus rings)
- Unit tests with Jest and React Testing Library

## Scripts
- npm start — dev server on http://localhost:3000
- npm test — run test suite
- npm run build — production build

## GxP Notes
- Audit trail is in-memory only (non-persistent) for demo purposes
- Each move is logged with user, timestamp, action, and state snapshots
- Invalid operations log an ERROR entry

## File Map
- src/App.jsx — main app component
- src/components/Board.jsx, Square.jsx — UI components
- src/lib/gameLogic.js — pure game logic utilities
- src/lib/audit.js — in-memory audit implementation
- src/styles/theme.js — Ocean theme tokens
- src/__tests__ — unit tests
