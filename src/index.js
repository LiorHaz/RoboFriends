import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
//Helps with logging and monitoring actions
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,combineReducers} from 'redux';
import { searchRobots,requestRobots } from './reducers';
//Handles asynchronous actions
import thunkMiddleware from 'redux-thunk';

const logger = createLogger();
//Combines the two reducers (or more if needed)
const rootReducer = combineReducers({searchRobots,requestRobots});
const store = createStore(rootReducer,applyMiddleware(thunkMiddleware,logger));

ReactDOM.render(
  <React.StrictMode>
    {/*Provider Component takes care of passing
    down the store function through the App's
    childern efficiently */}
    <Provider store = {store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
