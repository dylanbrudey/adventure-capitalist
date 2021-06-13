import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  addMoney, buyNextLevel, addManager, unlockProduct, updateCompletionBar,
  updateNextLevelAvailability,
  updateManagerAvailability
} from '../../actions/game';

const Product = ({
  money,
  products,
  productIndex,
  dispatch
}) => {
  const product = products[productIndex];
  const {
    image, price, unlockPrice, unlock, managerImage,
    managerUnlockPrice, managerUnlocked, managerAvailable, managerWorkSpeed,
    nextLevel, productMoney, completionPurcent
  } = product;
  // const [price, setPrice] = useState(price);
  // // const [productMoney, setProductMoney] = useState(0);
  // const [completionPurcent, setCompletionPurcent] = useState(0);
  // const [managerAvailable, setManagerAvailable] = useState(false);
  // const [nextLevel, setNextLevel] = useState({
  //   level: 2,
  //   moneyRequired: price * 2,
  //   activated: false
  // });
  const { level, moneyRequired, activated } = nextLevel;
  // const delay = 0.5;
  //   if (managerUnlocked) {
  //     timeeer = setInterval(() => dispatch(addMoney(productIndex)), delay * 1000);
  //   }
  //   return () => {
  //     clearInterval(timeeer);
  //   };
  // });
  // console.log(delay);
  // const addMoney = () => {
  //   setMoney(money + price);
  //   setProductMoney(productMoney + price);
  // };

  // const buyNextLevel = () => {
  //   setPrice(Math.round(price * 1.25));
  //   setNextLevel({
  //     level: level + 1,
  //     moneyRequired: moneyRequired * 2,
  //     activated: false
  //   });
  //   setMoney(money - moneyRequired);
  //   setCompletionPurcent(Math.round((productMoney * 100) / moneyRequired));
  // };

  // const addManager = () => {
  //   setMoney(money - managerUnlockPrice);
  //   const updatedProducts = [...products];
  //   updatedProducts[productIndex].managerUnlocked = !managerUnlocked;
  //   setProducts(updatedProducts);
  // };

  const showPrice = `${price}$`;
  const showProductMoney = `${productMoney}$`;
  const showNextLevel = `Buy for ${moneyRequired}$`;
  const showCurrentLevel = `Level ${level - 1}`;
  const showManagerUnlockPrice = `${managerUnlockPrice}$`;

  // useEffect(() => {
  //   // if (money >= moneyRequired && !activated) {
  //   //   dispatch(updateNextLevelAvailability(productIndex, true));
  //   // }
  //   // if (money < moneyRequired && activated) {
  //   //   dispatch(updateNextLevelAvailability(productIndex, false));
  //   // }
  //   // if (money >= managerUnlockPrice && unlock) {
  //   //   dispatch(updateManagerAvailability(productIndex, true));
  //   // } else {
  //   //   dispatch(updateManagerAvailability(productIndex, false));
  //   // }
  //   // dispatch(updateCompletionBar(productIndex));
  // }, [money, product]);

  useEffect(() => {
    if (money >= managerUnlockPrice && unlock) {
      dispatch(updateManagerAvailability(productIndex, true));
    } else {
      dispatch(updateManagerAvailability(productIndex, false));
    }
  }, [money]);

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

  useEffect(() => {
    if (managerUnlocked) {
      setInterval(() => dispatch(addMoney(productIndex)),
        managerWorkSpeed * 1000);
    }
  }, [managerUnlocked]);

  return (
    <div>
      <Row>
        <Col xs={5}>
          <div>
            <button type="button" className="btn" onClick={() => dispatch(addMoney(productIndex))} disabled={!unlock}>
              <div className="img-container">
                <img src={image} className="img-fluid rounded" alt="Responsive" />
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
        <Col>
          <div>
            <button type="button" className="btn ml-2" onClick={() => dispatch(addManager(productIndex))} disabled={!managerAvailable || managerUnlocked}>
              <div className="img-container">
                <img src={managerImage} className="img-fluid rounded" alt="Responsive" />
                <span className="display-4" hidden={managerUnlocked}>{showManagerUnlockPrice}</span>
                <span className="display-4" hidden={!managerUnlocked}>Hired</span>
                <div className="text-block-manager-work-speed">
                  <span className="display-4">{`${managerWorkSpeed}s`}</span>
                </div>
                {/* <span className="display-4 bg-warning  p-1 pl-5 pr-5 mt-1">Buy</span> */}
              </div>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

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
export default connect(mapStateToProps)(Product);
