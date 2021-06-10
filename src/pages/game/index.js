import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Page from '..';

const Product = ({
  image,
  money,
  setMoney,
  initialPrice
}) => {
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
    setPrice(price * 2);
    setNextLevel({
      level: level + 1,
      moneyRequired: moneyRequired * 2,
      activated: false
    });
  };
  return (
    <Row>
      <Col xs={4}>
        <div>
          <button type="button" onClick={addMoney}>
            <img src={image} className="img-fluid" alt="Responsive" />
          </button>
        </div>
      </Col>
      <Col>
        <div className="card">
          <img className="card-img-top" src="..." alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
          </div>
        </div>
        <div className="progress">
          <div className="progress-bar bg-danger" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Hola</div>
        </div>
        <div className="card">
          <div className="card-body">
            <button type="button" className="btn btn-warning" onClick={buyNextLevel}>
              HERE
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const Game = () => {
  const glouglou = 'Papaye';
  const amount = 1;
  const [money, setMoney] = useState(amount);

  const gogogo = () => {
    setMoney(5);
  };
  return (
    <Page>
      <div className="container">
        <div className="row">
          <div className="col-12 display-2 border-left mb-5 text-warning font-weight-bold">
            {glouglou}
          </div>
          <div className="col-12 display-2 border-left mb-5 text-warning font-weight-bold">
            {money}
          </div>
        </div>
        <button type="button" onClick={gogogo}>Hohoho</button>
        <div className="row border rounded">
          <Product money={money} setMoney={setMoney} initialPrice={5} image="https://www.papillesetpupilles.fr/wp-content/uploads/2012/09/Papaye-%C2%A9-Still-AB-shutterstock.jpg" />
          <Product image="https://resize.prod.docfr.doc-media.fr/img/var/doctissimo/storage/images/media/images/fiche-ananas-wd/7850301-1-fre-FR/fiche-ananas-wd.jpg" />
          <Product image="https://grandest.mutualite.fr/content/uploads/sites/45/2020/05/Cover-FRAISES-730x480.jpg" />
        </div>
      </div>
    </Page>
  );
};

export default Game;
