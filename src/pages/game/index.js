import React from 'react';
import { connect } from 'react-redux';
import Page from '..';
import Product from './product';

const Game = ({ products, money }) => {
  const showMoney = `${money}$`;

  return (
    <Page>
      <div className="container">
        <div className="col p-3">
          {products.map((product, index) => (
            <Product productIndex={index} />
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
  products: state.products,
  money: state.money
});

export default connect(mapStateToProps)(Game);
