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

export const logout = () => {
  console.log('KAROL4')
  localStorage.removeItem('token')
  localStorage.removeItem('expiriationDate')
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expiriationTime) => {
  console.log('KAROL3')
  console.log(expiriationTime * 1000)
  return dispatch => {
    setTimeout(() => { dispatch(logout()) }, expiriationTime * 1000)
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
        dispatch(checkAuthTimeout(response.data.expiresIn))
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expiriationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000))
        localStorage.setItem('userId', response.data.localId)
      })
      .catch(error => {
        console.log(error)
        dispatch(authFailed(error.response.data.error))
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const autchCheckState = () => {
  console.log('SPRAWDZAM CZY JESTEM ZALOGOWANY')
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('KAROL1')
      dispatch(logout())
    } else {
      const expiriationDate = new Date(localStorage.getItem('expiriationDate'))
      if (expiriationDate <= new Date()) {
        console.log('KAROL2')
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess({idToken: token, localId: userId}))
        dispatch(checkAuthTimeout((expiriationDate.getTime() - new Date().getTime()) / 1000 ))
      }
    }
  }
}
