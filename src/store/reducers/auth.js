import * as actionTypes from './../actions/actionTypes'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return{
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.AUTH_SUCCESS:
      return{
        ...state,
        loading: false,
        error: null,
        token: action.authData.idToken,
        userId: action.authData.localId,
      }
    case actionTypes.AUTH_FAILED:
      return{
        ...state,
        loading: false,
        error: action.error,
      }
    case actionTypes.AUTH_LOGOUT:
      console.log("Logging OUT")
      return{
        ...state,
        token: null,
        userId: null,
      }
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return{
        ...state,
        authRedirectPath: action.path,
      }
    default:
      return state
  }
}

export default reducer;
