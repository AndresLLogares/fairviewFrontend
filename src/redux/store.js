import {
  createStore as reduxCreateStore,
  compose,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import rootReducers from "./Reducers/index";

const composeEnhancer = compose;

const store = reduxCreateStore(
  rootReducers,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
