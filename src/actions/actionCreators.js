import * as types from './actionTypes';

export function resetGame() {
  return {
    type: types.RESET_GAME
  };
}

export function move(type, position) {
  return {
    type: types.MOVE,
    move: {
      type,
      position
    }
  };
}
