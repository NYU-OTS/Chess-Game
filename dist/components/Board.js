"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Square_js_1 = require("./Square.js");
const actions_js_1 = require("../actions.js");
class Board extends React.Component {
    handleSelect(loc) {
        /*
        Piece already selected:
            Select on same piece:
                * Deselect current piece
            Select on piece of same color:
                * Select new piece
            Select on empty space or piece of other color:
                * Deselect current piece
                * Dispatch action to handle move
        No Piece is selected:
            Select on piece of correct player:
                * Select new piece
            Select on empty space or piece of other player:
                * Do nothing
        */
        const cell = this.props.grid[loc.row][loc.col];
        if (this.props.selectedSquare) {
            if ((loc.row === this.props.selectedSquare.row) && (loc.col === this.props.selectedSquare.col)) {
                this.props.deselectPiece();
            }
            else if (cell && (cell.color === this.props.playerTurn)) {
                this.props.selectPiece(loc);
            }
            else {
                this.props.deselectPiece();
                this.handleMove(this.props.selectedSquare, loc);
            }
        }
        else {
            if (cell && (cell.color === this.props.playerTurn)) {
                this.props.selectPiece(loc);
            }
        }
    }
    handleMove(start, end) {
        // Can't take King
        if (!((this.props.grid[end.row][end.col]) && (this.props.grid[end.row][end.col].name === 'K'))) {
            if (actions_js_1.PieceEnum[this.props.grid[start.row][start.col].name].moves(this.props.grid, start, end)) {
                // Find King
                let kings = { 'WHITE': null, 'BLACK': null };
                this.props.grid.forEach((row, rInd) => {
                    row.forEach((cell, cInd) => {
                        if ((cell) && (cell.name === 'K')) {
                            kings[cell.color] = { row: rInd, col: cInd };
                        }
                    });
                });
                // Make Move if King isn't in check
                const pKing = kings[this.props.playerTurn];
                if (!actions_js_1.isCheckedIf(this.props.grid, pKing, start, end)) {
                    this.props.grid[pKing.row][pKing.col].checked = null;
                    this.props.movePiece(start, end);
                    // Must consider check/mate after each move
                    const oKing = kings[this.props.playerTurn === 'WHITE' ? 'BLACK' : 'WHITE'];
                    if (actions_js_1.isChecked(this.props.grid, this.props.grid[oKing.row][oKing.col], oKing)) {
                        // Check
                        console.log("Check");
                        this.props.grid[oKing.row][oKing.col].checked = true;
                        if (actions_js_1.isMate(this.props.grid, oKing)) {
                            // Game Over
                            console.log("Mate");
                            const message = "GAME OVER!!! Player " + this.props.grid[pKing.row][pKing.col].color + " Wins!";
                            alert(message);
                        }
                    }
                    this.props.nextTurn();
                }
            }
        }
    }
    renderSquare(row, col) {
        const index = row * 8 + col;
        const sColor = (row + col) % 2 === 0 ? 'white' : 'brown';
        const selected = (this.props.selectedSquare) && (this.props.selectedSquare.row === row) && (this.props.selectedSquare.col === col);
        return <Square_js_1.default key={index} square={sColor} piece={this.props.grid[row][col]} onClick={() => this.handleSelect({ row, col })} selected={selected}/>;
    }
    renderRow(row, rInd) {
        return row.map((ele, cInd) => (this.renderSquare(rInd, cInd)));
    }
    renderGrid() {
        const grid = this.props.grid;
        return grid.map((row, index) => (<div className="board-row" key={index}>
                {this.renderRow(row, index)}
            </div>));
    }
    render() {
        return (<div>
                {this.renderGrid()}
            </div>);
    }
}
/*
Board.propTypes = {
    grid: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.object
        ).isRequired
    ).isRequired,
    selectedSquare: PropTypes.object,
    playerTurn: PropTypes.string,

    selectPiece: PropTypes.func.isRequired,
    deselectPiece: PropTypes.func.isRequired,
    movePiece: PropTypes.func.isRequired,
    nextTurn: PropTypes.func.isRequired,
}
*/
exports.default = Board;
//# sourceMappingURL=Board.js.map