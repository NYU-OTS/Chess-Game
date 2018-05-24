"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import React from 'react';
const React = require("react");
//import Board from './Board.js';
const BoardControl_js_1 = require("../containers/BoardControl.js");
class Game extends React.Component {
    render() {
        return (<div className="game">
                <div className="game-board">
                    <BoardControl_js_1.default />
                </div>
            </div>);
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map