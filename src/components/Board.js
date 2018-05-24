"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var Square_js_1 = require("./Square.js");
var actions_js_1 = require("../actions.js");
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.handleSelect = function (loc) {
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
        var cell = this.props.grid[loc.row][loc.col];
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
    };
    Board.prototype.handleMove = function (start, end) {
        // Can't take King
        if (!((this.props.grid[end.row][end.col]) && (this.props.grid[end.row][end.col].name === 'K'))) {
            if (actions_js_1.PieceEnum[this.props.grid[start.row][start.col].name].moves(this.props.grid, start, end)) {
                // Find King
                var kings_1 = { 'WHITE': null, 'BLACK': null };
                this.props.grid.forEach(function (row, rInd) {
                    row.forEach(function (cell, cInd) {
                        if ((cell) && (cell.name === 'K')) {
                            kings_1[cell.color] = { row: rInd, col: cInd };
                        }
                    });
                });
                // Make Move if King isn't in check
                var pKing = kings_1[this.props.playerTurn];
                if (!actions_js_1.PieceEnum['K'].isCheckedIf(this.props.grid, pKing, start, end)) {
                    this.props.grid[pKing.row][pKing.col].checked = null;
                    this.props.movePiece(start, end);
                    // Must consider check/mate after each move
                    var oKing = kings_1[this.props.playerTurn === 'WHITE' ? 'BLACK' : 'WHITE'];
                    if (actions_js_1.PieceEnum['K'].isChecked(this.props.grid, this.props.grid[oKing.row][oKing.col], oKing)) {
                        // Check
                        console.log("Check");
                        this.props.grid[oKing.row][oKing.col].checked = true;
                        if (actions_js_1.PieceEnum['K'].isMate(this.props.grid, oKing)) {
                            // Game Over
                            console.log("Mate");
                            alert('GAME OVER!!!');
                        }
                    }
                    this.props.nextTurn();
                }
            }
        }
    };
    Board.prototype.renderSquare = function (row, col) {
        var _this = this;
        var index = row * 8 + col;
        var sColor = (row + col) % 2 === 0 ? 'white' : 'brown';
        var selected = (this.props.selectedSquare) && (this.props.selectedSquare.row === row) && (this.props.selectedSquare.col === col);
        return <Square_js_1.default key={index} square={sColor} piece={this.props.grid[row][col]} onClick={function () { return _this.handleSelect({ row: row, col: col }); }} selected={selected}/>;
    };
    Board.prototype.renderRow = function (row, rInd) {
        var _this = this;
        return row.map(function (ele, cInd) { return (_this.renderSquare(rInd, cInd)); });
    };
    Board.prototype.renderGrid = function () {
        var _this = this;
        var grid = this.props.grid;
        return grid.map(function (row, index) { return (<div className="board-row" key={index}>
                {_this.renderRow(row, index)}
            </div>); });
    };
    Board.prototype.render = function () {
        return (<div>
                {this.renderGrid()}
            </div>);
    };
    return Board;
}(React.Component));
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
exports["default"] = Board;
