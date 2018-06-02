import React from 'react'

import classes from './Order.css'

const order = (props) => {
  let ingredients= []
  for(let ingredient in props.ingredients) {
    ingredients.push((
      <li key={ingredient}>
        {`${ingredient} (${props.ingredients[ingredient]})`}
      </li>
    ))
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      <ul>
        {ingredients}
      </ul>
      <p>Total price: <strong>{props.totalPrice.toFixed(2)} USD</strong></p>
    </div>
  )
}

export default order
