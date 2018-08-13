
  const Todo=(state=[],action)=>{
  switch(action.type){
    case  "TaskState":
      return state.concat([{
        currentTodo:action.payload
      }])
    break ;
    default:
      return state
  }
}

export default Todo
