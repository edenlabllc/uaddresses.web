
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, push } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import multiMiddleware from 'redux-multi';
import { apiMiddleware } from 'redux-api-middleware';
import { PUBLIC_INDEX_ROUTE } from 'config';

import rootReducer from '../reducers';

const errorHandlerMiddleware = store => next => (action) => {
  if (action.error && action.payload.status === 401) {
    store.dispatch(push(PUBLIC_INDEX_ROUTE));
  }
  return next(action);
};

const middlewares = [
  multiMiddleware, promiseMiddleware, apiMiddleware, errorHandlerMiddleware,
];

if (process.NODE_ENV !== 'production') {
  middlewares.push(require('redux-freeze')); // eslint-disable-line global-require
}

export function configureStore({ history, i18n, req }, initialState) {
  const createStoreWithMiddleware = compose(
    applyMiddleware.apply(this, middlewares.concat([
      routerMiddleware(history),
      thunkMiddleware.withExtraArgument({ i18n, req }),
    ])),
    (process.NODE_ENV !== 'production') && global.window && window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}
