import reducer from './auth.js'
import * as actionTypes from './../actions/actionTypes'


describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    })
  })

  it('should store token upon login', () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      authData: {
        idToken: 'dummy_token',
        localId: 'dummy_localId',
      },
    }

    expect(reducer(undefined, action)).toEqual({
      token: 'dummy_token',
      userId: 'dummy_localId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    })
  })
})
