// 1- List of products in the shop : each product having a unique id, name and unit price:
const PRODUCTS = [
  { id: 1, name: "Apple", price: 2.5 },
  { id: 2, name: "Banana", price: 1.5 },
  { id: 3, name: "Orange", price: 3 },
  { id: 4, name: "Rice", price: 1.5 },
  { id: 5, name: "Chocolate", price: 3 },
];

// 2- Shopping cart: contains the items the customer wants to buy and their quantity
const SHOPPING_CART = [
  { id: 1, quantity: 2 },
  { id: 3, quantity: 1 },
];

/**
 *  Function to get the total amount of the current shopping cart.
 * @returns the Shopping cart total amount
 */
function getCartTotalAmount() {
  let result = 0;
  SHOPPING_CART.forEach(cartItem => {
    const product = PRODUCTS.find(p => p.id === cartItem.id);
    if (product) {
      result += product.price * cartItem.quantity;
    }
  });
  return result;
}

/**
 * Function to add a product to the shopping cart
 * @param {*} productId - The product ID to add
 */
function addProductToCart(productId) {
  let cartItem = SHOPPING_CART.find(item => item.id === productId);
  
  if (cartItem) {
    // CASE 1: Product already exists in the cart, increment its quantity
    cartItem.quantity++;
  } else {
    // CASE 2: Product does not exist, add it with quantity 1
    SHOPPING_CART.push({ id: productId, quantity: 1 });
  }
}

/**
 * Function to remove a product from the shopping cart
 * @param {*} productId - The product ID to remove
 */
function removeProductFromCart(productId) {
  let cartIndex = SHOPPING_CART.findIndex(item => item.id === productId);
  
  if (cartIndex !== -1) {
    // CASE 1: If quantity >= 2, decrement quantity
    if (SHOPPING_CART[cartIndex].quantity > 1) {
      SHOPPING_CART[cartIndex].quantity--;
    } else {
      // CASE 2: If quantity is 1, remove the item from the cart
      SHOPPING_CART.splice(cartIndex, 1);
    }
  }
}

// --------------------------------------------------------
// TESTS ZONE
// --------------------------------------------------------

// Test 1: Get cart total amount
console.log(getCartTotalAmount()); // Should be 8

// Test 2: Add an existing product to cart (increment quantity)
addProductToCart(1);
console.log(JSON.stringify(SHOPPING_CART)); // Should be [{"id":1,"quantity":3},{"id":3,"quantity":1}]

// Test 3: Add a new product to the cart
addProductToCart(2);
console.log(JSON.stringify(SHOPPING_CART)); // Should be [{"id":1,"quantity":3},{"id":3,"quantity":1},{"id":2,"quantity":1}]

// Test 4: Remove a product (decrement quantity)
removeProductFromCart(1);
console.log(JSON.stringify(SHOPPING_CART)); // Should be [{"id":1,"quantity":2},{"id":3,"quantity":1},{"id":2,"quantity":1}]

// Test 5: Remove a product completely (when quantity is 1)
removeProductFromCart(2);
console.log(JSON.stringify(SHOPPING_CART)); // Should be [{"id":1,"quantity":2},{"id":3,"quantity":1}]
