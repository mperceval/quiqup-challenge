import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { storeFake } from '../data/storeFake';
import GameContainer from '../../src/components/GameContainer';
import Grid from '../../src/components/Grid';
import Cell from '../../src/components/Cell';
import { playerTypes, gameStates } from '../../src/constants';

describe('GameContainer', () => {
	let component;
	let gridComponent;

	beforeEach(() => {
		const store = storeFake(fromJS({
      grid:[
        'E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'],
      currentMove: playerTypes.PLAYER,
      gameState: gameStates.PLAYING
    }));

		const wrapper = mount(
			<Provider store={store}>
				<GameContainer />
			</Provider>
		);

		component = wrapper.find(GameContainer);
		gridComponent = Component.find(Grid);
	});

	it('should render', () => {
		expect(Component.length).toBeTruthy();
		expect(gridComponent.length).toBeTruthy();
	});
});
