const money = 0;

const productList = [
  {
    name: 'Popcorn',
    price: 5,
    productMoney: 0,
    image: 'popcorn',
    unlockPrice: 0,
    unlock: true,
    managerUnlockPrice: 1000,
    managerUnlocked: false,
    managerAvailable: false,
    managerWorkSpeed: 1,
    completionPurcent: 0,
    nextLevel: {
      level: 2,
      moneyRequired: 10,
      activated: false
    }
  },
  {
    name: 'Ice Cream',
    price: 30,
    productMoney: 0,
    image: 'ice-cream',
    unlockPrice: 300,
    unlock: false,
    managerUnlockPrice: 4000,
    managerUnlocked: false,
    managerAvailable: false,
    managerWorkSpeed: 3,
    completionPurcent: 0,
    nextLevel: {
      level: 2,
      moneyRequired: 60,
      activated: false
    }
  },
  {
    name: 'Pizza',
    price: 80,
    productMoney: 0,
    image: 'pizza',
    unlockPrice: 1200,
    unlock: false,
    managerUnlockPrice: 8000,
    managerUnlocked: false,
    managerAvailable: false,
    managerWorkSpeed: 5,
    completionPurcent: 0,
    nextLevel: {
      level: 2,
      moneyRequired: 160,
      activated: false
    }
  },
  {
    name: 'Petrol Station',
    price: 110,
    productMoney: 0,
    image: 'petrol-station',
    unlockPrice: 9000,
    unlock: false,
    managerUnlockPrice: 15000,
    managerUnlocked: false,
    managerAvailable: false,
    managerWorkSpeed: 7,
    completionPurcent: 0,
    nextLevel: {
      level: 2,
      moneyRequired: 220,
      activated: false
    }
  },
  {
    name: 'Fishing',
    price: 150,
    productMoney: 0,
    image: 'fishing',
    unlockPrice: 25000,
    unlock: false,
    managerUnlockPrice: 22000,
    managerUnlocked: false,
    managerAvailable: false,
    managerWorkSpeed: 9,
    completionPurcent: 0,
    nextLevel: {
      level: 2,
      moneyRequired: 300,
      activated: false
    }
  },
  {
    name: 'Resort',
    price: 230,
    productMoney: 0,
    image: 'resort',
    unlockPrice: 38000,
    unlock: false,
    managerUnlockPrice: 50000,
    managerUnlocked: false,
    managerAvailable: false,
    managerWorkSpeed: 12,
    completionPurcent: 0,
    nextLevel: {
      level: 2,
      moneyRequired: 460,
      activated: false
    }
  },
  {
    name: 'Cinema',
    price: 300,
    productMoney: 0,
    image: 'cinema',
    unlockPrice: 55000,
    unlock: false,
    managerUnlockPrice: 80000,
    managerUnlocked: false,
    managerAvailable: false,
    managerWorkSpeed: 15,
    completionPurcent: 0,
    nextLevel: {
      level: 2,
      moneyRequired: 600,
      activated: false
    }
  }
];

export { productList, money };
