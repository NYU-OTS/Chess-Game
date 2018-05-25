"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const actions_1 = require("../actions");
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
        if (this.props.selected)
            return 'blue';
        else if ((this.props.piece) && (this.props.piece.checked))
            return 'red';
        else
            return this.props.square;
    }
    render() {
        const classes = "square " + this.squareColor();
        const image = this.props.piece ? actions_1.PieceEnum[this.props.piece.name][this.props.piece.color] : '/img/EMPTY.png';
        return (<button className={classes} style={{ color: this.pieceColor() }} onClick={this.props.onClick}>
                <img src={image}/>
            </button>);
    }
}
exports.default = Square;
//# sourceMappingURL=Square.js.map