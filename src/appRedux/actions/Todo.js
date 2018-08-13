import {CURRENT_TODO} from "constants/ActionTypes"






 const TodoToShow=(todo)=>{
  console.log("Action current todo")
   console.log(todo)
   console.log(CURRENT_TODO)
  return{
    type: CURRENT_TODO,
    payload: todo
  }
}

export default TodoToShow
