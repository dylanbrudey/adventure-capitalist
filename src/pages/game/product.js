import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addMoney, buyNextLevel, updateCompletionBar,
  updateNextLevelAvailability
} from '../../actions/game';
import LockedProductProperties from './locked-product-properties';
import Manager from './manager';
import UnlockedProductProperties from './unlocked-product-properties';

const Product = ({
  money,
  products,
  productIndex,
  dispatch
}) => {
  const product = products[productIndex];
  const {
    image, price, unlockPrice, unlock,
    nextLevel, productMoney, completionPurcent, name
  } = product;
  const { level, moneyRequired, activated } = nextLevel;

  const showPrice = `${price}$`;
  const showProductMoney = `${productMoney}$`;
  const showNextLevel = `Buy for ${moneyRequired}$`;
  const showCurrentLevel = `Level ${level - 1}`;

  useEffect(() => {
    if (money >= moneyRequired && !activated) {
      dispatch(updateNextLevelAvailability(productIndex, true));
    }
    if (money < moneyRequired && activated) {
      dispatch(updateNextLevelAvailability(productIndex, false));
    }
  }, [money]);

  useEffect(() => {
    dispatch(updateCompletionBar(productIndex));
  }, [money]);

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  return (
    <div>
      <Row>
        <Col xs={5}>
          <div>
            <button tabIndex={productIndex} type="button" className="btn" onKeyDown={(e) => handleKeyDown(e)} onClick={() => dispatch(addMoney(productIndex))} disabled={!unlock}>
              <div className="img-container">
                <img src={`./images/products/${image}.jpg`} className="img-fluid rounded" alt={name} />
                <div className="text-block-price">
                  <span className="display-4">{showPrice}</span>
                </div>
                <div className="text-block-level">
                  <span className="display-4">{showCurrentLevel}</span>
                </div>
              </div>
            </button>
          </div>
        </Col>
        {unlock ? (
          <UnlockedProductProperties
            showProductMoney={showProductMoney}
            buyNextLevel={buyNextLevel}
            showNextLevel={showNextLevel}
            nextLevel={nextLevel}
            completionPurcent={completionPurcent}
            productIndex={productIndex}
            dispatch={dispatch}
          />
        )
          : (
            <LockedProductProperties
              money={money}
              unlockPrice={unlockPrice}
              productIndex={productIndex}
              dispatch={dispatch}
            />
          )}
        <Manager productIndex={productIndex} />
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.game.products,
  money: state.game.money
});
export default connect(mapStateToProps)(Product);
