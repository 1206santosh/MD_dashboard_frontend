import {CURRENT_TODO} from "constants/ActionTypes"






 const TodoToShow=(todo)=>{
  return{
    type: CURRENT_TODO,
    payload: todo
  }
}

export default TodoToShow
