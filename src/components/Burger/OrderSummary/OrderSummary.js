import React, {Component} from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from './../../UI/Button/Button'

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("ORDER SUMMARY will update")
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map( ing => {
        return <li key={ing}>
          <span style={{textTransform: 'capitalize'}}>
            {`${ing}:`}
          </span>
          {`${this.props.ingredients[ing]}`}
        </li>
      })

    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Current price: <strong>{this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnTypes={'Danger'} clicked={ this.props.canceled }>CANCEL</Button>
        <Button btnTypes={'Success'} clicked={ this.props.continued }>CONTINUE</Button>
      </Aux>
    )
  }
}


export default OrderSummary
