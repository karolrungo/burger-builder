import React from 'react'
import Aux from './../Aux/Aux'
import Modal from './../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.respInterceptor = axios.interceptors.response.use(
        resp => resp,
        error => {
          this.setState({error: error})
        }
      )

      this.reqInterceptor = axios.interceptors.request.use(
        req => {
          this.setState({error: null})
          return req
        },
        error => {
          this.setState({error: error})
        }
      )
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.respInterceptor)
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
