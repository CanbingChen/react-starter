import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from '../reducer';
import enhancers from './enhancers';


// Note: logger must be the last middleware in chain,
// otherwise it will log thunk and promise, not actual actions
const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger'); // eslint-disable-line global-require
  middlewares.push(logger);
}


/**
 * 接受三个参数
 * - 一个根reducer对象(通常由各个小的reducer再由combineReducer组合而来)
 * - 一个通常用于服务端同构state对象(可选)
 * - 一个用于增强store的各种中间件函数(可选)
 * @type {[type]}
 */
const store = createStore(
	rootReducer,
	compose(applyMiddleware(...middlewares), ...enhancers)
);

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducer', () => {
    const nextRootReducer = require('../reducer/index'); // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
