import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from './../../../axios-orders'

import Button from './../../../components/UI/Button/Button'
import Spinner from './../../../components/UI/Spinner/Spinner'
import Input from './../../../components/UI/Input/Input'

import classes from './ContactData.css'

class ContactData extends React.Component {
  state ={
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault()
    console.log(this.props.ingredients)
    console.log(this.props.totalPrice)
    this.setState({
      loading: true,
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Karol Rungo',
        address: {
          street: 'Test Street 1',
          zipCode: '12-345',
          country: 'Poland',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(resp => {
        this.setState({ loading: false, })
        this.props.history.push({
          pathname: '/'
        })
      })
      .catch(error => {
        this.setState({ loading: false, })
      })
  }

  render() {
  let form = (
    <form action="post">
      <Input inputtype="input" type="text" name="name" placeholder="Enter your name" />
      <Input inputtype="input" type="email" name="email" placeholder="Enter your email" />
      <Input inputtype="input" type="text" name="street" placeholder="Street" />
      <Input inputtype="input" type="text" name="postalcode" placeholder="Postal Code" />
      <Button btnTypes={'Success'} clicked={this.orderHandler}>Order</Button>
    </form>
  )

  if (this.state.loading) {
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

export default withRouter(ContactData)
