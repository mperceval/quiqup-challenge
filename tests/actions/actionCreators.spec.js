import { expect } from 'chai';

import * as types from '../../src/actions/actionTypes';
import * as actions from '../../src/actions/actionCreators';
import { playerTypes } from '../../src/constants';

describe('actionCreators', ()=> {
  it('should create an action to reset a game', () => {
    const expectedAction = {
      type: types.RESET_GAME
    };
    const actualAction = actions.resetGame();
    expect(expectedAction).to.deep.equal(actualAction);
  });

  it('should create an action to represent a player move', () => {
    const expectedAction = {
      type: types.PLAYER_MOVE,
      move: {
        playerType: playerTypes.PLAYER,
        position: 1
      }
    };
    const actualAction = actions.playerMove(1);
    expect(expectedAction).to.deep.equal(actualAction);
  });

  it('should create an action to trigger an ai move', () => {
    const expectedAction = {
      type: types.AI_MOVE
    };
    const actualAction = actions.aiMove();
    expect(expectedAction).to.deep.equal(actualAction);
  });
});
