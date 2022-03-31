import { combineReducers } from "redux";
import reducers from "./reducers";

const rootReducers = combineReducers({
  fairview: reducers,
});

export default rootReducers;
