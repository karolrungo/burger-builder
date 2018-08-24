import axios from './../../axios-orders'
import MockAdpater from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actionTypes from './actionTypes';
import * as actions from './burgerBuilder'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('burgerBuilder actions', () => {
  it('creates SET_INGREDIENTS when fetching ingredients from backend', () => {
    const ingredients = { bacon: 1, meat: 0, salad: 1};

    const axiosMock = new MockAdpater(axios);
    axiosMock.onGet(/.*/).reply(200, {
      ingredients: ingredients
    });

    const expectedActions = [
      { type: actionTypes.SET_INGREDIENTS, ingredients: { ingredients } },
    ];

    const store = mockStore({ posts: {} })

    return store.dispatch(actions.initIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })

  it('creates SET_INGREDIENTS_FAILED when fetching ingredients causes error', () => {
    const axiosMock = new MockAdpater(axios);
    axiosMock.onGet(/.*/).reply(404);

    const expectedActions = [{ type: actionTypes.SET_INGREDIENTS_FAILED }];
    const store = mockStore({ posts: {} })

    return store.dispatch(actions.initIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
})
