import React from "react";
import {Avatar, Timeline} from "antd";
import Widget from "components/Widget";
import {recentActivity} from "components/Tasks/data";
import ActivityItem from "../RecentActivity/ActivityItem";
import axios from "axios"
import {Redirect} from "react-router-dom";
import {history} from "../../appRedux/store";
import Aux from "util/Auxiliary";

const TimeLineItem = Timeline.Item;

class TaskTimeLine extends React.Component {

  constructor(props){
    super(props)
    console.log(props)
    const current_user=props.current_user
    this.state={
      meetings:[],
      current_user:current_user,
      currentTodo:props.todo,
      timeline:[]
    }

    this.get_timeline=this.get_timeline.bind(this)


  }

  componentDidMount(){
    this.get_timeline()
  }



  get_timeline=()=>{
    console.log(this.state.currentTodo)
    axios.get('https://md-dashboard-backend.herokuapp.com/tasks/'+this.state.currentTodo.id+'/task_timeline',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      this.setState({
        timeline:response.data,
      })
    })
  }

  handleClick=(todo)=> {
    return <Redirect to='/inbox' />
  }


  render() {
    return (
      <Widget title="RECENT ACTIVITIES" styleName="gx-card-timeline gx-card-eq-height">

        {this.state.timeline.map((activity, index) =>
          <div className="gx-timeline-info" key={index}>
            <h4 className="gx-timeline-info-day">{activity.event}</h4>
            <Timeline>
                    <TimeLineItem
                    >
                      <Aux>
                        <h4 className="gx-text">{activity.text}</h4>
                        <span className="gx-fs-sm gx-text-grey">{activity.date}</span>
                      </Aux>
                    </TimeLineItem>
            </Timeline>
          </div>)}
        {/*<a href="javascript:void(0);" className="gx-btn-link">ALL ACTIVITIES</a>*/}
      </Widget>
    );
  }
}


export default TaskTimeLine;
