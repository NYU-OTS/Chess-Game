import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PieceEnum } from '../actions';

class Square extends React.Component<SquareProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = { selected: this.props.selected };
    }

    pieceColor() {
        if (this.props.selected)
            return 'BLUE';
        else if (this.props.piece)
            return this.props.piece.color;
        else 
            return 'BLACK'
    }

    squareColor() {
        if (this.props.selected)
            return 'blue'
        else if ((this.props.piece) && (this.props.piece.checked))
            return 'red'
        else 
            return this.props.square;
    }

    render() {
        const classes = "square " + this.squareColor();
        const image = this.props.piece ? PieceEnum[this.props.piece.name][this.props.piece.color] : '/img/EMPTY.png';
        return (
            <button className={classes} 
                style={{color: this.pieceColor()}}
                onClick={this.props.onClick}>
                <img src={image} />
            </button>
        )
    }
}

interface SquareProps {
    // Variables
    square : string,
    piece : {name: string, color: string, checked: boolean},            //{ 'name': ele, 'color': (index < 2 ? 'BLACK' : (index > 5 ? 'WHITE' : null)) };
    selected : boolean,
    
    // Functions
    onClick : (loc: any) => void,
}

export default Square;