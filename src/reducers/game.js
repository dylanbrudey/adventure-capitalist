import { actionsType } from '../actions/game';
import productList from '../pages/game/data';

const initialState = { money: 1000, products: productList };

// const addComment = (state, action) => {
//   const commentsUpdated = state;
//   const date = new Date();

//   const newComments = state[action.id].comments.concat({
//     date: date.toUTCString(),
//     text: action.text
//   });

//   commentsUpdated[action.id].comments = newComments;

//   return commentsUpdated;
// };

// const comments = (state = initialState, action) => {
//   switch (action.type) {
//     case actionsType.ADD_COMMENT:
//       return addComment(state, action);
//     default:
//       return state;
//   }
// };

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

// function updateObjectInArray(array, action) {
//   return array.map((item, index) => {
//     if (index !== action.index) {
//       // This isn't the item we care about - keep it as-is
//       return item;
//     }

//     // Otherwise, this is the one we want - return an updated value
//     return {
//       ...item,
//       ...action.item
//     };
//   });
// }

const buyNextLevel = (state = initialState, action) => {
  const currentState = { ...state };
  const { level, moneyRequired } = currentState.products[action.productIndex].nextLevel;
  const { productMoney } = currentState.products[action.productIndex];
  currentState.products[action.productIndex].price *= 1.25;
  currentState.products[action.productIndex].nextLevel = {
    level: level + 1,
    moneyRequired: moneyRequired * 2,
    activated: false
  };
  currentState.money -= moneyRequired;
  currentState.products[action.productIndex]
    .completionPurcent = Math.round((productMoney * 100) / moneyRequired);

  return currentState;
};

const addManager = (state = initialState, action) => {
  let currentState = { ...state };
  const { managerUnlockPrice } = currentState.products[action.productIndex];
  currentState.money -= managerUnlockPrice;
  currentState = { ...currentState, money: currentState.money + managerUnlockPrice };
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
  console.log(currentState);

  // if (money >= moneyRequired && !activated) {
  if (action.available) {
    currentState = {
      ...currentState,
      products: currentState.products.map((product, index) => {
        if (index === action.productIndex) {
          return {
            ...product,
            activated: true
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
            activated: false
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
  console.log(currentState);

  // if (money >= managerUnlockPrice && unlock) {
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
  }
  if (!action.available) {
  // if (money < managerUnlockPrice && !unlock) {
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
  console.log(currentState);
  const { productMoney } = currentState.products[action.productIndex];
  const { moneyRequired } = currentState.products[action.productIndex].nextLevel;

  currentState = {
    ...currentState,
    products: currentState.products.map((product, index) => {
      if (index === action.productIndex) {
        return {
          ...product,
          completionPurcent: Math.round((productMoney * 100) / moneyRequired)
        };
      }
      return product;
    })
  };

  return currentState;
};

const unlockProduct = (state = initialState, action) => {
  const currentState = state;
  const { unlock, unlockPrice } = currentState.products[action.productIndex];
  currentState.products[action.productIndex].unlock = !unlock;
  currentState.money -= unlockPrice;

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
