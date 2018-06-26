import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

class App extends Component {
  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={BurgerBuilder} />
          <Route path='/checkout/' component={Checkout} />
          <Route path='/my-orders/' component={Orders} />
          <Route path='/auth/' component={Auth} />
          <Route path='/logout' component={Logout} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch( actions.autchCheckState() ),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
