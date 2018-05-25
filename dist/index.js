"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const reducers_js_1 = require("./reducers.js");
const Game_1 = require("./components/Game");
require("./index.css");
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
const store = redux_1.createStore(reducers_js_1.default, initialState);
ReactDOM.render(<react_redux_1.Provider store={store}>
        <Game_1.default />
    </react_redux_1.Provider>, document.getElementById('root'));
function initGame(grid) {
    return grid.map((row, index) => {
        return row.map((ele) => {
            if (ele !== ' ')
                return { 'name': ele, 'color': (index < 2 ? 'BLACK' : (index > 5 ? 'WHITE' : null)) };
            else
                return null;
        });
    });
}
//# sourceMappingURL=index.js.map