import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { buyNextLevel } from '../../actions/game';

const UnlockedProductProperties = ({
  showProductMoney,
  showNextLevel,
  nextLevel,
  completionPurcent,
  productIndex,
  dispatch
}) => {
  const showCompletionPurcent = `${completionPurcent}%`;
  return (
    <Col className="ml-5 pl-5 text-center" xs={4}>
      <div className="card mb-2 mt-4">
        <div className="card-body">
          <h5 className="card-title display-3">{showProductMoney}</h5>
        </div>
      </div>
      <div className="progress mb-2">
        <div className="progress-bar bg-dark" role="progressbar" style={{ width: showCompletionPurcent }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> </div>
      </div>
      <div className="card">
        <button type="button" className="btn btn-warning text-white" onClick={() => dispatch(buyNextLevel(productIndex))} disabled={!nextLevel.activated}>
          <span className="display-5">{showNextLevel}</span>
        </button>
      </div>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  products: state.game.products,
  money: state.game.money
});
export default connect(mapStateToProps)(UnlockedProductProperties);
