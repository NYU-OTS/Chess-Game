"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_js_1 = require("./actions.js");
//////////////////      Rules       //////////////////
function chessApp(state, action) {
    switch (action.type) {
        case actions_js_1.MOVE_PIECE:
            console.log("Moving Piece");
            const newState = Object.assign({}, state);
            newState.grid[action.end.row][action.end.col] = newState.grid[action.start.row][action.start.col];
            newState.grid[action.start.row][action.start.col] = null;
            return newState;
        case actions_js_1.SELECT_PIECE:
            return Object.assign({}, state, {
                selected: { row: action.location.row, col: action.location.col }
            });
        case actions_js_1.DESELECT_PIECE:
            return Object.assign({}, state, {
                selected: null
            });
        case actions_js_1.NEXT_TURN:
            return Object.assign({}, state, {
                turn: state.turn === 'WHITE' ? 'BLACK' : 'WHITE'
            });
        default:
            return state;
    }
}
exports.default = chessApp;
//# sourceMappingURL=reducers.js.map