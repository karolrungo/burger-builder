import React from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

import classes from './Checkout.css'

class Checkout extends React.Component {

  state = {
    ingredients: null,
    totalPrice: 0,
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    console.log(this.props)
    this.props.history.replace({
      pathname: `${this.props.match.url}/contact-data`
    })
  }

  componentWillMount() {
    let params = new URLSearchParams(this.props.location.search);
    let ingredients = {}
    let price = 0
    for (let param of params) {
      if( param[0] === 'price') {
        price = +param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    console.log(ingredients)
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
    })
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          render={ () => {
            return <ContactData
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice} /> }}/>
      </div>
    )
  }
}

export default Checkout
