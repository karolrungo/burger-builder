import React from 'react'
import { connect } from 'react-redux'

import * as actions from './../../store/actions/index'

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
        value: 'test@test.com',
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
        value: 'qwerty123',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  }

  checkValidity(value, rules) {
    let isValid =  true

    if (rules.required) {
      isValid = value.trim() !== ''
    }

    return isValid
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp,
      }
    })
  }

  inputChangedHandler = (event, elementId) => {
    //NOT A DEEP COPY - need fix
    const newState = {...this.state.controls}
    newState[elementId].value = event.target.value
    newState[elementId].valid = this.checkValidity(newState[elementId].value, newState[elementId].validation)
    newState[elementId].touched = true

    this.setState({
      orderForm: newState,
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls['email'].value,
                      this.state.controls['password'].value,
                      this.state.isSignUp)
  }

  render () {
    let formInputs = []
    for(let input in this.state.controls) {
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
      <form action="post" onSubmit={this.submitHandler}>
        {formInputs}
        <Button btnTypes='Success'>Submit</Button>
      </form>
    )

    return (
      <div className={classes.Auth}>
        {form}
        <Button
          btnTypes='Danger'
          clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignUp? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.authInit(email, password, isSignUp)),
  }
}

export default connect(null, mapDispatchToProps)(Auth)
