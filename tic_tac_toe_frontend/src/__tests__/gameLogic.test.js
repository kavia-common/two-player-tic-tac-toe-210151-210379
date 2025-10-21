// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-TEST-LOGIC
// Tests: move placement, turn switching, win detection, draw detection, invalid clicks.
// ============================================================================

import {
  calculateWinner,
  createEmptyBoard,
  getNextPlayer,
  isDraw,
  makeMove,
} from "../lib/gameLogic";

describe("gameLogic", () => {
  test("createEmptyBoard returns 9 nulls", () => {
    const b = createEmptyBoard();
    expect(b).toHaveLength(9);
    expect(b.every((v) => v === null)).toBe(true);
  });

  test("getNextPlayer starts as X", () => {
    const b = createEmptyBoard();
    expect(getNextPlayer(b)).toBe("X");
  });

  test("makeMove places mark and switches player", () => {
    let b = createEmptyBoard();
    const r1 = makeMove(b, 0, "X");
    expect(r1.valid).toBe(true);
    expect(r1.board[0]).toBe("X");
    expect(getNextPlayer(r1.board)).toBe("O");
  });

  test("prevent overwriting a square", () => {
    let b = createEmptyBoard();
    b = makeMove(b, 0, "X").board;
    const r = makeMove(b, 0, "O");
    expect(r.valid).toBe(false);
    expect(r.error).toMatch(/occupied/i);
  });

  test("detects row win", () => {
    let b = createEmptyBoard();
    b = makeMove(b, 0, "X").board;
    b = makeMove(b, 3, "O").board;
    b = makeMove(b, 1, "X").board;
    b = makeMove(b, 4, "O").board;
    b = makeMove(b, 2, "X").board;
    const res = calculateWinner(b);
    expect(res.winner).toBe("X");
    expect(res.line).toEqual([0,1,2]);
  });

  test("detects diagonal win", () => {
    let b = createEmptyBoard();
    b = makeMove(b, 0, "X").board;
    b = makeMove(b, 1, "O").board;
    b = makeMove(b, 4, "X").board;
    b = makeMove(b, 2, "O").board;
    b = makeMove(b, 8, "X").board;
    const res = calculateWinner(b);
    expect(res.winner).toBe("X");
    expect(res.line).toEqual([0,4,8]);
  });

  test("detects draw", () => {
    // X O X
    // X X O
    // O X O
    const b = ["X","O","X","X","X","O","O","X","O"];
    expect(isDraw(b)).toBe(true);
  });

  test("invalid index errors", () => {
    const b = createEmptyBoard();
    expect(() => makeMove(b, -1, "X")).toThrow();
    expect(() => makeMove(b, 9, "X")).toThrow();
  });

  test("invalid player errors", () => {
    const b = createEmptyBoard();
    expect(() => makeMove(b, 0, "A")).toThrow();
  });
});
