import { actionsType } from '../actions/game';
import productList from '../components/data';

const initialState = { money: 1000, products: productList };

const addMoney = (state = initialState, action) => {
  let currentState = { ...state };
  const currentPrice = state.products[action.productIndex].price;
  const currentProductMoney = state.products[action.productIndex].productMoney;
  currentState = { ...currentState, money: currentState.money + currentPrice };
  currentState = {
    ...currentState,
    products: currentState.products.map((product, index) => {
      if (index === action.productIndex) {
        return {
          ...product,
          productMoney: currentProductMoney + currentPrice
        };
      }
      return product;
    })
  };
  return currentState;
};

const buyNextLevel = (state = initialState, action) => {
  let currentState = { ...state };
  const { level, moneyRequired } = currentState.products[action.productIndex].nextLevel;
  const { price } = currentState.products[action.productIndex];
  currentState = {
    ...currentState,
    products: currentState.products.map((product, index) => {
      if (index === action.productIndex) {
        return {
          ...product,
          price: Math.round(price * 1.25),
          nextLevel: {
            level: level + 1,
            moneyRequired: moneyRequired * 2,
            activated: false
          }
        };
      }
      return product;
    })
  };
  currentState = { ...currentState, money: currentState.money - moneyRequired };

  return currentState;
};

const addManager = (state = initialState, action) => {
  let currentState = { ...state };
  const { managerUnlockPrice } = currentState.products[action.productIndex];
  currentState = { ...currentState, money: currentState.money - managerUnlockPrice };
  currentState = {
    ...currentState,
    products: currentState.products.map((product, index) => {
      if (index === action.productIndex) {
        return {
          ...product,
          managerUnlocked: true
        };
      }
      return product;
    })
  };

  return currentState;
};

const updateNextLevelAvailability = (state = initialState, action) => {
  let currentState = { ...state };
  if (action.available) {
    currentState = {
      ...currentState,
      products: currentState.products.map((product, index) => {
        if (index === action.productIndex) {
          return {
            ...product,
            nextLevel: { ...product.nextLevel, activated: true }
          };
        }
        return product;
      })
    };
  } else {
    currentState = {
      ...currentState,
      products: currentState.products.map((product, index) => {
        if (index === action.productIndex) {
          return {
            ...product,
            nextLevel: { ...product.nextLevel, activated: false }
          };
        }
        return product;
      })
    };
  }

  return currentState;
};

const updateManagerAvailability = (state = initialState, action) => {
  let currentState = { ...state };
  if (action.available) {
    currentState = {
      ...currentState,
      products: currentState.products.map((product, index) => {
        if (index === action.productIndex) {
          return {
            ...product,
            managerAvailable: true
          };
        }
        return product;
      })
    };
  } else {
    currentState = {
      ...currentState,
      products: currentState.products.map((product, index) => {
        if (index === action.productIndex) {
          return {
            ...product,
            managerAvailable: false
          };
        }
        return product;
      })
    };
  }

  return currentState;
};

const updateCompletionBar = (state = initialState, action) => {
  let currentState = { ...state };
  const { moneyRequired } = currentState.products[action.productIndex].nextLevel;

  currentState = {
    ...currentState,
    products: currentState.products.map((product, index) => {
      if (index === action.productIndex) {
        return {
          ...product,
          completionPurcent: Math.round((currentState.money * 100) / moneyRequired)
        };
      }
      return product;
    })
  };

  return currentState;
};

const unlockProduct = (state = initialState, action) => {
  let currentState = { ...state };
  const { unlock, unlockPrice } = currentState.products[action.productIndex];

  currentState = {
    ...currentState,
    products: currentState.products.map((product, index) => {
      if (index === action.productIndex) {
        return {
          ...product,
          unlock: !unlock
        };
      }
      return product;
    })
  };

  currentState = { ...currentState, money: currentState.money - unlockPrice };

  return currentState;
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_MONEY:
      return addMoney(state, action);
    case actionsType.BUY_NEXT_LEVEL:
      return buyNextLevel(state, action);
    case actionsType.ADD_MANAGER:
      return addManager(state, action);
    case actionsType.UPDATE_COMPLETION:
      return updateCompletionBar(state, action);
    case actionsType.UPDATE_NEXT_LEVEL:
      return updateNextLevelAvailability(state, action);
    case actionsType.UPDATE_MANAGER_AVAILABILITY:
      return updateManagerAvailability(state, action);
    case actionsType.UNLOCK_PRODUCT:
      return unlockProduct(state, action);
    default:
      return state;
  }
};

export default game;
