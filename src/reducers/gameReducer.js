import { List, Map } from 'immutable';
import * as types from '../actions/actionTypes';
import { playerType, gameState } from '../constants';

/*
 * Returns an new empty game....
*/
function resetGame() {
  return Map({
    grid: List.of('E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'),
    currentMove: playerType.PLAYER,
    gameState: gameState.PLAYING
  });
}

/*
 * Checks if a win condition exists.  Inputs - string to test.  Returns - bool
*/
function checkForWin(val, grid) {
  // check rows
  for (var i = 0; i <= 6; i = i + 3) {
    if (grid.get(i) === val && grid.get(i) === grid.get(i + 1) && grid.get(i + 1) === grid.get(i + 2)) {
      return true;
    }
  }
  // check columns
  for (var i = 0; i <= 2; i++) {
    if (grid.get(i) === val && grid.get(i) === grid.get(i + 3) && grid.get(i + 3) === grid.get(i + 6)) {
      return true;
    }
  }
  // check diagonals
  for (var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
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
  const moveVal = moveType === playerType.PLAYER ? 'O' : 'X';
  let newGameState = gameState.PLAYING;
  if (emptyCells(grid) === 0) {
      newGameState = gameState.DRAW;
  } else if (checkForWin(moveVal, grid)) {
    newGameState = `${moveType}_WIN`;
  }
  return newGameState;
}

/*
 * Returns count of the number of empty cells in the grid.  Inputs - grid - Returns number
*/
function emptyCells(grid) {
   return grid.filter(item => item === 'E').size;
}

/*
 * Returns new state based on current state and new move.
 * Can return win/playing/stalemate conditions.
 * Inputs - state object and move object.
 * Returns new state object
*/
function move(state, move) {
  const moveVal = move.type === playerType.PLAYER ? 'O' : 'X';
  const movePos = move.position;
  const grid = state.get('grid').set(movePos, moveVal);
  const gameState = updateGameState(move.type, grid);

  // Create updated state
  const result = Map({
    grid,
    gameState
  });

  // If we are still playing then add in the currentMove property
  if (gameState === 'PLAYING') {
    const nextMove = move.type === playerType.PLAYER ? playerType.AI : playerType.PLAYER;
    return result.set('currentMove', nextMove);
  }
  return result;
}

export default function (state = Map(), action) {
  switch(action.type) {
    case types.RESET_GAME:
      return resetGame();

    case types.MOVE:
      return move(state, action.move);
  }
  return state;
}
