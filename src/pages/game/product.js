import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const Product = ({
  money,
  setMoney,
  product,
  products,
  setProducts,
  productIndex
}) => {
  const {
    image, initialPrice, unlockPrice, unlock
  } = product;
  const [price, setPrice] = useState(initialPrice);
  const [productMoney, setProductMoney] = useState(0);
  const [completionPurcent, setCompletionPurcent] = useState(0);
  const [nextLevel, setNextLevel] = useState({
    level: 2,
    moneyRequired: price * 2,
    activated: false
  });

  const addMoney = () => {
    setMoney(money + price);
    setProductMoney(productMoney + price);
  };

  const buyNextLevel = () => {
    const { level, moneyRequired } = nextLevel;
    setPrice(Math.round(price * 1.25));
    setNextLevel({
      level: level + 1,
      moneyRequired: moneyRequired * 2,
      activated: false
    });
    setMoney(money - nextLevel.moneyRequired);
    setCompletionPurcent(Math.round((productMoney * 100) / nextLevel.moneyRequired));
  };

  const showPrice = `${price}$`;
  const showProductMoney = `${productMoney}$`;
  const showNextLevel = `Buy for ${nextLevel.moneyRequired}$`;
  const showCurrentLevel = `Level ${nextLevel.level - 1}`;

  useEffect(() => {
    if (money >= nextLevel.moneyRequired && !nextLevel.activated) {
      setNextLevel({ ...nextLevel, activated: true });
    }
    if (money < nextLevel.moneyRequired && nextLevel.activated) {
      setNextLevel({ ...nextLevel, activated: false });
    }
    setCompletionPurcent(Math.round((money * 100) / nextLevel.moneyRequired));
  });
  return (
    <Row>
      <Col>
        <div>
          <button type="button" className="btn" onClick={addMoney} disabled={!unlock}>
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
          <button type="button" className="btn btn-dark" onClick={buyNextLevel} hidden>OHOHO</button>
        </div>
      </Col>
      {unlock ? (
        <UnlockedProductProperties
          showProductMoney={showProductMoney}
          buyNextLevel={buyNextLevel}
          showNextLevel={showNextLevel}
          nextLevel={nextLevel}
          completionPurcent={completionPurcent}
        />
      )
        : (
          <LockedProductProperties
            unlockPrice={unlockPrice}
            product={product}
            products={products}
            setProducts={setProducts}
            productIndex={productIndex}
          />
        )}
    </Row>
  );
};

const UnlockedProductProperties = ({
  showProductMoney,
  buyNextLevel,
  showNextLevel,
  nextLevel,
  completionPurcent
}) => {
  const showCompletionPurcent = `${completionPurcent}%`;
  return (
    <Col className="ml-5 pl-5 text-center" xs={6}>
      <div className="card mb-2 mt-4">
        <div className="card-body">
          <h5 className="card-title display-3">{showProductMoney}</h5>
        </div>
      </div>
      <div className="progress mb-2">
        <div className="progress-bar bg-danger" role="progressbar" style={{ width: showCompletionPurcent }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> </div>
      </div>
      <div className="card">
        <button type="button" className="btn btn-warning" onClick={buyNextLevel} disabled={!nextLevel.activated}>
          <span className="display-4">{showNextLevel}</span>
        </button>
      </div>
    </Col>
  );
};

const LockedProductProperties = ({
  unlockPrice, products, setProducts, product, productIndex
}) => {
  const showUnlockPrice = `Unlock for ${unlockPrice}$`;
  const [isUnlocked, setClick] = useState(false);
  const { unlock } = product;

  useEffect(() => {
    if (isUnlocked) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].unlock = !unlock;
      setProducts(updatedProducts);
    }
  });
  return (
    <Col className="ml-5 pl-5 text-center" xs={6}>
      <button type="button" className="card mb-2 mt-4 unlock-button" onClick={() => { setClick(!isUnlocked); }}>
        <div className="card-body">
          <h5 className="card-title display-3">{showUnlockPrice}</h5>
        </div>
      </button>
    </Col>
  );
};
export default Product;
