"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
    }
    pieceColor() {
        if (this.props.selected)
            return 'BLUE';
        else if (this.props.piece)
            return this.props.piece.color;
        else
            return 'BLACK';
    }
    squareColor() {
        if ((this.props.piece) && (this.props.piece.checked))
            return 'red';
        else
            return this.props.square;
    }
    render() {
        const classes = "square " + this.squareColor();
        return (<button className={classes} style={{ color: this.pieceColor() }} onClick={this.props.onClick}>
                {this.props.piece ? this.props.piece.name : ' '}
            </button>);
    }
}
/*
Square.propTypes = {
    square: PropTypes.string.isRequired,
    piece: PropTypes.object,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};
*/
exports.default = Square;
//# sourceMappingURL=Square.js.map