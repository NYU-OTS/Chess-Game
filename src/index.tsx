import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chessApp from './reducers.js';
import Game from './components/Game';
//import { PieceEnum } from './actions.js';
import './index.css';



const initialState = {
    grid: [
        ['R', 'H', 'B', 'K', 'Q', 'B', 'H', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'H', 'B', 'K', 'Q', 'B', 'H', 'R']
    ],
    turn: 'WHITE',
    selected: null
};

initialState.grid = initGame(initialState.grid);
const store = createStore(chessApp, initialState);

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
);

function initGame(grid) {
    return grid.map((row, index) => {
        return row.map(ele => {
            if (ele !== ' ')
                return { 'name': ele, 'color': (index < 2 ? 'BLACK' : (index > 5 ? 'WHITE' : null)) };
            else 
                return null;
        });
    });
}