import React from "react";
import { Divider } from 'antd';
import { Table, Icon} from 'antd';
import axios from 'axios';
import ToDoDetail from 'components/todo/ToDoDetail'
import ToDo from 'routes/Todo/index'
class Inbox extends React.Component{
  constructor(props){
    super(props)
    this.state={tasks:[]}
    this.get_tasks=this.get_tasks.bind(this)
    // this.get_tasks()

  }

  // get_tasks=()=>{
  //   axios.get('https://md-dashboard-backend.herokuapp.com/tasks').then((response)=>{
  //     this.setState({
  //       tasks:response.data
  //     })
  //   })
  // }


  render(){
    return(
      <div>
        Tasks
        <ToDo todos={this.state.tasks}/>

      </div>
    )
  }
}



export default Inbox
