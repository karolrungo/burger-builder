import React from 'react'

import classes from './Order.css'

const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>Total price: <strong>5.40 USD</strong></p>
  </div>
)

export default order
