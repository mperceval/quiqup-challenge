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

  it('handles PLAYER_MOVE - player non-winning move', () => {
    const action = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerType.PLAYER,
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

  it('handles AI_MOVE - AI non-winning move', () => {
    const action = {
      type: types.AI_MOVE
    };
    const initialState = Map({
      grid: List.of(
        'E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'),
      currentMove: playerType.AI,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'X', 'E', 'E',
        'E', 'E', 'E',
        'E' ,'E', 'E'
      ],
      currentMove: playerType.PLAYER,
      gameState: gameState.PLAYING
    }));
  });

  it('handles PLAYER_MOVE - player non-winning move resulting in stalemate', () => {
    const action = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerType.PLAYER,
        position: 7
      }
    };
    const initialState = Map({
      grid: List.of(
        'O', 'X', 'O',
        'O', 'X', 'X',
        'X' ,'E', 'O'
      ),
      currentMove: playerType.PLAYER,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'O', 'X', 'O',
        'O', 'X', 'X',
        'X', 'O', 'O'
      ],
      gameState: gameState.DRAW
    }));
  });

  it('handles AI_MOVE - AI non-winning move resulting in stalemate', () => {
    const action = {
      type: types.AI_MOVE
    };
    const initialState = Map({
      grid: List.of(
        'X', 'O', 'X',
        'X', 'O', 'O',
        'O', 'E', 'X'),
      currentMove: playerType.AI,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'X', 'O', 'X',
        'X', 'O', 'O',
        'O' ,'X', 'X'
      ],
      gameState: gameState.DRAW
    }));
  });

  it('handles PLAYER_MOVE - player winning move resulting in player win', () => {
    const action = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerType.PLAYER,
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

  it('handles AI - AI winning move resulting in AI win', () => {
    const action = {
      type: types.AI_MOVE,
    };
    const initialState = Map({
      grid: List.of(
        'X', 'X', 'E',
        'O', 'O', 'E',
        'E', 'E', 'E'
      ),
      currentMove: playerType.AI,
      gameState: gameState.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'X', 'X', 'X',
        'O', 'O', 'E',
        'E', 'E', 'E'
      ],
      gameState: gameState.AI_WIN
    }));
  });
});
