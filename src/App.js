import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Main from './Main';
import VideoPlayer from './VideoPlayer';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const App = () => (
  <Provider store = {createStore(reducers, composeWithDevTools())}>
    <Router>
      <Switch>
        <Route path="/watch/:id" component={VideoPlayer} />
        <Route path="/watch" component={VideoPlayer} />
        <Route path="/results" component={Main} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  </Provider>
)
export default App;