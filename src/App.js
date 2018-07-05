import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

class App extends Component {
  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path='/' component={BurgerBuilder} />
        <Route path='/auth/' component={asyncAuth} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout/' component={asyncCheckout} />
          <Route path='/auth/' component={asyncAuth} />
          <Route path='/orders/' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route exact path='/' component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapsStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => dispatch( actions.autchCheckState() ),
  }
}

export default withRouter(connect(mapsStateToProps, mapDispatchToProps)(App))
