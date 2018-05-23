import React from 'react';
//import Board from './Board.js';
import BoardControl from '../containers/BoardControl.js';

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <BoardControl />
                </div>
            </div>
        );
    }
}

export default Game;