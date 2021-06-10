import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Page from '..';

const Product = ({
  money,
  setMoney,
  product
}) => {
  const { image, initialPrice, unlock } = product;
  const [price, setPrice] = useState(initialPrice);
  const [productMoney, setProductMoney] = useState(0);
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
        </div>
      </Col>
      <UnlockedProductProperties
        showProductMoney={showProductMoney}
        buyNextLevel={buyNextLevel}
        showNextLevel={showNextLevel}
        nextLevel={nextLevel}
      />
      <LockedProductProperties />
    </Row>
  );
};

const UnlockedProductProperties = ({
  showProductMoney,
  buyNextLevel,
  showNextLevel,
  nextLevel
}) => (
  <Col className="ml-5 pl-5 text-center" xs={6}>
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title display-3">{showProductMoney}</h5>
      </div>
    </div>
    <div className="progress mb-2">
      <div className="progress-bar bg-danger" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Hola</div>
    </div>
    <div className="card">
      <button type="button" className="btn btn-warning" onClick={buyNextLevel} disabled={!nextLevel.activated}>
        {showNextLevel}
      </button>
    </div>
  </Col>
);

const LockedProductProperties = () => (
  <Col className="ml-5 pl-5 text-center" xs={6}>
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title display-3">ee</h5>
      </div>
    </div>
  </Col>
);
const productList = [{
  name: 'Papaye',
  initialPrice: 5,
  image: 'https://www.papillesetpupilles.fr/wp-content/uploads/2012/09/Papaye-%C2%A9-Still-AB-shutterstock.jpg',
  unlockPrice: 0,
  unlock: true
}, {
  name: 'Ananas',
  initialPrice: 30,
  image: 'https://resize.prod.docfr.doc-media.fr/img/var/doctissimo/storage/images/media/images/fiche-ananas-wd/7850301-1-fre-FR/fiche-ananas-wd.jpg',
  unlockPrice: 300,
  unlock: false
}, {
  name: 'Fraise',
  initialPrice: 80,
  image: 'https://grandest.mutualite.fr/content/uploads/sites/45/2020/05/Cover-FRAISES-730x480.jpg',
  unlockPrice: 600,
  unlock: false
}];

const Game = () => {
  const amount = 1;
  const [money, setMoney] = useState(amount);
  const [products, setProducts] = useState(productList);
  const showMoney = `${money}$`;

  return (
    <Page>
      <div className="container">
        <div className="m-4">
          <div className="col-12 display-2 border-left mb-5 text-warning font-weight-bold">
            {showMoney}
          </div>
        </div>
        <div className="col p-3">
          {products.map((product) => {
            const { unlock, unlockPrice } = product;
            if (unlock || money >= unlockPrice) {
              return (
                <Product
                  money={money}
                  setMoney={setMoney}
                  product={product}
                  setProducts={setProducts}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </Page>
  );
};

export default Game;
