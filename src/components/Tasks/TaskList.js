import React from "react";
import {Tabs} from "antd";
import Widget from "components/Widget";
import {taskList} from "./data";
import TaskItem from "./TaskItem";
import axios from "axios/index";

const TabPane = Tabs.TabPane;

class TaskList extends React.Component {
  constructor(props){
    super(props)
    const current_user=JSON.parse(sessionStorage.current_user)
    this.state={today_tasks:[],current_user:current_user,upcomming_tasks:[]}
    this.get_tasks=this.get_tasks.bind(this)
    this.get_tasks()
  }

  get_tasks=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com//tasks',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      const upcomming_task=[]
      const today_tasks=[]
      console.log(response.data)
      response.data.filter(d=>{
        // console.log(d)
        if(d.scheduled_tomorrow) {
          upcomming_task.push(d)
          console.log(d)
          console.log(upcomming_task)
        }
        if(d.scheduled){
          today_tasks.push(d)
          console.log(d)
          console.log(today_tasks)
        }
      })

      this.setState({
        today_tasks:today_tasks,
        upcomming_tasks:upcomming_task
      })
    })
  }

  onChange = (data, index) => {
    this.setState((prevState) => ({
      taskList: prevState.taskList.map(task => {
        if (task.id === data.id) {
          task.completed = !data.completed;
        }
        return task;
      })
    }))
  };


  render() {
    return (
      <Widget title="TASK LIST" styleName="gx-card-tabs gx-card-eq-height">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Todays Tasks" key="1">
            {
              this.state.today_tasks.map((task, index) =>
                <TaskItem key={index} data={task} onChange={this.onChange}/>)
            }
          </TabPane>
          <TabPane tab="Upcomming Tasks" key="2">{
            this.state.upcomming_tasks.map((task, index) =>
              <TaskItem key={index} data={task} onChange={this.onChange}/>)
          }</TabPane>
        </Tabs>
      </Widget>
    );
  }
}


export default TaskList;
