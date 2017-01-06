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
        'O', '' , '' ,
        '' , 'O', ''
      ),
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        '', '', '',
        '', '', '',
        '', '', ''],
      currentMove: playerType.HUMAN,
      gameState: gameState.PLAYING
    }));
  });

  it('handles MOVE - player non-winning move', () => {
    const action = {
      type: types.MOVE,
      move: {
        type: playerType.HUMAN,
        position: 3
      }
    };
    const initialState = Map({
      grid: List.of(
        '', '', '',
        '', '', '',
        '', '', ''),
      currentMove: playerType.HUMAN,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        '',  '', '',
        'O', '', '',
        '' ,  '', ''
      ],
      currentMove: playerType.COMPUTER,
      gameState: gameState.PLAYING
    }));
  });

  it('handles MOVE - player non-winning move resulting in stalemate', () => {
    const action = {
      type: types.MOVE,
      move: {
        type: playerType.HUMAN,
        position: 6
      }
    };
    const initialState = Map({
      grid: List.of(
        'O', 'X', 'O',
        'O', 'X', 'X',
        '' , 'O', 'O'
      ),
      currentMove: playerType.COMPUTER,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'O', 'X', 'O',
        'O', 'X', 'X',
        'O', 'O', 'O'
      ],
      gameState: gameState.STALEMATE
    }));
  });

  it('handles MOVE - player winning move resulting in player win', () => {
    const action = {
      type: types.MOVE,
      move: {
        type: playerType.HUMAN,
        position: 2
      }
    };
    const initialState = Map({
      grid: List.of(
        'O', 'O', '',
        'X', 'X', '',
        '',  '',  ''
      ),
      currentMove: playerType.COMPUTER,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'O', 'O', 'O',
        'X', 'X', '',
        '',  '',  ''
      ],
      gameState: gameState.HUMAN_WIN
    }));
  });

});
