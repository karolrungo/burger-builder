import React from 'react'

import Input from './../../components/UI/Input/Input'
import Button from './../../components/UI/Button/Button'

import classes from './Auth.css'

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    }
  }

  checkValidity(value, rules) {
    let isValid =  true

    if (rules.required) {
      isValid = value.trim() !== ''
    }

    return isValid
  }

  inputChangedHandler = (event, elementId) => {
    console.log(event.target)
    console.log(elementId)
    //NOT A DEEP COPY - need fix
    const newState = {...this.state.controls}
    newState[elementId].value = event.target.value
    newState[elementId].valid = this.checkValidity(newState[elementId].value, newState[elementId].validation)
    newState[elementId].touched = true

    this.setState({
      orderForm: newState,
    })
  }


  render () {
    let formInputs = []
    for(let input in this.state.controls) {
      console.log(this.state.controls[input])
      formInputs.push(
        <Input
          key={input}
          elementType={this.state.controls[input].elementType}
          elementConfig={this.state.controls[input].elementConfig}
          value={this.state.controls[input].value}
          changed={ (event) => this.inputChangedHandler(event, input)}
          shouldValidate={this.state.controls[input].validation && this.state.controls[input].touched}
          invalid={!this.state.controls[input].valid}/>
      )}

    let form = (
      <form action="">
        {formInputs}
      </form>
    )

    return (
      <div className={classes.Auth}>
        {form}
        <Button btnTypes='Success'>Submit</Button>
      </div>
    )
  }
}

export default Auth
