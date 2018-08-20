import React from "react";
import {Tabs} from "antd";
import Widget from "components/Widget";
import TaskItem from "./TaskItem";
import axios from "axios/index";
import {history} from "../../appRedux/store";
import TodoToShow from "appRedux/actions/Todo"
import configureStore from "../../appRedux/store";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

const TabPane = Tabs.TabPane;
const store = configureStore()


const mapDispatchToProps=(dispatch)=>{
  return {actions: bindActionCreators(TodoToShow,dispatch)}
}

const mapStateToProps = ({auth}) => {
  const current_user=auth.authUser
  return {current_user}
};


class TaskList extends React.Component {
  constructor(props){
    super(props)
    const current_user=props.current_user
    this.state={today_tasks:[],current_user:current_user,upcomming_tasks:[]}
    this.get_tasks=this.get_tasks.bind(this)
    this.redirectToTask=this.redirectToTask.bind(this)

  }

  componentWillMount(){
    this.get_tasks()
  }

  get_tasks=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com/tasks',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      const upcomming_task=[]
      const today_tasks=[]
      response.data.filter(d=>{
        if(d.scheduled_tomorrow) {
          upcomming_task.push(d)
        }
        if(d.scheduled){
          today_tasks.push(d)
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

  redirectToTask=(task)=> {
    history.push('/inbox')
    this.props.dispatch(TodoToShow(task))
  }

  render(){

    return (
      <Widget title="TASK LIST" styleName="gx-card-tabs gx-card-eq-height">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Todays Tasks" key="1">
            {
              this.state.today_tasks.map((task, index) =>
                <TaskItem key={index} data={task} onChange={this.onChange} onClick={this.redirectToTask}/>
              )
            }
          </TabPane>
          <TabPane tab="Upcoming Tasks" key="2">{
            this.state.upcomming_tasks.map((task, index) =>
              <TaskItem key={index} data={task} onChange={this.onChange} onClick={()=>{
                history.push('/inbox')
                this.props.currentTodo(task)
              }}/>

                )
          }</TabPane>
        </Tabs>
      </Widget>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
