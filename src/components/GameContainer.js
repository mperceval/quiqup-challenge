import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../actions/actionCreators';
import { playerType } from '../constants';

import Grid from './Grid';

class GameContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  render() {
    const { grid:data, currentMove, gameState } = this.props;
    return (
      <div>
        <h1>Game Container</h1>
        <Grid
          data={data}
          currentMove={currentMove}
          onButtonClick={this.onButtonClick}/>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState){
    const { currentMove } = this.props;
    const { aiMove } = this.props.actions;
    if (currentMove === playerType.AI) {
      aiMove();
    }
  }

  onButtonClick(e) {
    const { currentMove } = this.props;
    const { playerMove } = this.props.actions;
    const { id:pos } = e.target;
    if (currentMove === playerType.PLAYER) {
      console.log(pos);
      playerMove(pos);
    }
  }
}

function mapStateToProps(state, ownProps) {
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
