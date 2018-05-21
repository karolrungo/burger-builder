import React from 'react'
import Aux from '../../../hoc/Aux/Aux'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map( ing => {
      return <li key={ing}>
        <span style={{textTransform: 'capitalize'}}>
          {`${ing}:`}
        </span>
        {`${props.ingredients[ing]}`}
      </li>
    })

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout?</p>
    </Aux>
  )
}

export default orderSummary
