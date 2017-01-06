import { List, Map } from 'immutable';
import * as types from '../actions/actionTypes';
import { playerType, gameState } from '../constants';

/*
 * Returns an new empty game....
*/
function resetGame() {
  return Map({
    grid: List.of('', '', '', '', '', '', '', '', ''),
    currentMove: playerType.HUMAN,
    gameState: gameState.PLAYING
  });
}

/*
 * Checks if a win condition exists.  Inputs - string to test.  Returns - bool
*/
function checkForWin(val, grid) {
  if ((grid.get(0) === val && grid.get(1) === val && grid.get(2) === val) ||
      (grid.get(3) === val && grid.get(4) === val && grid.get(5) === val) ||
      (grid.get(6) === val && grid.get(7) === val && grid.get(8) === val) ||
      (grid.get(0) === val && grid.get(3) === val && grid.get(6) === val) ||
      (grid.get(1) === val && grid.get(4) === val && grid.get(7) === val) ||
      (grid.get(2) === val && grid.get(5) === val && grid.get(8) === val) ||
      (grid.get(0) === val && grid.get(4) === val && grid.get(8) === val) ||
      (grid.get(2) === val && grid.get(4) === val && grid.get(6) === val)) {
    return true;
  } else {
    return false;
  }
}

/*
 * Returns a gameState value.  Inputs - moveType - (playerType constant) - Returns string
*/
function updateGameState(moveType, grid) {
  const moveVal = moveType === playerType.HUMAN ? 'O' : 'X';
  let newGameState = gameState.PLAYING;
  if (numMoves(grid) === 9) {
      newGameState = gameState.STALEMATE;
  } else if (checkForWin(moveVal, grid)) {
    newGameState = `${moveType}_WIN`;
  }
  return newGameState;
}

/*
 * Returns count of the number of values in the grid.  Inputs - grid - Returns number
*/
function numMoves(grid) {
   return grid.filter(item => item !== '').size;
}

/*
 * Returns new state based on current state and new move.
 * Can return win/playing/stalemate conditions.
 * Inputs - state object and move object.
 * Returns new state object
*/
function move(state, move) {
  const moveVal = move.type === playerType.HUMAN ? 'O' : 'X';
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
    const nextMove = move.type === playerType.HUMAN ? playerType.COMPUTER : playerType.HUMAN;
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
