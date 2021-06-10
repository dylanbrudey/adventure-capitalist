import React, { useState } from 'react';
import Page from '..';

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
          {/* <Product money={money} setMoney={setMoney} initialPrice={5} image="https://file1.pleinevie.fr/var/pleinevie/storage/images/1/4/8/148006/super-aliment-bienfaits-papaye.jpg?alias=exact1024x768_l" />
          <Product image="https://resize.prod.docfr.doc-media.fr/img/var/doctissimo/storage/images/media/images/fiche-ananas-wd/7850301-1-fre-FR/fiche-ananas-wd.jpg" />
          <Product image="https://grandest.mutualite.fr/content/uploads/sites/45/2020/05/Cover-FRAISES-730x480.jpg" /> */}
        </div>
      </div>
    </Page>
  );
};

export default Game;
