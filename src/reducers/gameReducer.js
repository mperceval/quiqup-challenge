import { Map } from 'immutable';
import * as types from '../actions/actionTypes';
import { playerTypes } from '../constants';
import { resetGame, playerMove, aiMove } from '../game/game';


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
