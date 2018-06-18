import React from 'react'
import axios from './../../axios-orders'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/index'

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import Order from './../../components/Order/Order'
import Spinner from './../../components/UI/Spinner/Spinner'

import classes from './Orders.css'

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    let orders = <Spinner />

    if (!this.props.loading) {
      orders = this.props.orders.map( order => {
        return (
          <Order
            key={order.id}
            totalPrice={+order.price}
            ingredients={order.ingredients}
          />
        )
      })
    }
    return (
      <React.Fragment>
        {orders}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch( actions.fetchOrders() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
