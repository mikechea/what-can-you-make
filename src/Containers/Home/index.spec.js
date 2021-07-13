import React from "react";
import { Provider } from 'react-redux'
import {shallow, mount} from 'enzyme';
import Home from ".";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from '../../reducers'
import fetchMock from "jest-fetch-mock";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { waitFor } from '@testing-library/react';
import Link from '@material-ui/core/Link';

Enzyme.configure({ adapter: new Adapter() });

fetchMock.enableMocks();

const runAllPromises = () => new Promise(setImmediate)

beforeEach((done) => {
  fetch.resetMocks();
  done()
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function renderWrapper() {
  return renderer(
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

test("Search bar renders results", async () => {
  fetch.mockResponseOnce(JSON.stringify([{name: 'Recipe 1', id: 'jnkdjsnfk'}]));

  const wrapper = mount(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  
  wrapper.find('input').at(0).simulate('change', {target: {value: 'Recipe 1'}})
  const button = wrapper.find('button').at(0).simulate('click')

  await waitFor(() => {
    wrapper.update()
    const recipes = wrapper.find(Link)
    expect(recipes.length).toBe(1)
  });
});
