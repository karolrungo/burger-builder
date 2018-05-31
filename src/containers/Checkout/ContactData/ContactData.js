import React from 'react'

import Button from './../../../components/UI/Button/Button'

import classes from './ContactData.css'

class ContactData extends React.Component {
  state ={
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data
          <form action="post">
            <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
            <input className={classes.Input} type="email" name="email" placeholder="Enter your email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postalcode" placeholder="Postal Code" />
            <Button btnTypes={'Success'}>Order</Button>
          </form>
        </h4>
      </div>
    )
  }
}

export default ContactData
