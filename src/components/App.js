import React from 'react';
import GameContainer from './GameContainer';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div>Tic Tac Toe</div>
        <GameContainer />
      </div>
    );
  }
}

export default App;
