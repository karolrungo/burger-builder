import * as actionTypes from './actionTypes'
import axios from './../../axios-orders'

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
}

export const setIngredients = (ingredients) => {
  console.log("DISPACZING")
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}

export const setIngredeintsFailed = () => {
  return {
    type: actionTypes.SET_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  console.log('siema')
  return dispatch => {
    axios.get('https://react-my-burger-41d14.firebaseio.com/ingredients.json')
      .then(resp => {
        console.log('DANE POBRANE')
        dispatch(setIngredients(resp.data))
      })
      .catch(error => {
        dispatch(setIngredeintsFailed())
      })
    }
}