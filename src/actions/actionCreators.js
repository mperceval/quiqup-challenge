import * as types from './actionTypes';

export function resetGame() {
  return {
    type: types.RESET_GAME
  };
}

export function move(playerType, position) {
  return {
    type: types.MOVE,
    move: {
      playerType,
      position
    }
  };
}
