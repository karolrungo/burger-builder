import React from 'react'
import Aux from './../Aux/Aux'
import Modal from './../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.response.use(
        resp => resp,
        error => {
          this.setState({error: error})
        }
      )

      axios.interceptors.request.use(
        req => {
          this.setState({error: null})
          return req
        },
        error => {
          this.setState({error: error})
        }
      )
    }

    clearErrorHandler = () => {
      this.setState({error: null,})
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.clearErrorHandler}>
            {this.state.error? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      )
    }
  }
}

export default withErrorHandler
