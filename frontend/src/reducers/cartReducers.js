import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM
} from '../constants/cartConstants';


export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // Payload
      const item = action.payload
      // If item exists
      const existItem = state.cartItems.find(x => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
        }
      } else {
        // if it does exist push to array
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    default:
      return state
  }
}


