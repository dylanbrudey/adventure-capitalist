import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addMoney, addManager, updateManagerAvailability
} from '../../actions/game';

const Manager = ({
  money,
  products,
  productIndex,
  dispatch
}) => {
  const product = products[productIndex];
  const {
    unlock, image,
    managerUnlockPrice, managerUnlocked, managerAvailable, managerWorkSpeed
  } = product;

  const showManagerUnlockPrice = `${managerUnlockPrice}$`;

  useEffect(() => {
    if (money >= managerUnlockPrice && unlock) {
      dispatch(updateManagerAvailability(productIndex, true));
    } else {
      dispatch(updateManagerAvailability(productIndex, false));
    }
  }, [money]);

  useEffect(() => {
    if (managerUnlocked) {
      setInterval(() => dispatch(addMoney(productIndex)),
        managerWorkSpeed * 1000);
    }
  }, [managerUnlocked]);

  return (
    <Col>
      <div>
        <button type="button" className="btn ml-2" onClick={() => dispatch(addManager(productIndex))} disabled={!managerAvailable || managerUnlocked}>
          <div className="img-container">
            <img src={`./images/managers/${image}.png`} className="img-fluid rounded" alt="Responsive" />
            <span className="display-5" hidden={managerUnlocked}>{showManagerUnlockPrice}</span>
            <span className="display-5" hidden={!managerUnlocked}>Hired</span>
            <div className="text-block-manager-work-speed">
              <span className="display-6">{`${managerWorkSpeed}s`}</span>
            </div>
            {/* <span className="display-4 bg-warning  p-1 pl-5 pr-5 mt-1">Buy</span> */}
          </div>
        </button>
      </div>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  products: state.game.products,
  money: state.game.money
});
export default connect(mapStateToProps)(Manager);
