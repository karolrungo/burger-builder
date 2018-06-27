import * as actionTypes from './actionTypes'
import axios from './../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch( purchaseBurgerStart() )

    axios.post('/orders.json?auth=' + token, orderData)
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

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios.get('/orders.json' + queryParams)
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
