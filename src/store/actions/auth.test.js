import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk';

import configureMockStore from 'redux-mock-store';
import * as actionTypes from './actionTypes';
import * as actions from './auth'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const localStorageMock = {
  removeItem: jest.fn(),
  setItem: jest.fn(),
};
global.localStorage = localStorageMock;

describe('auth action', () => {
  it('asdf', (done) => {

    jest.useFakeTimers();

    const mockedResponseData = {
      expiresIn: 0,
      idToken: "TOKEN",
      localId: "LOCALID"
    }

    const mock = new MockAdapter(axios);
    mock.onPost(/.*/).reply(200, mockedResponseData);

    const expectedActions = [
      { type: actionTypes.AUTH_START },
      { type: actionTypes.AUTH_SUCCESS, authData: mockedResponseData },
      { type: actionTypes.AUTH_LOGOUT,  },
    ];

    const store = mockStore({ posts: {} })

    store.dispatch(actions.authInit('EMAIL', 'PASSWD', 'IS_LOGGED')).then(() => {
      jest.runAllTimers();
      expect(store.getActions()).toEqual(expectedActions);
      done();
    })
  })
})
