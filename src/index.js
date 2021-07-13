import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { hot } from 'react-hot-loader'
import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"
import reducers from "./reducers"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";


const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

const store = createStore(reducers, persistedStore, applyMiddleware(thunkMiddleware))

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

const WrappedHome = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={`/`}>
          <Home />
        </Route>
        <Route path={`/recipe/:recipeId`}>
          <Recipe />
        </Route>
      </Switch>
    </Router>
  </Provider>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(
  <HotHome />,
  document.getElementById("home")
)
