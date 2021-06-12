export const actionsType = {
  ADD_MONEY: 'ADD_MONEY',
  BUY_NEXT_LEVEL: 'BUY_NEXT_LEVEL',
  ADD_MANAGER: 'ADD_MANAGER',
  CHECK_CHANGES: 'CHECK_CHANGES',
  UNLOCK_PRODUCT: 'UNLOCK_PRODUCT'
};

export const addMoney = (productIndex) => ({
  type: actionsType.ADD_MONEY,
  productIndex
});

export const buyNextLevel = () => ({
  type: actionsType.BUY_NEXT_LEVEL
});

export const addManager = () => ({
  type: actionsType.ADD_MANAGER
});

export const checkChanges = (productIndex) => ({
  type: actionsType.CHECK_CHANGES,
  productIndex
});

export const unlockProduct = () => ({
  type: actionsType.UNLOCK_PRODUCT
});
