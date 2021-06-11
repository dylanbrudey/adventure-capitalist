import { actionsType } from '../actions/products';
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
  const currentState = state;
  const currentPrice = currentState.products[action.productIndex].price;
  currentState.money += currentPrice;
  currentState.products[action.productIndex].productMoney += currentPrice;

  return currentState;
};

const buyNextLevel = (state = initialState, action) => {
  const currentState = state;
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
  const currentState = state;
  const { managerUnlocked, managerUnlockPrice } = currentState.products[action.productIndex];
  currentState.money -= managerUnlockPrice;
  currentState.products[action.productIndex].managerUnlocked = !managerUnlocked;

  return currentState;
};

const checkChanges = (state = initialState, action) => {
  const currentState = state;
  const { money } = currentState;
  const { unlock, managerUnlockPrice, productMoney } = currentState.products[action.productIndex];
  const { moneyRequired, activated } = currentState.products[action.productIndex].nextLevel;
  if (money >= moneyRequired && !activated) {
    currentState.products[action.productIndex].nextLevel.activated = true;
  } else if (money < moneyRequired && activated) {
    currentState.products[action.productIndex].nextLevel.activated = false;
  }

  if (money >= managerUnlockPrice && unlock) {
    currentState.products[action.productIndex].managerAvailable = true;
  } else {
    currentState.products[action.productIndex].managerAvailable = false;
  }
  currentState.products[action.productIndex]
    .completionPurcent = Math.round((productMoney * 100) / moneyRequired);

  return currentState;
};

const unlockProduct = (state = initialState, action) => {
  const currentState = state;
  const { unlock, unlockPrice } = currentState.products[action.productIndex];
  currentState.products[action.productIndex].unlock = !unlock;
  currentState.money -= unlockPrice;

  return currentState;
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_MONEY:
      return addMoney(state, action);
    case actionsType.BUY_NEXT_LEVEL:
      return buyNextLevel(state, action);
    case actionsType.ADD_MANAGER:
      return addManager(state, action);
    case actionsType.CHECK_CHANGES:
      return checkChanges(state, action);
    case actionsType.UNLOCK_PRODUCT:
      return unlockProduct(state, action);
    default:
      return state;
  }
};

export default products;
