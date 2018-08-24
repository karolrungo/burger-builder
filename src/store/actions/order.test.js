import axios from './../../axios-orders'
import moxios from 'moxios';
import thunk from 'redux-thunk';

import configureMockStore from 'redux-mock-store';
import * as actionTypes from './actionTypes';
import * as actions from './order'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ordersMock = {
  "-LGyxbZUSr5Q4jboj0uw" : {
    "ingredients" : {
      "bacon" : 0,
      "cheese" : 0,
      "meat" : 1,
      "salad" : 0
    },
  }
}
const formatedOrders = [{
  "id": "-LGyxbZUSr5Q4jboj0uw",
  "ingredients": {"bacon": 0, "cheese": 0, "meat": 1, "salad": 0}
}];

describe('order actions', () => {
  beforeEach(function () {
    moxios.install(axios);
  });

  afterEach(function () {
    moxios.uninstall(axios);
  });

  it('creates FETCH_ORDER_SUCCESS after successfuly fetching orders', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: ordersMock,
      });
    });

    const expectedActions = [
      { type: actionTypes.FETCH_ORDERS_START },
      { type: actionTypes.FETCH_ORDERS_SUCCESS, orders: formatedOrders },
    ];

    const store = mockStore({ posts: {} })

    return store.dispatch(actions.fetchOrders("TOKEN", "USER_ID")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('creates FETCH_ORDER_FAILED after failed fetching orders', () => {
    const error = new Error('Request failed with status code 500')
    moxios.stubRequest(/.orders.json*/, {
      status: 500,
      response: error
    });

    const expectedActions = [
      { type: actionTypes.FETCH_ORDERS_START },
      { type: actionTypes.FETCH_ORDERS_FAILED, error: error },
    ];

    const store = mockStore({ posts: {} })

    return store.dispatch(actions.fetchOrders("TOKEN", "USER_ID")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
})
