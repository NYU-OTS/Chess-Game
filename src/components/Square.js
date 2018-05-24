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
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { selected: _this.props.selected };
        return _this;
    }
    Square.prototype.pieceColor = function () {
        if (this.props.selected)
            return 'BLUE';
        else if (this.props.piece)
            return this.props.piece.color;
        else
            return 'BLACK';
    };
    Square.prototype.squareColor = function () {
        if ((this.props.piece) && (this.props.piece.checked))
            return 'red';
        else
            return this.props.square;
    };
    Square.prototype.render = function () {
        var classes = "square " + this.squareColor();
        return (<button className={classes} style={{ color: this.pieceColor() }} onClick={this.props.onClick}>
                {this.props.piece ? this.props.piece.name : ' '}
            </button>);
    };
    return Square;
}(React.Component));
/*
Square.propTypes = {
    square: PropTypes.string.isRequired,
    piece: PropTypes.object,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};
*/
exports["default"] = Square;
