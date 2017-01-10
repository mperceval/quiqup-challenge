import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import * as types from '../../src/actions/ActionTypes';
import { playerTypes, gameStates } from '../../src/constants';
import gameReducer from '../../src/reducers/gameReducer';

describe('gameReducer', () => {
  it('should handle RESET_GAME', () => {
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
      currentMove: playerTypes.PLAYER,
      gameState: gameStates.PLAYING
    }));
  });

  it('should handle PLAYER_MOVE - player non-winning move', () => {
    const action = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerTypes.PLAYER,
        position: 3
      }
    };
    const initialState = Map({
      grid: List.of(
        'E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'),
      currentMove: playerTypes.PLAYER,
      gameState: gameStates.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'E', 'E', 'E',
        'O', 'E', 'E',
        'E' ,'E', 'E'
      ],
      currentMove: playerTypes.AI,
      gameState: gameStates.PLAYING
    }));
  });

  it('should handle AI_MOVE - AI non-winning move', () => {
    const action = {
      type: types.AI_MOVE
    };
    const initialState = Map({
      grid: List.of(
        'E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'),
      currentMove: playerTypes.AI,
      gameState: gameStates.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'X', 'E', 'E',
        'E', 'E', 'E',
        'E' ,'E', 'E'
      ],
      currentMove: playerTypes.PLAYER,
      gameState: gameStates.PLAYING
    }));
  });

  it('should handle PLAYER_MOVE - player non-winning move resulting in stalemate', () => {
    const action = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerTypes.PLAYER,
        position: 7
      }
    };
    const initialState = Map({
      grid: List.of(
        'O', 'X', 'O',
        'O', 'X', 'X',
        'X' ,'E', 'O'
      ),
      currentMove: playerTypes.PLAYER,
      gameState: gameStates.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'O', 'X', 'O',
        'O', 'X', 'X',
        'X', 'O', 'O'
      ],
      gameState: gameStates.DRAW
    }));
  });

  it('should handle AI_MOVE - AI non-winning move resulting in stalemate', () => {
    const action = {
      type: types.AI_MOVE
    };
    const initialState = Map({
      grid: List.of(
        'X', 'O', 'X',
        'X', 'O', 'O',
        'O', 'E', 'X'),
      currentMove: playerTypes.AI,
      gameState: gameStates.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'X', 'O', 'X',
        'X', 'O', 'O',
        'O' ,'X', 'X'
      ],
      gameState: gameStates.DRAW
    }));
  });

  it('should handle PLAYER_MOVE - player winning move resulting in player win', () => {
    const action = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerTypes.PLAYER,
        position: 2
      }
    };
    const initialState = Map({
      grid: List.of(
        'O', 'O', 'E',
        'X', 'X', 'E',
        'E', 'E', 'E'
      ),
      currentMove: playerTypes.AI,
      gameState: gameStates.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'O', 'O', 'O',
        'X', 'X', 'E',
        'E', 'E', 'E'
      ],
      gameState: gameStates.PLAYER_WIN
    }));
  });

  it('should handle AI - AI winning move resulting in AI win', () => {
    const action = {
      type: types.AI_MOVE,
    };
    const initialState = Map({
      grid: List.of(
        'X', 'X', 'E',
        'O', 'O', 'E',
        'E', 'E', 'E'
      ),
      currentMove: playerTypes.AI,
      gameState: gameStates.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      grid:[
        'X', 'X', 'X',
        'O', 'O', 'E',
        'E', 'E', 'E'
      ],
      gameState: gameStates.AI_WIN
    }));
  });

  it('should handle PLAYER_MOVE - player cannot select occupied cell', () => {
    const action = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerTypes.PLAYER,
        position: 3
      }
    };
    const initialState = Map({
      grid: List.of(
        'E', 'E', 'E',
        'O', 'E', 'E',
        'E', 'E', 'E'),
      currentMove: playerTypes.PLAYER,
      gameState: gameStates.PLAYING
    });
    const nextState = gameReducer(initialState, action);
    expect(nextState).to.equal(initialState);
  });
});
