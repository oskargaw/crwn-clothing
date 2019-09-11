export const addItemToCart = (cartItems, cartItemToAdd) => {
  // we check here if the item, which we want to add to cart is already there
  // if no, existingCartItem will be undefined
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // this will execute if existingCartItem will be undefined, so if there is no such product in the cart yet
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
