import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import thunk from 'redux-thunk';

import configureMockStore from 'redux-mock-store';
import * as actionTypes from './actionTypes';
import * as actions from './auth'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe('auth action', () => {
  it('asdf', () => {

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
    ];

    const store = mockStore({ posts: {} })

    return store.dispatch(actions.authInit('EMAIL', 'PASSWD', 'IS_LOGGED')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      console.log(store.getActions())
    });
  })
})
