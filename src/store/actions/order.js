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

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = (orders) => {
  console.log('FETCH SUCCESS')
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFailed = (error) => {
  console.log('FETCH FAILED')
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  }
}
export const fetchOrdersStart = () => {
  console.log('FETCH START')
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('/orders.json')
      .then(resp => {
        const fetchedData = []
        for (let key in resp.data) {
          fetchedData.push({
            ...resp.data[key],
            id: key,
          })
        }
        dispatch(fetchOrdersSuccess(fetchedData))
      })
      .catch( error => dispatch(fetchOrdersFailed(error)))

    //axiosStuff
  }
}
