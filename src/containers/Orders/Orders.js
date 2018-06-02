import React from 'react'
import axios from './../../axios-orders'

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import Order from './../../components/Order/Order'
import Spinner from './../../components/UI/Spinner/Spinner'

import classes from './Orders.css'

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(resp => {
        console.log(resp.data)
        const fetchedData = []
        for (let key in resp.data) {
          fetchedData.push({
            ...resp.data[key],
            id: key,
          })
        }
        this.setState({
          orders: fetchedData,
          loading: false,
        })
      })
      .catch( err => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    let orders = <Spinner />

    if (!this.state.loading) {
      orders = this.state.orders.map( order => {
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

export default withErrorHandler(Orders, axios)
