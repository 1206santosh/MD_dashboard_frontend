import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Todo from "./Todo"


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  todo: Todo
});

export default reducers;
