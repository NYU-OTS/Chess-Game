import * as React from 'react';
import * as PropTypes from 'prop-types';

class Square extends React.Component<SquareProps, {}> {
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
            return 'BLACK'
    }

    squareColor() {
        if ((this.props.piece) && (this.props.piece.checked))
            return 'red'
        else 
            return this.props.square;
    }

    render() {
        const classes = "square " + this.squareColor();
        
        return (
            <button className={classes} 
                style={{color: this.pieceColor()}}
                onClick={this.props.onClick}>
                {this.props.piece ? this.props.piece.name : ' '}
            </button>
        )
    }
}

interface SquareProps {
    // Variables
    square : string,
    piece : any,
    selected : boolean,
    
    // Functions
    onClick : (loc: any) => void,
}

/*
Square.propTypes = {
    square: PropTypes.string.isRequired,
    piece: PropTypes.object,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};
*/

export default Square;