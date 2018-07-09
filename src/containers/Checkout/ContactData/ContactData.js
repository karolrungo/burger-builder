import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from './../../../axios-orders'
import { connect } from 'react-redux'

import Button from './../../../components/UI/Button/Button'
import Spinner from './../../../components/UI/Spinner/Spinner'
import Input from './../../../components/UI/Input/Input'
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from './../../../store/actions/index'

import classes from './ContactData.css'

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        },
        validation: {},
        value: 'fastest',
        valid: true,
        touched: false,
      },
    },
    formIsValid: true, //true for testing
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props.ingredients)
    console.log(this.props.totalPrice)

    let formData = {}
    for( let elementId in this.state.orderForm) {
      formData[elementId] = this.state.orderForm[elementId].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderDara: formData,
      userId: this.props.userId,
    }

    this.props.onBurgerBuilder(order, this.props.token)
  }

  inputChangedHandler = (event, elementId) => {
    //NOT A DEEP COPY - need fix
    const newState = {...this.state.orderForm}
    newState[elementId].value = event.target.value
    newState[elementId].valid = this.checkValidity(newState[elementId].value, newState[elementId].validation)
    newState[elementId].touched = true

    let formIsValid = true
    for(let input in newState) {
      formIsValid = newState[input].valid && formIsValid
    }

    this.setState({
      orderForm: newState,
      formIsValid: formIsValid,
    })
  }

  checkValidity(value, rules) {
    let isValid =  true

    if (rules.required) {
      isValid = value.trim() !== ''
    }

    return isValid
  }

  render() {
    let formInputs = []
    for(let input in this.state.orderForm) {
      formInputs.push(
        <Input
          key={input}
          elementType={this.state.orderForm[input].elementType}
          elementConfig={this.state.orderForm[input].elementConfig}
          value={this.state.orderForm[input].value}
          changed={ (event) => this.inputChangedHandler(event, input)}
          shouldValidate={this.state.orderForm[input].validation && this.state.orderForm[input].touched}
          invalid={!this.state.orderForm[input].valid}/>
      )
    }

    let form = (
      <form action="post" onSubmit={this.orderHandler}>
        {formInputs}
        <Button btnTypes={'Success'} disabled={!this.state.formIsValid} >Order</Button>
      </form>
    )

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onBurgerBuilder: (orderData, token) => { dispatch(actions.purchaseBurger(orderData, token)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios))
