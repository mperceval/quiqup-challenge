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
  if (checkForWin(moveVal, grid)) {
    newGameState = `${moveType}_WIN`;
  } else if (emptyCells(grid)) {
    newGameState = gameState.DRAW;
  }

  console.log('updateGameState : ', newGameState);
  return newGameState;
}

/*
 * Returns count of the number of empty cells in the grid.  Inputs - grid - Returns number
*/
function emptyCells(grid) {
   return grid.filter(item => item === 'E').size === 0;
}

/*
 * Returns index of the next available grid move.  Inputs - grid - Returns number (index)
*/
function getNextAIMove(grid) {
  var indxs = [];
  for (let i = 0; i < 9; i++) {
    if (grid.get(i) === "E") {
      return i;
    }
  }
}

/*
 * Returns new state based on current state and new move.
 * Can return win/playing/stalemate conditions.
 * Inputs - state object and move object.
 * Returns new state object
*/

function playerMove(state, move) {
  const moveVal = 'O';
  const movePos = move.position;
  const grid = state.get('grid').set(movePos, moveVal);
  const gameState = updateGameState(move.playerType, grid);

  // Create updated state
  const result = Map({
    grid,
    gameState
  });

  // If we are still playing then add in the currentMove property
  if (gameState === 'PLAYING') {
    const nextMove = playerType.AI;
    return result.set('currentMove', nextMove);
  }
  return result;
}

function aiMove(state) {
  const moveVal = 'X';
  const movePos = getNextAIMove(state.get('grid'));
  const grid = state.get('grid').set(movePos, moveVal);
  const gameState = updateGameState(playerType.AI, grid);

  // Create updated state
  const result = Map({
    grid,
    gameState
  });

  // If we are still playing then add in the currentMove property
  if (gameState === 'PLAYING') {
    const nextMove = playerType.PLAYER;
    return result.set('currentMove', nextMove);
  }

  return result;
}

export default function (state = Map(), action) {
  switch(action.type) {
    case types.RESET_GAME:
      return resetGame();

    case types.PLAYER_MOVE:
      return playerMove(state, action.move);

      case types.AI_MOVE:
        return aiMove(state);
  }
  return state;
}
