import React, { Component } from 'react'
import axios from './../../axios-orders'

import Aux from '../../hoc/Aux/Aux'
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import Spinner from './../../components/UI/Spinner/Spinner'

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

const ingredient_prices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchaseble: false,
      purchasing: false,
      loading: false,
      error: false,
    }
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedIngredients = { ...this.state.ingredients}
    updatedIngredients[type] = oldCount + 1
    const updatedPrice = this.state.totalPrice + ingredient_prices[type]

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]

    if (oldCount !== 0) {
      const updatedIngredients = { ...this.state.ingredients}
      updatedIngredients[type] = oldCount - 1
      const updatedPrice = this.state.totalPrice - ingredient_prices[type]

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedPrice,
      })
      this.updatePurchaseState(updatedIngredients)
    }
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((sum, el) => sum + el, 0)

    this.setState({
      purchaseble: sum > 0
    })
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    })
  }

  purchaseContinued = () => {
    this.props.history.push({
      pathname: '/checkout'
    })
    //this.setState({
      //loading: true,
    //})

    //const order = {
      //ingredients: this.state.ingredients,
      //price: this.state.totalPrice,
      //customer: {
        //name: 'Karol Rungo',
        //address: {
          //street: 'Test Street 1',
          //zipCode: '12-345',
          //country: 'Poland',
        //},
        //email: 'test@test.com',
      //},
      //deliveryMethod: 'fastest'
    //}
    //axios.post('/orders.json', order)
      //.then(resp => {
        //this.setState({
          //loading: false,
          //purchasing: false,
        //})
      //})
      //.catch(error => {
        //this.setState({
          //loading: false,
          //purchasing: false,
        //})
      //})
  }

  componentDidMount() {
    axios.get('https://react-my-burger-41d14.firebaseio.com/ingredients.json')
      .then(resp => {
        this.setState({
          ingredients: resp.data
        })
      })
      .catch(error => {
        this.setState({
          error: true,
        })
      })

  }

  render() {
    let disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] === 0 ? disabledInfo[key] = true : disabledInfo[key] = false
    }

    let orderSummary =
      <OrderSummary
        ingredients={ this.state.ingredients }
        canceled={ this.purchaseCancelHandler }
        continued={ this.purchaseContinued }
        price={ this.state.totalPrice }/>

    let burger =
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={ disabledInfo }
          price={ this.state.totalPrice }
          purchaseble={ this.state.purchaseble }
          ordered={ this.purchaseHandler }
        />
      </Aux>

    if(!this.state.ingredients) {
      burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />
      orderSummary = <Spinner />
    }

    if (this.state.loading) {
     orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={ this.state.purchasing } modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
