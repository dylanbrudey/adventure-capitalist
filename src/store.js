import { createStore, combineReducers } from 'redux';
import game from './reducers/game';
// import thunk from 'redux-thunk';

// import products from './reducers/products';
// import test from './reducers/test';

// const productMode = (env) => {
//   if (env !== 'production') {
//     return createStore(
//       combineReducers({
//         products
//       }),
//       compose(
//         applyMiddleware(thunk),
//         // eslint-disable-next-line no-underscore-dangle
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//       )
//     );
//   }

//   return createStore(
//     combineReducers({
//       products
//     }),
//     compose(applyMiddleware(thunk))
//   );
// };

// export default productMode(process.env.NODE_ENV);

// export default createStore(
//   combineReducers({
//     products
//   }),
//   // eslint-disable-next-line no-underscore-dangle
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
  combineReducers({
    game
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
