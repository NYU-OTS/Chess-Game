import { MOVE_PIECE, SELECT_PIECE, DESELECT_PIECE, NEXT_TURN, UNCHECK, CHECK } from './actions.js';

//////////////////      Rules       //////////////////

function deepCopyGrid(state: any) {
    return state.grid.map((row:Array<any>) => {
        return row.map((cell:any) => {
            if (cell)
                return Object.assign({}, cell);
            else 
                return null;
        });
    });
}

function chessApp(state: any, action: any) {
    switch (action.type) {
        case MOVE_PIECE:
            console.log("Moving Piece");

            const moveState = Object.assign({}, state);
            moveState.grid = deepCopyGrid(state);
            
            // Mutate
            moveState.grid[action.end.row][action.end.col] = moveState.grid[action.start.row][action.start.col];
            moveState.grid[action.start.row][action.start.col] = null;

            return moveState;
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
            });
        case UNCHECK:
            const unState = Object.assign({}, state);
            unState.grid = deepCopyGrid(state);

            // Mutate
            unState.grid[action.location.row][action.location.col].checked = null;
            
            return unState;
        case CHECK:
            const checkState = Object.assign({}, state);
            checkState.grid = deepCopyGrid(state);

            // Mutate
            checkState.grid[action.location.row][action.location.col].checked = true;

            return checkState;
        default: 
            return state;
    }
}

export default chessApp;