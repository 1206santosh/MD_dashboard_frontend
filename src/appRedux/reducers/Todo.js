import {CURRENT_TODO,MEETING_FILTER} from "constants/ActionTypes"
import {defineState} from 'redux-localstore'





const INITIAL={
  currentTodo:null
}

const initialState = defineState(INITIAL)('task')

const TodoReducer=(state=initialState,action)=>{
  switch(action.type){
    case  CURRENT_TODO:
      state.currentTodo=action.payload
      return state
    break ;
    case MEETING_FILTER:
      if(state.meeting) {
        state.infilter =true
        state.meeting=action.payload
      }
    default:
      return state
  }
}

export default TodoReducer
