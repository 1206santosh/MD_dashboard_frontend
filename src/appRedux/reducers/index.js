import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import TodoReducer from "./Todo"


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  task: TodoReducer,
});

export default reducers;
