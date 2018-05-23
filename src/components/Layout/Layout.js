import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from './../Navigation/Toolbar/Toolbar'
import SideDrawer from './../Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false,
    })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render() {
    return (
      <Aux>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <Toolbar
          toggleSideDrawer={this.sideDrawerToggleHandler}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )}
}

export default Layout
