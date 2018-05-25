"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*  Action Types    */
exports.MOVE_PIECE = 'MOVE_PIECE';
exports.SELECT_PIECE = 'SELECT_PIECE';
exports.DESELECT_PIECE = 'DESELECT_PIECE';
exports.NEXT_TURN = 'NEXT_TURN';
/*  Constants   */
function isPawnMove(grid, start, end) {
    const piece = grid[start.row][start.col];
    const direction = piece.color === 'WHITE' ? -1 : 1;
    ///     Empty Space Move    ///
    if ((start.col === end.col) && (grid[end.row][end.col] === null)) {
        // Double Move
        if ((end.row - start.row) === direction * 2) {
            // First Move
            if (start.row === (piece.color === 'WHITE' ? 6 : 1)) {
                // Cant jump over piece
                if (grid[start.row + direction][start.col] === null) {
                    return true;
                }
            }
        }
        else if ((end.row - start.row) === direction) {
            return true;
        }
    }
    ///     Attack Move     ///
    if ((Math.abs(start.col - end.col) === 1) && ((end.row - start.row) === direction)) {
        // Enemy exists
        if (grid[end.row][end.col]) {
            return true;
        }
    }
    return false;
}
function isRookMove(grid, start, end) {
    const piece = grid[start.row][start.col];
    // Valid end location
    if ((grid[end.row][end.col] === null) || (grid[end.row][end.col].color !== piece.color)) {
        // Correct Direction
        if (start.row === end.row) {
            // Can't jump over pieces
            const dir = start.col > end.col ? -1 : 1;
            for (let i = 1; i < Math.abs(end.col - start.col); i++) {
                if (grid[start.row][start.col + (i * dir)])
                    return false;
            }
            return true;
        }
        else if (start.col === end.col) {
            // Can't jump over
            const dir = start.row > end.row ? -1 : 1;
            for (let i = 1; i < Math.abs(end.row - start.row); i++) {
                if (grid[start.row + (i * dir)][start.col])
                    return false;
            }
            return true;
        }
    }
    return false;
}
function isKnightMove(grid, start, end) {
    const piece = grid[start.row][start.col];
    // Valid end location
    if ((grid[end.row][end.col] === null) || (grid[end.row][end.col].color !== piece.color)) {
        // Check valid move 
        if ((Math.abs(start.row - end.row) === 2) && (Math.abs(start.col - end.col) === 1)) {
            return true;
        }
        else if ((Math.abs(start.row - end.row) === 1) && (Math.abs(start.col - end.col) === 2)) {
            return true;
        }
    }
    return false;
}
function isBishopMove(grid, start, end) {
    const piece = grid[start.row][start.col];
    // Valid end location
    if ((grid[end.row][end.col] === null) || (grid[end.row][end.col].color !== piece.color)) {
        // Valid Move
        if (Math.abs(start.row - end.row) === Math.abs(start.col - end.col)) {
            // Can't jump over
            const rowDir = start.row > end.row ? -1 : 1;
            const colDir = start.col > end.col ? -1 : 1;
            for (let i = 1; i < Math.abs(start.row - end.row); i++) {
                if (grid[start.row + (i * rowDir)][start.col + (i * colDir)])
                    return false;
            }
            return true;
        }
    }
}
function isQueenMove(grid, start, end) {
    return isRookMove(grid, start, end) || isBishopMove(grid, start, end);
}
function isKingMove(grid, start, end) {
    const piece = grid[start.row][start.col];
    // Valid end location
    if ((grid[end.row][end.col] === null) || (grid[end.row][end.col].color !== piece.color)) {
        // Valid Move
        if ((Math.abs(start.row - end.row) <= 1) && (Math.abs(start.col - end.col) <= 1)) {
            // Not in check
            return !isChecked(grid, piece, end);
        }
    }
    return false;
}
////    Game Check Moves    ////
function isChecked(grid, king, loc) {
    let check = false;
    grid.forEach((row, rInd) => {
        row.forEach((cell, cInd) => {
            if ((cell) && (cell.color !== king.color)) {
                if (exports.PieceEnum[cell.name].moves(grid, { row: rInd, col: cInd }, loc)) {
                    check = true;
                }
            }
        });
    });
    return check;
}
exports.isChecked = isChecked;
function isCheckedIf(grid, kingLoc, start, end) {
    const newGrid = grid.slice().map(row => {
        return row.slice();
    });
    newGrid[end.row][end.col] = newGrid[start.row][start.col];
    newGrid[start.row][start.col] = null;
    // Special case: king moves
    if (newGrid[end.row][end.col].name === 'K') {
        kingLoc = end;
    }
    const king = newGrid[kingLoc.row][kingLoc.col];
    return isChecked(newGrid, king, kingLoc);
}
exports.isCheckedIf = isCheckedIf;
function isMate(grid, loc) {
    const possibleMoves = [];
    const king = grid[loc.row][loc.col];
    // All available pieces to player
    grid.forEach((row, rInd) => {
        row.forEach((cell, cInd) => {
            if ((cell) && (cell.color === king.color)) {
                // Every possible move that can be made
                grid.forEach((newRow, rInd2) => {
                    newRow.forEach((move, cInd2) => {
                        const start = { row: rInd, col: cInd };
                        const end = { row: rInd2, col: cInd2 };
                        if (exports.PieceEnum[cell.name].moves(grid, start, end)) {
                            if (!isCheckedIf(grid, loc, start, end)) {
                                possibleMoves.push(cell);
                            }
                        }
                    });
                });
            }
        });
    });
    return !(possibleMoves.length > 0);
}
exports.isMate = isMate;
/*
export const PieceEnum: {
    'P': {name: string, moves: (grid: Array<Array<any>>, start: any, end: any) => boolean, black: string, white: string},
    'R': {name: string, moves: (grid: Array<Array<any>>, start: any, end: any) => boolean, image: null},
    'H': {name: string, moves: (grid: Array<Array<any>>, start: any, end: any) => boolean, image: null},
    'B': {name: string, moves: (grid: Array<Array<any>>, start: any, end: any) => boolean, image: null},
    'Q': {name: string, moves: (grid: Array<Array<any>>, start: any, end: any) => boolean, image: null},
    'K': {name: string, moves: (grid: Array<Array<any>>, start: any, end: any) => boolean, image: null},
    [key: string]: any,
} = */
exports.PieceEnum = Object.freeze({
    'P': { name: 'PAWN', moves: isPawnMove, BLACK: '/img/PAWN_BLACK.png', WHITE: '/img/PAWN_WHITE.png' },
    'R': { name: 'ROOK', moves: isRookMove, BLACK: '/img/ROOK_BLACK.png', WHITE: '/img/ROOK_WHITE.png' },
    'H': { name: 'KNIGHT', moves: isKnightMove, BLACK: '/img/KNIGHT_BLACK.png', WHITE: '/img/KNIGHT_WHITE.png' },
    'B': { name: 'BISHOP', moves: isBishopMove, BLACK: '/img/BISHOP_BLACK.png', WHITE: '/img/BISHOP_WHITE.png' },
    'Q': { name: 'QUEEN', moves: isQueenMove, BLACK: '/img/QUEEN_BLACK.png', WHITE: '/img/QUEEN_WHITE.png' },
    'K': { name: 'KING', moves: isKingMove, BLACK: '/img/KING_BLACK.png', WHITE: '/img/KING_WHITE.png' }
});
/*  Action Creators */
function movePiece(start, end) {
    return { type: exports.MOVE_PIECE, start, end };
}
exports.movePiece = movePiece;
function selectPiece(location) {
    return { type: exports.SELECT_PIECE, location };
}
exports.selectPiece = selectPiece;
function deselectPiece() {
    return { type: exports.DESELECT_PIECE };
}
exports.deselectPiece = deselectPiece;
function nextTurn() {
    return { type: exports.NEXT_TURN };
}
exports.nextTurn = nextTurn;
//# sourceMappingURL=actions.js.map