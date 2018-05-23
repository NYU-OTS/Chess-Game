import { MOVE_PIECE, SELECT_PIECE, DESELECT_PIECE, NEXT_TURN } from './actions.js';

//////////////////      Rules       //////////////////

function chessApp(state = [], action) {
    switch (action.type) {
        case MOVE_PIECE:
            console.log("Moving Piece");

            const newState = Object.assign({}, state);
            newState.grid[action.end.row][action.end.col] = newState.grid[action.start.row][action.start.col];
            newState.grid[action.start.row][action.start.col] = null;

            return newState;
        case SELECT_PIECE:
            return Object.assign({}, state, {
                selected: { row: action.location.row, col: action.location.col }
            });
        case DESELECT_PIECE: 
            return Object.assign({}, state, {
                selected: null
            });
        case NEXT_TURN:
            return Object.assign({}, state, {
                turn: state.turn === 'WHITE' ? 'BLACK' : 'WHITE'
            })
        default: 
            return state;
    }
}

export default chessApp;