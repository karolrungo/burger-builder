import React from 'react'

import Order from './../../components/Order/Order'

import classes from './Orders.css'

class Orders extends React.Component {
  state = {
  }

  render() {
    return (
      <React.Fragment>
        <Order />
        <Order />
        <Order />
      </React.Fragment>
    )
  }
}

export default Orders
