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
    image, initialPrice, unlockPrice, unlock, managerImage, managerUnlockPrice, managerUnlocked
  } = product;
  const [price, setPrice] = useState(initialPrice);
  const [productMoney, setProductMoney] = useState(0);
  const [completionPurcent, setCompletionPurcent] = useState(0);
  const [managerAvailable, setManagerAvailable] = useState(false);
  const [nextLevel, setNextLevel] = useState({
    level: 2,
    moneyRequired: price * 2,
    activated: false
  });
  const { level, moneyRequired, activated } = nextLevel;
  const delay = initialPrice * 0.1;
  const addMoney = () => {
    setMoney(money + price);
    setProductMoney(productMoney + price);
  };

  const buyNextLevel = () => {
    setPrice(Math.round(price * 1.25));
    setNextLevel({
      level: level + 1,
      moneyRequired: moneyRequired * 2,
      activated: false
    });
    setMoney(money - moneyRequired);
    setCompletionPurcent(Math.round((productMoney * 100) / moneyRequired));
  };

  const addManager = () => {
    setMoney(money - managerUnlockPrice);
    const updatedProducts = [...products];
    updatedProducts[productIndex].managerUnlocked = !managerUnlocked;
    setProducts(updatedProducts);
  };

  const showPrice = `${price}$`;
  const showProductMoney = `${productMoney}$`;
  const showNextLevel = `Buy for ${moneyRequired}$`;
  const showCurrentLevel = `Level ${level - 1}`;
  const showManagerUnlockPrice = `${managerUnlockPrice}$`;

  useEffect(() => {
    if (money >= moneyRequired && !activated) {
      setNextLevel({ ...nextLevel, activated: true });
    }
    if (money < moneyRequired && activated) {
      setNextLevel({ ...nextLevel, activated: false });
    }
    if (money >= managerUnlockPrice && unlock) {
      setManagerAvailable(true);
    } else {
      setManagerAvailable(false);
    }
    setCompletionPurcent(Math.round((money * 100) / moneyRequired));
  }, [money, product]);

  useEffect(() => {
    if (managerUnlocked) {
      const timer = setTimeout(() => addMoney(), delay * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
    };
  });
  return (
    <div>
      <Row>
        <Col xs={5}>
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
              setMoney={setMoney}
              money={money}
            />
          )}
        <Col>
          <div>
            <button type="button" className="btn ml-2" onClick={addManager} disabled={!managerAvailable || managerUnlocked}>
              <div className="img-container">
                <img src={managerImage} className="img-fluid rounded" alt="Responsive" />
                <span className="display-4" hidden={managerUnlocked}>{showManagerUnlockPrice}</span>
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
  buyNextLevel,
  showNextLevel,
  nextLevel,
  completionPurcent
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
        <button type="button" className="btn btn-warning text-white" onClick={buyNextLevel} disabled={!nextLevel.activated}>
          <span className="display-4">{showNextLevel}</span>
        </button>
      </div>
    </Col>
  );
};

const LockedProductProperties = ({
  unlockPrice, products, setProducts, product, productIndex, setMoney, money
}) => {
  const showUnlockPrice = `Unlock for ${unlockPrice}$`;
  const { unlock } = product;

  const unlockProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].unlock = !unlock;
    setProducts(updatedProducts);
    setMoney(money - unlockPrice);
  };
  return (
    <Col className="ml-5 pl-5 text-center" xs={4}>
      <button type="button" className="card mb-2 mt-4 unlock-button" onClick={unlockProduct}>
        <div className="card-body">
          <h5 className="card-title display-3">{showUnlockPrice}</h5>
        </div>
      </button>
    </Col>
  );
};
export default Product;
