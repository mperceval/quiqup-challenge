import { List, Map } from 'immutable';
import { playerTypes, gameStates } from '../constants';

/*
 * Returns an new empty game....
*/
export function resetGame() {
  return Map({
    grid: List.of('E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'),
    currentMove: playerTypes.PLAYER,
    gameState: gameStates.PLAYING
  });
}

/*
 * Returns new state based on current state and new player move.
 * Can return win/playing/stalemate conditions.
 * Inputs - state object and move object.
 * Returns new state object
*/
export function playerMove(state, move) {
  const currentGrid = state.get('grid');
  const newGrid = makeMove(currentGrid, move.playerType, move.position);
  if (!newGrid) {
    return state;
  }
  const gameState = updateGameState(move.playerType, newGrid);

  // Create updated state
  const result = Map({
    grid: newGrid,
    gameState
  });

  // If we are still playing then add in the currentMove property
  if (gameState === gameStates.PLAYING) {
    const nextMove = playerTypes.AI;
    return result.set('currentMove', nextMove);
  }
  return result;
}

/*
 * Returns new state based on current state and new AI move.
 * Can return win/playing/stalemate conditions.
 * Inputs - state object and move object.
 * Returns new state object
*/
export function aiMove(state) {
  // calculate ai move...
  const grid = getNextAIMove(state.get('grid'));
  if (!grid) {
    return state;
  }
  const gameState = updateGameState(playerTypes.AI, grid);
  // Create updated state
  const result = Map({
    grid,
    gameState
  });

  // If we are still playing then add in the currentMove property
  if (gameState === gameStates.PLAYING) {
    const nextMove = playerTypes.PLAYER;
    return result.set('currentMove', nextMove);
  }
  return result;
}


/*
 * Checks if a win condition exists.  Inputs - string to test.  Returns - bool
*/
function checkForWin(val, grid) {
  // check rows
  for (let i = 0; i <= 6; i = i + 3) {
    if (grid.get(i) === val && grid.get(i) === grid.get(i + 1) && grid.get(i + 1) === grid.get(i + 2)) {
      return true;
    }
  }
  // check columns
  for (let i = 0; i <= 2; i++) {
    if (grid.get(i) === val && grid.get(i) === grid.get(i + 3) && grid.get(i + 3) === grid.get(i + 6)) {
      return true;
    }
  }
  // check diagonals
  for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
    if (grid.get(i) === val && grid.get(i) === grid.get(i + j) && grid.get(i + j) === grid.get(i + 2 * j)) {
      return true;
    }
  }
  return false;
}

/*
 * Returns a gameState value.  Inputs - moveType - (playerType constant) - Returns string
*/
function updateGameState(moveType, grid) {
  const moveVal = moveType === playerTypes.PLAYER ? 'O' : 'X';
  let newGameState = gameStates.PLAYING;
  if (checkForWin(moveVal, grid)) {
    newGameState = `${moveType}_WIN`;
  } else if (emptyCells(grid)) {
    newGameState = gameStates.DRAW;
  }
  return newGameState;
}

/*
 * Returns count of the number of empty cells in the grid.  Inputs - grid - Returns number
*/
function emptyCells(grid) {
   return grid.filter(item => item === 'E').size === 0;
}

/*
 * Makes a move on the grid - returns new grid or null
 */
function makeMove(grid, playerType, pos) {
  const moveVal = playerType === playerTypes.PLAYER ? 'O' : 'X';
  // Don't allow move if cell already occupied
  if (grid.get(pos) !== 'E') {
    return null;
  }
  return grid.set(pos, moveVal);
}

/*
 * Returns gameState for a given grid
 */
function getWinState(grid) {
  if (checkForWin('O', grid)) {
    return gameStates.PLAYER_WIN;
  }

  if (checkForWin('X', grid)) {
    return gameStates.AI_WIN;
  }

  if (emptyCells(grid)) {
    return gameStates.DRAW;
  }

  return gameStates.PLAYING;
}

/*
 * Uses minmax algorithm to determine next AI move
 * Returns a new grid || null
 */

function getNextAIMove(grid) {
  let bestMoveScore = 100;
  let move = null;

  const winState = getWinState(grid);
  if (winState !== gameStates.PLAYING) {
    return null;
  }

  for (let i = 0; i < grid.size; i++) {
    let newGrid = makeMove(grid, playerTypes.AI, i);
    if (newGrid) {
      const moveScore = maxScore(newGrid);
      if (moveScore < bestMoveScore) {
        bestMoveScore = moveScore;
        move = i;
      }
    }
  }
  return grid.set(move, 'X');
}

/*
 * Calculates best move for min opponent - returns score value
 */
function minScore(grid) {
  const winState = getWinState(grid);
  if (winState === gameStates.PLAYER_WIN) {
    return 10;
  } else if (winState === gameStates.AI_WIN) {
    return -10;
  } else if (winState === gameStates.DRAW) {
    return 0;
  } else {
    let bestMoveValue = 100;
    let move = 0;

    for (let i = 0; i < grid.size; i++) {
      const newGrid = makeMove(grid, playerTypes.AI, i);
      if (newGrid) {
        const predictedMoveValue = maxScore(newGrid);
        if (predictedMoveValue < bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }
    return bestMoveValue;
  }
}

/*
 * Calculates best move for max opponent - returns score value
 */
function maxScore(grid) {
  const winState = getWinState(grid);
  if (winState === gameStates.PLAYER_WIN) {
    return 10;
  } else if (winState === gameStates.AI_WIN) {
    return -10;
  } else if (winState === gameStates.DRAW) {
    return 0;
  } else {
    let bestMoveValue = -100;
    let move = 0;

    for (let i = 0; i < grid.size; i++) {
      const newGrid = makeMove(grid, playerTypes.PLAYER, i);
      if (newGrid) {
        const predictedMoveValue = minScore(newGrid);
        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue;
          move = i;
        }
      }
    }
    return bestMoveValue;
  }
}
