import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions/actionCreators';
import { playerTypes, gameStates } from '../constants';

import Grid from './Grid';
import ResetButton from './ResetButton';

class GameContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onGridCellClick = this.onGridCellClick.bind(this);
    this.onResetGameClick = this.onResetGameClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    const { currentMove } = this.props;
    const { aiMove } = this.props.actions;
    if (currentMove === playerTypes.AI) {
      aiMove();
    }
  }

  onGridCellClick(e) {
    const { currentMove } = this.props;
    const { playerMove } = this.props.actions;
    const { id:pos } = e.target;
    if (currentMove === playerTypes.PLAYER) {

      playerMove(pos);
    }
  }

  onResetGameClick() {
    const { resetGame } = this.props.actions;
    resetGame();
  }

  render() {
    const { grid:data, currentMove, gameState } = this.props;
    let message = '';
    let messageClass = '';

    switch (gameState) {
      case gameStates.PLAYER_WIN:
        message = 'Congratulations - You Won!';
        messageClass = 'player-won';
        break;

      case gameStates.AI_WIN:
        message = 'Bad Luck - You Lost!';
        messageClass = 'ai-won';
        break;

      case gameStates.DRAW:
        message = 'Stalemate!';
        messageClass = 'draw';
        break;
    }

    return (
      <div>
        <div className="title">Tic Tac Toe - M. Perceval</div>
        <Grid
          data={data}
          currentMove={currentMove}
          onGridCellClick={this.onGridCellClick}
          disableGrid={gameState !== gameStates.PLAYING}/>
        <div className="results">
          <h1 className="messageClass">{message}</h1>
          <ResetButton onClick={this.onResetGameClick}/>
        </div>
      </div>
    );
  }
}

GameContainer.propTypes = {
  currentMove: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  grid: PropTypes.object.isRequired,
  gameState: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log('GameContainer - mapStateToProps - state : ', state);
  return {
    grid: state.get('grid'),
    currentMove: state.get('currentMove'),
    gameState: state.get('gameState')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
