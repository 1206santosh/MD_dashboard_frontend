import {CURRENT_TODO} from "constants/ActionTypes"
import {defineState} from 'redux-localstore'





const INITIAL={
  currentTodo:null
}

const initialState = defineState(INITIAL)('task')

const TodoReducer=(state=initialState,action)=>{
  switch(action.type){
    case  CURRENT_TODO:
      state.currentTodo=action.payload
      console.log(state)
      return state
    break ;
    default:
      return state
  }
}

export default TodoReducer
