"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_js_1 = require("../actions.js");
const Board_js_1 = require("../components/Board.js");
const mapStateToProps = (state) => ({
    grid: state.grid,
    selectedSquare: state.selected,
    playerTurn: state.turn
});
const mapDispatchToProps = (dispatch) => ({
    selectPiece: (loc) => dispatch(actions_js_1.selectPiece(loc)),
    deselectPiece: () => dispatch(actions_js_1.deselectPiece()),
    movePiece: (start, end) => dispatch(actions_js_1.movePiece(start, end)),
    nextTurn: () => dispatch(actions_js_1.nextTurn())
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Board_js_1.default);
//# sourceMappingURL=BoardControl.js.map