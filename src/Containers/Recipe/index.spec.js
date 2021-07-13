import React from "react";
import { Provider } from 'react-redux'
import {shallow, mount} from 'enzyme';
import Recipe from ".";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from '../../reducers'
import fetchMock from "jest-fetch-mock";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { waitFor } from '@testing-library/react';
import Typography from '@material-ui/core/Typography';
import {
  Router,
} from "react-router-dom";
import { createMemoryHistory } from 'history'

Enzyme.configure({ adapter: new Adapter() });

fetchMock.enableMocks();

const runAllPromises = () => new Promise(setImmediate)

beforeEach((done) => {
  fetch.resetMocks();
  done()
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

test("Renders out information card", async () => {
  fetch.mockResponseOnce(JSON.stringify(
    { 
      name: 'Recipe 1',
      instructions: 'put ingredients together',
      ingredients: ['10 cups of water']
    }
   )
  )

  const history = createMemoryHistory();
  history.push('/recipe/recipeId');
  let wrapper;

  await waitFor(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Recipe />
        </Router>
      </Provider>
    );
  });

  await waitFor(() => {
    wrapper.update();
    const content = wrapper.find(Typography)
    const text = content.map((con) => con.text())
    text.forEach((text) => {
      const hasText = ['Recipe 1', 'put ingredients together', '10 cups of water'].includes(text)
      expect(hasText).toBeTruthy
    })
  })
});
