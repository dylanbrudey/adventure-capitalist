export const actionsType = {
  ADD_MONEY: 'ADD_MONEY',
  BUY_NEXT_LEVEL: 'BUY NEXT LEVEL',
  ADD_MANAGER: 'ADD_MANAGER',
  CHECK_CHANGES: 'CHECK_CHANGES',
  UNLOCK_PRODUCT: 'UNLOCK_PRODUCT'
};

export const addMoney = () => ({
  type: actionsType.ADD_MONEY
});

export const buyNextLevel = () => ({
  type: actionsType.BUY_NEXT_LEVEL
});

export const addManager = () => ({
  type: actionsType.ADD_MANAGER
});

export const checkChanges = () => ({
  type: actionsType.CHECK_CHANGES
});

export const unlockProduct = () => ({
  type: actionsType.UNLOCK_PRODUCT
});
