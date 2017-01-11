import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import sinon from 'sinon';

import * as types from '../../src/actions/ActionTypes';
import { playerTypes, gameStates } from '../../src/constants';
import { mapStateToProps, mapDispatchToProps } from '../../src/components/GameContainer';

// TODO: Finish tests

describe('GameContainer', () => {
	describe('mapStateToProps', () => {
		it('returns the correct props format', () => {
			const data = (Map({
		    grid: List.of(
					'E', 'E', 'E',
					'E', 'E', 'E',
					'E', 'E', 'E'
				),
				currentMove: playerTypes.PLAYER,
				gameState: gameStates.PLAYING
			}));

			const expectedResult = {
		    grid: List.of(
					'E', 'E', 'E',
					'E', 'E', 'E',
					'E', 'E', 'E'
				),
				currentMove: playerTypes.PLAYER,
				gameState: gameStates.PLAYING
			};
			const result = mapStateToProps(data, {});
			expect(result).to.deep.equal(expectedResult);
		});
	});

	describe('mapDispatchToProps', () => {
		describe('aiMove', () => {

			it('should be injected', () => {
	      const dispatch = sinon.spy();
	      const actions = mapDispatchToProps(dispatch).actions;
	      expect(actions.aiMove).be.function;
	    });
		});

		describe('playerMove', () => {
			it('should be injected', () => {
	      const dispatch = sinon.spy();
	      const result = mapDispatchToProps(dispatch);
	      expect(result.playerMove).be.function;
	    });
		});

		describe('resetGame', () => {
			it('should be injected', () => {
	      const dispatch = sinon.spy();
	      const result = mapDispatchToProps(dispatch);
	      expect(result.resetGame).be.function;
	    });
		});

	});
});
