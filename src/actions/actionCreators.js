import * as types from './actionTypes';
import { playerType } from '../constants';

export function resetGame() {
  return {
    type: types.RESET_GAME
  };
}

export function playerMove(position) {
  return {
    type: types.PLAYER_MOVE,
    move: {
      playerType: playerType.PLAYER,
      position
    }
  };
}

export function aiMove() {
  return {
    type: types.AI_MOVE,
  };
}
