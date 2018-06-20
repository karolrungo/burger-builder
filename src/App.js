import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={BurgerBuilder} />
          <Route path='/checkout/' component={Checkout} />
          <Route path='/my-orders/' component={Orders} />
          <Route path='/auth/' component={Auth} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
