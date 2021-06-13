import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { unlockProduct } from '../../actions/game';

const LockedProductProperties = ({
  money,
  unlockPrice,
  productIndex,
  dispatch
}) => {
  const showUnlockPrice = `Unlock for ${unlockPrice}$`;
  const unlockProductButton = money >= unlockPrice;
  // const unlockProduct = () => {
  //   const updatedProducts = [...products];
  //   updatedProducts[productIndex].unlock = !unlock;
  //   setProducts(updatedProducts);
  //   setMoney(money - unlockPrice);
  // };
  return (
    <Col className="ml-5 pl-5 text-center" xs={4}>
      <button type="button" className="card mb-2 mt-4 unlock-button" onClick={() => dispatch(unlockProduct(productIndex))} disabled={!unlockProductButton}>
        <div className="card-body">
          <h5 className="card-title display-4">{showUnlockPrice}</h5>
        </div>
      </button>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  products: state.game.products,
  money: state.game.money
});
export default connect(mapStateToProps)(LockedProductProperties);
