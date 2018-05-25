"use strict";
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var reducers_js_1 = require("./reducers.js");
var Game_1 = require("./components/Game");
require("./index.css");
var initialState = {
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
var store = redux_1.createStore(reducers_js_1["default"], initialState);
ReactDOM.render(<react_redux_1.Provider store={store}>
        <Game_1.default />
    </react_redux_1.Provider>, document.getElementById('root'));
function initGame(grid) {
    return grid.map(function (row, index) {
        return row.map(function (ele) {
            if (ele !== ' ')
                return { 'name': ele, 'color': (index < 2 ? 'BLACK' : (index > 5 ? 'WHITE' : null)) };
            else
                return null;
        });
    });
}
