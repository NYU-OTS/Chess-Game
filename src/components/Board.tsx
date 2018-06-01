import * as React from 'react';
import * as PropTypes from 'prop-types';
import Square from './Square.js';
import { PieceEnum, isChecked, isCheckedIf, isMate } from '../actions.js';

class Board extends React.Component<BoardProps, {}> {
    
    handleSelect(loc: any) {
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
    
    handleMove(start: any, end: any) {
        
        // Can't take King
        if (!((this.props.grid[end.row][end.col]) && (this.props.grid[end.row][end.col].name === 'K'))) {

            if (PieceEnum[this.props.grid[start.row][start.col].name].moves(this.props.grid, start, end)) {
                
                // Find King
                let kings: any = { 'WHITE': null, 'BLACK': null };
                this.props.grid.forEach((row, rInd) => {
                    row.forEach((cell, cInd) => {
                        if ((cell) && (cell.name === 'K')) {
                            kings[cell.color] = { row: rInd, col: cInd };
                        }
                    });
                });

                // Make Move if King isn't in check
                const pKing = kings[this.props.playerTurn];
                if (!isCheckedIf(this.props.grid, pKing, start, end)) {
                    
                    this.props.unCheck(pKing);
                    this.props.movePiece(start, end);

                    // Must consider check/mate after each move
                    const oKing = kings[this.props.playerTurn === 'WHITE' ? 'BLACK' : 'WHITE'];
                    if (isChecked(this.props.grid, this.props.grid[oKing.row][oKing.col], oKing)) {
                        // Check
                        console.log("Check");
                        this.props.check(oKing);
                        if (isMate(this.props.grid, oKing)) {
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

    renderSquare(row: number, col: number) {
        const index = row * 8 + col;
        const sColor = (row + col) % 2 === 0 ? 'white' : 'brown';
        const selected = (this.props.selectedSquare) && (this.props.selectedSquare.row === row) && (this.props.selectedSquare.col === col);
        return <Square key={index} 
            square={sColor}
            piece = {this.props.grid[row][col]}
            onClick={() => this.handleSelect({row, col})} 
            selected={selected} />;
    }
    
    renderRow(row: any, rInd: number) {
        return row.map((ele: any, cInd: number) => (
            this.renderSquare(rInd, cInd)
        ));
    }

    renderGrid() {
        const grid = this.props.grid;
        return grid.map((row, index) => (
            <div className="board-row" key={index}>
                {this.renderRow(row, index)}
            </div>
        ));
    }

    render() {
        return (
            <div>
                {this.renderGrid()}
            </div>
        );
    }
}

interface BoardProps {
    // Variables
    grid : Array<Array<any>>,
    selectedSquare : any,
    playerTurn : string,

    // Functions
    selectPiece : (location: any) => any,
    deselectPiece : () => any,
    movePiece : (start: any, end: any) => any,
    nextTurn : () => any,
    unCheck : (location: any) => any,
    check : (location: any) => any,
}

export default Board;