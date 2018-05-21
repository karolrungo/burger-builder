import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'

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
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4
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
    }
  }

  render() {
    let disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] === 0 ? disabledInfo[key] = true : disabledInfo[key] = false
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={ disabledInfo }
        />
      </Aux>
    )
  }
}

export default BurgerBuilder
