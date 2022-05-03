import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM
} from '../constants/cartConstants';


// getState allows us to get any reducer from combineReducers({})
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  // After dispatch we store it in LS
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



// getState allows us to get any reducer from combineReducers({})
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

