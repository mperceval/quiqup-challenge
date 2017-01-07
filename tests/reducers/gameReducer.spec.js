import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import * as types from '../../src/actions/ActionTypes';
import { playerType, gameState } from '../../src/constants';
import gameReducer from '../../src/reducers/gameReducer';

describe('gameReducer', () => {
  it('handles RESET_GAME', () => {
    const action = {
      type: types.RESET_GAME
    };
    const initialState = Map({
      grid: List.of(
        'O', 'X', 'X',
        'O', 'E', 'E' ,
        'E', 'O', 'E'
      ),
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'],
      currentMove: playerType.PLAYER,
      gameState: gameState.PLAYING
    }));
  });

  it('handles MOVE - player non-winning move', () => {
    const action = {
      type: types.MOVE,
      move: {
        type: playerType.PLAYER,
        position: 3
      }
    };
    const initialState = Map({
      grid: List.of(
        'E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'),
      currentMove: playerType.PLAYER,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'E', 'E', 'E',
        'O', 'E', 'E',
        'E' ,'E', 'E'
      ],
      currentMove: playerType.AI,
      gameState: gameState.PLAYING
    }));
  });

  it('handles MOVE - player non-winning move resulting in stalemate', () => {
    const action = {
      type: types.MOVE,
      move: {
        type: playerType.PLAYER,
        position: 6
      }
    };
    const initialState = Map({
      grid: List.of(
        'O', 'X', 'O',
        'O', 'X', 'X',
        'E' ,'O', 'O'
      ),
      currentMove: playerType.PLAYER,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'O', 'X', 'O',
        'O', 'X', 'X',
        'O', 'O', 'O'
      ],
      gameState: gameState.DRAW
    }));
  });

  it('handles MOVE - player winning move resulting in player win', () => {
    const action = {
      type: types.MOVE,
      move: {
        type: playerType.PLAYER,
        position: 2
      }
    };
    const initialState = Map({
      grid: List.of(
        'O', 'O', 'E',
        'X', 'X', 'E',
        'E', 'E', 'E'
      ),
      currentMove: playerType.AI,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'O', 'O', 'O',
        'X', 'X', 'E',
        'E', 'E', 'E'
      ],
      gameState: gameState.PLAYER_WIN
    }));
  });

});
