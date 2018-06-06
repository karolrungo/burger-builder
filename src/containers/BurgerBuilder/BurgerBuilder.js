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
import * as actionTypes from './../../store/actions'


class BurgerBuilder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      purchasing: false,
      loading: false,
      error: false,
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
    const queryParams = []
    for(let ingredient in this.props.ingredients){
        queryParams.push(encodeURIComponent(ingredient) + `=` +
                         encodeURIComponent(this.props.ingredients[ingredient]))
    }

    queryParams.push(`price=${this.props.totalPrice}`)
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    })
  }

  componentDidMount() {
    //axios.get('https://react-my-burger-41d14.firebaseio.com/ingredients.json')
      //.then(resp => {
        //this.setState({
          //ingredients: resp.data
        //})
      //})
      //.catch(error => {
        //this.setState({
          //error: true,
        //})
      //})

  }

  render() {
    let disabledInfo = {
      ...this.props.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] === 0 ? disabledInfo[key] = true : disabledInfo[key] = false
    }

    let orderSummary =
      <OrderSummary
        ingredients={ this.props.ingredients }
        canceled={ this.purchaseCancelHandler }
        continued={ this.purchaseContinued }
        price={ this.props.totalPrice }/>

    let burger =
      <Aux>
        <Burger ingredients={this.props.ingredients}/>
        <BuildControls
          ingredientAdded={this.props.onAddIngredient}
          ingredientRemoved={this.props.onRemoveIngredient}
          disabled={ disabledInfo }
          price={ this.props.totalPrice }
          purchaseble={ this.shouldOrderButtonBeAvaliable(this.props.ingredients) }
          ordered={ this.purchaseHandler }
        />
      </Aux>

    if(!this.props.ingredients) {
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType: ingType}),
    onRemoveIngredient: (ingType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingType}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
