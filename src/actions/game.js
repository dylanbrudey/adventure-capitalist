export const actionsType = {
  ADD_MONEY: 'ADD_MONEY',
  BUY_NEXT_LEVEL: 'BUY_NEXT_LEVEL',
  ADD_MANAGER: 'ADD_MANAGER',
  UPDATE_COMPLETION: 'UPDATE_COMPLETION',
  UPDATE_NEXT_LEVEL: 'UPDATE_NEXT_LEVEL',
  UPDATE_MANAGER_AVAILABILITY: 'UPDATE_MANAGER_AVAILABILITY',
  UNLOCK_PRODUCT: 'UNLOCK_PRODUCT'
};

export const addMoney = (productIndex) => ({
  type: actionsType.ADD_MONEY,
  productIndex
});

export const buyNextLevel = (productIndex) => ({
  type: actionsType.BUY_NEXT_LEVEL,
  productIndex
});

export const addManager = (productIndex) => ({
  type: actionsType.ADD_MANAGER,
  productIndex
});

export const updateCompletionBar = (productIndex) => ({
  type: actionsType.UPDATE_COMPLETION,
  productIndex
});

export const updateNextLevelAvailability = (productIndex, available) => ({
  type: actionsType.UPDATE_NEXT_LEVEL,
  productIndex,
  available
});

export const updateManagerAvailability = (productIndex, available) => ({
  type: actionsType.UPDATE_MANAGER_AVAILABILITY,
  productIndex,
  available
});

export const unlockProduct = (productIndex) => ({
  type: actionsType.UNLOCK_PRODUCT,
  productIndex
});
