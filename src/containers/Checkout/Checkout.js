import React from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

import classes from './Checkout.css'

class Checkout extends React.Component {

  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
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

  componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    let ingredients = {}
    for (let param of params) {
      console.log(param);
      ingredients[param[0]] = +param[1]
    }
    console.log(ingredients)
    this.setState({ingredients : ingredients})
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={`${this.props.match.url}/contact-data`} component={ContactData}/>
      </div>
    )
  }
}

export default Checkout
