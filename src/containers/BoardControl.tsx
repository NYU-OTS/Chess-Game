import { connect } from 'react-redux';
import { selectPiece, deselectPiece, movePiece, nextTurn } from '../actions.js';
import Board from '../components/Board.js';

const mapStateToProps = (state: any) => ({
    grid: state.grid,
    selectedSquare: state.selected,
    playerTurn: state.turn
});

const mapDispatchToProps = (dispatch: (action: any) => void) => ({
    selectPiece: (loc: any) => dispatch(selectPiece(loc)),
    deselectPiece: () => dispatch(deselectPiece()),
    movePiece: (start: any, end: any) => dispatch(movePiece(start, end)),
    nextTurn: () => dispatch(nextTurn())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);