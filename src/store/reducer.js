import * as actionTypes from './actions'

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  },
  totalPrice: 4,
}

const ingredient_prices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const reducer = (state = initialState, action) => {
  switch (action.type){
    case(actionTypes.ADD_INGREDIENT):
      console.log("adding ingredient")
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + ingredient_prices[action.ingredientType]
      }
    case(actionTypes.REMOVE_INGREDIENT):
      console.log("removing ingredient")
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        totalPrice: state.totalPrice - ingredient_prices[action.ingredientType]
      }
  }

  return state
}

export default reducer
