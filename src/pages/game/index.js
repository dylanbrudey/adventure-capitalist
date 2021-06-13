import React from 'react';
import { connect } from 'react-redux';
import Page from '..';
import Header from '../../components/header';
import Product from './product';

const Game = ({ money, products }) => {
  const showMoney = `${money}$`;

  return (
    <Page>
      <Header />
      <div className="container">
        <div className="col p-3">
          {products.map((product, index) => (
            <Product key={product.name} productIndex={index} />
          ))}
        </div>
      </div>
      <div className="col-4 fixed-bottom fixed-element text-center rounded ">
        <div className="">
          <div className="display-3 money text-white font-weight-bold">
            {showMoney}
          </div>
        </div>
      </div>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  products: state.game.products,
  money: state.game.money
});

export default connect(mapStateToProps)(Game);
