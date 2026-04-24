import { Chess } from 'chess.js';

// Piece values
const pieceValues = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000
};

// Piece-Square Tables for position evaluation
const pst = {
  p: [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ],
  n: [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ],
  b: [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
  ],
  r: [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
  ],
  q: [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
  ],
  k: [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
  ]
};

// Mirror board for black
const pstBlack = {};
for (let piece in pst) {
  pstBlack[piece] = [...pst[piece]].reverse();
}

/**
 * Basic evaluation function.
 * Positive score means White is better, negative means Black.
 */
function evaluateBoard(game) {
  let totalEvaluation = 0;
  const board = game.board(); // 8x8 array

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const val = pieceValues[piece.type] || 0;
        const pstArray = piece.color === 'w' ? pst[piece.type] : pstBlack[piece.type];
        const pstVal = pstArray[i][j];
        
        if (piece.color === 'w') {
          totalEvaluation += val + pstVal;
        } else {
          totalEvaluation -= val + pstVal;
        }
      }
    }
  }
  return totalEvaluation;
}

/**
 * Minimax with Alpha-Beta Pruning
 */
function minimax(game, depth, alpha, beta, isMaximizingPlayer) {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = game.moves();
  
  if (isMaximizingPlayer) {
    let bestVal = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      game.move(moves[i]);
      bestVal = Math.max(bestVal, minimax(game, depth - 1, alpha, beta, !isMaximizingPlayer));
      game.undo();
      alpha = Math.max(alpha, bestVal);
      if (beta <= alpha) break;
    }
    return bestVal;
  } else {
    let bestVal = Infinity;
    for (let i = 0; i < moves.length; i++) {
      game.move(moves[i]);
      bestVal = Math.min(bestVal, minimax(game, depth - 1, alpha, beta, !isMaximizingPlayer));
      game.undo();
      beta = Math.min(beta, bestVal);
      if (beta <= alpha) break;
    }
    return bestVal;
  }
}

/**
 * Returns the best move for the current player.
 */
export function getBestMove(gameFen, depth = 3) {
  const game = new Chess(gameFen);
  const moves = game.moves();
  if (moves.length === 0) return null;

  // Simple move ordering: captures and promotions first (very basic optimization)
  moves.sort((a, b) => {
    if (a.includes('x') || a.includes('=')) return -1;
    if (b.includes('x') || b.includes('=')) return 1;
    return 0;
  });

  let bestMove = null;
  const isWhite = game.turn() === 'w';
  
  let bestValue = isWhite ? -Infinity : Infinity;
  let alpha = -Infinity;
  let beta = Infinity;

  // Track start time to limit thinking if necessary
  const startTime = Date.now();

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    game.move(move);
    // AI depth is typically 3 for quick JS client-side evaluation without worker
    const boardValue = minimax(game, depth - 1, alpha, beta, !isWhite);
    game.undo();

    if (isWhite) {
      if (boardValue > bestValue) {
        bestValue = boardValue;
        bestMove = move;
      }
      alpha = Math.max(alpha, bestValue);
    } else {
      if (boardValue < bestValue) {
        bestValue = boardValue;
        bestMove = move;
      }
      beta = Math.min(beta, bestValue);
    }
    
    // Safety break for browsers if we exceed 2 seconds (optional)
    if (Date.now() - startTime > 2000) break;
  }

  return bestMove || moves[Math.floor(Math.random() * moves.length)];
}
