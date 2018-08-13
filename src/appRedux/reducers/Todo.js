import {CURRENT_TODO} from "constants/ActionTypes"



const INITIAL={
  currentTodo:window.localStorage.getItem("current_todo")
}

const Todo=(state=INITIAL,action)=>{
  console.log(action.type)
  console.log(action.payload)
  switch(action.type){
    case  CURRENT_TODO:
      console.log("To Do Reducer")
      console.log(action.payload)
      console.log({...state,newTodo:action.payload})
      return {
        ...state,
        newTodo: action.payload
      }
    break ;
    default:
      return state
  }
}

export default Todo
