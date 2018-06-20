import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const authInit = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    let url ='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDwv-4GV3r5Xl2jM51zcpBXouGgwo3WyyE'
    if(!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDwv-4GV3r5Xl2jM51zcpBXouGgwo3WyyE'
    }

    axios.post(url, authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFailed(error.response.data.error))
      })
  }
}
