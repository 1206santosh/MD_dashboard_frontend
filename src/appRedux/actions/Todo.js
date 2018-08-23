import {CURRENT_TODO,MEETING_FILTER} from "constants/ActionTypes"





export const  TodoToShow=(todo)=>{
  return{
    type: CURRENT_TODO,
    payload: todo
  }
}

export const MeetingFilter=(meeting)=>{
  return{
    type: MEETING_FILTER,
    payload: meeting
  }
}





