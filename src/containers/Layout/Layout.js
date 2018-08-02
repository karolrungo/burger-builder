import React, { Component } from 'react';
import { connect } from 'react-redux'

import Toolbar from './../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer'

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
      <React.Fragment>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated}
        />
        <Toolbar
          toggleSideDrawer={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps, null)(Layout)
