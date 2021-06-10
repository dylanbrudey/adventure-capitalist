import React, { useState } from 'react';
import Page from '..';
import Product from './product';

const productList = [{
  name: 'Papaye',
  initialPrice: 5,
  image: 'https://www.papillesetpupilles.fr/wp-content/uploads/2012/09/Papaye-%C2%A9-Still-AB-shutterstock.jpg',
  unlockPrice: 0,
  unlock: true,
  managerUnlockPrice: 1000,
  managerUnlocked: false,
  managerImage: 'https://www.pngrepo.com/png/23036/180/man.png'
}, {
  name: 'Ananas',
  initialPrice: 30,
  image: 'https://resize.prod.docfr.doc-media.fr/img/var/doctissimo/storage/images/media/images/fiche-ananas-wd/7850301-1-fre-FR/fiche-ananas-wd.jpg',
  unlockPrice: 300,
  unlock: false,
  managerUnlockPrice: 4000,
  managerUnlocked: false,
  managerImage: 'https://www.pngrepo.com/png/51675/180/man.png'
}, {
  name: 'Fraise',
  initialPrice: 80,
  image: 'https://grandest.mutualite.fr/content/uploads/sites/45/2020/05/Cover-FRAISES-730x480.jpg',
  unlockPrice: 1200,
  unlock: false,
  managerUnlockPrice: 8000,
  managerUnlocked: false,
  managerImage: 'https://www.pngrepo.com/png/91859/180/man.png'
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
          {products.map((product, index) => {
            const { unlock, unlockPrice } = product;
            if (unlock || money >= unlockPrice) {
              return (
                <Product
                  money={money}
                  setMoney={setMoney}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                  productIndex={index}
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
