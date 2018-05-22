import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from './../../UI/Button/Button'

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
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnTypes={'Danger'} clicked={ props.canceled }>CANCEL</Button>
      <Button btnTypes={'Success'} clicked={ props.continued }>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary
