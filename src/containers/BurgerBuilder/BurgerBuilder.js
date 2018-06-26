import React, { Component } from 'react'
import axios from './../../axios-orders'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import Spinner from './../../components/UI/Spinner/Spinner'

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import * as actions from './../../store/actions/index'


class BurgerBuilder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      purchasing: false,
    }
  }

  shouldOrderButtonBeAvaliable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((sum, el) => sum + el, 0)

      return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      })
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
    })
  }

  purchaseContinued = () => {
    this.props.onInitPurchase()
    this.props.history.push({
      pathname: '/checkout',
    })
  }

  componentDidMount() {
    this.props.onInitIngredient()
  }

  render() {
    let disabledInfo = {
      ...this.props.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] === 0 ? disabledInfo[key] = true : disabledInfo[key] = false
    }

    let burger = this.props.error? <p>Ingredients can't be loaded</p> : <Spinner />
    let orderSummary = <Spinner />

    if(this.props.ingredients) {
      orderSummary =
        <OrderSummary
          ingredients={ this.props.ingredients }
          canceled={ this.purchaseCancelHandler }
          continued={ this.purchaseContinued }
          price={ this.props.totalPrice }/>

      burger =
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={ disabledInfo }
            price={ this.props.totalPrice }
            purchaseble={ this.shouldOrderButtonBeAvaliable(this.props.ingredients) }
            ordered={ this.purchaseHandler }
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingType) => dispatch( actions.addIngredient(ingType) ),
    onRemoveIngredient: (ingType) => dispatch( actions.removeIngredient(ingType) ),
    onInitIngredient: () => dispatch( actions.initIngredients() ),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch( actions.setAuthRedirectPath(path) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
