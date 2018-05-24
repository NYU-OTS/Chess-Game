"use strict";
exports.__esModule = true;
var react_redux_1 = require("react-redux");
var actions_js_1 = require("../actions.js");
var Board_js_1 = require("../components/Board.js");
var mapStateToProps = function (state) { return ({
    grid: state.grid,
    selectedSquare: state.selected,
    playerTurn: state.turn
}); };
var mapDispatchToProps = function (dispatch) { return ({
    selectPiece: function (loc) { return dispatch(actions_js_1.selectPiece(loc)); },
    deselectPiece: function () { return dispatch(actions_js_1.deselectPiece()); },
    movePiece: function (start, end) { return dispatch(actions_js_1.movePiece(start, end)); },
    nextTurn: function () { return dispatch(actions_js_1.nextTurn()); }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Board_js_1["default"]);
