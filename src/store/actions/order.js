import * as actionTypes from './actionTypes'
import axios from './../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData, orderData,
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch( purchaseBurgerStart() )

    axios.post('/orders.json', orderData)
      .then(resp => {
        dispatch( purchaseBurgerSuccess(resp.data.name, orderData) )
      })
      .catch(error => {
        dispatch( purchaseBurgerFailed(error) )
      })
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}
