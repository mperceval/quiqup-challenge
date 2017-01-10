import * as types from './actionTypes';
import { playerTypes } from '../constants';

export function resetGame() {
  return {
    type: types.RESET_GAME
  };
}

export function playerMove(position) {
  return {
    type: types.PLAYER_MOVE,
    move: {
      playerType: playerTypes.PLAYER,
      position
    }
  };
}

export function aiMove() {
  return {
    type: types.AI_MOVE,
  };
}
