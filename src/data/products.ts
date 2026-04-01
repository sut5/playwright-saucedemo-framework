// This catalog is intentionally hardcoded because SauceDemo exposes a stable,
// demo-style inventory. In dynamic environments, prefer runtime data or
// behavior-based assertions instead of fixed product lists and prices.
export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const INVENTORY_PRODUCTS = [
  PRODUCTS.backpack,
  PRODUCTS.bikeLight,
  PRODUCTS.boltShirt,
  PRODUCTS.fleeceJacket,
  PRODUCTS.onesie,
  PRODUCTS.redShirt,
] as const;

export const INVENTORY_SORT_EXPECTATIONS = {
  nameDescending: [
    PRODUCTS.redShirt,
    PRODUCTS.onesie,
    PRODUCTS.fleeceJacket,
    PRODUCTS.boltShirt,
    PRODUCTS.bikeLight,
    PRODUCTS.backpack,
  ],
  priceAscending: [7.99, 9.99, 15.99, 15.99, 29.99, 49.99],
} as const;
