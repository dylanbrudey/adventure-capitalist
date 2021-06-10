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
  const [nextLevel, setNextLevel] = useState({
    level: 2,
    moneyRequired: price * 2,
    activated: false
  });
  let completionPurcent = 0;

  const addMoney = () => {
    setMoney(money + price);
    setProductMoney(productMoney + price);
    completionPurcent = Math.round((productMoney * 100) / nextLevel.moneyRequired);
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
  };

  useEffect(() => {
    if (money >= nextLevel.moneyRequired && !nextLevel.activated) {
      setNextLevel({ ...nextLevel, activated: true });
    }
  });
  const showPrice = `${price}$`;
  const showProductMoney = `${productMoney}$`;
  const showNextLevel = `Level ${nextLevel.level} : ${nextLevel.moneyRequired}$`;
  return (
    <Row>
      <Col xs={4}>
        <div>
          <button type="button" className="btn" onClick={addMoney} disabled={!unlock}>
            <div className="">
              <img src={image} className="img-fluid" alt="Responsive" />
            </div>
            <span className="display-4">{showPrice}</span>
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
      <button type="button" className="card mb-2 unlock-button" onClick={() => { setClick(!isUnlocked); }}>
        <div className="card-body">
          <h5 className="card-title display-3">{showUnlockPrice}</h5>
        </div>
      </button>
    </Col>
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
  console.log(`COMPLETION : ${completionPurcent}`);
  return (
    <Col className="ml-5 pl-5 text-center" xs={6}>
      <div className="card mb-2">
        <div className="card-body">
          <h5 className="card-title display-3">{showProductMoney}</h5>
        </div>
      </div>
      <div className="progress mb-2">
        <div className="progress-bar bg-danger" role="progressbar" style={{ width: { showCompletionPurcent } }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> </div>
      </div>
      <div className="card">
        <button type="button" className="btn btn-warning" onClick={buyNextLevel} disabled={!nextLevel.activated}>
          {showNextLevel}
        </button>
      </div>
    </Col>
  );
};

export default Product;
