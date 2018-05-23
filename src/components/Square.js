import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
    }

    pieceColor() {
        //return this.props.selected ? 'RED' : this.props.pieceColor;
        if (this.props.selected)
            return 'RED';
        else if (this.props.piece)
            return this.props.piece.color;
        else 
            return 'BLACK'
    }

    render() {
        const classes = "square " + this.props.square;
        
        return (
            <button className={classes} 
                style={{color: this.pieceColor()}}
                onClick={this.props.onClick}>
                {this.props.piece ? this.props.piece.name : ' '}
            </button>
        )
    }
}

Square.propTypes = {
    square: PropTypes.string.isRequired,
    piece: PropTypes.object,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default Square;