import React from "react";
import {Avatar, Timeline} from "antd";
import Widget from "components/Widget";
import {recentActivity} from "components/Tasks/data";
import ActivityItem from "./ActivityItem";
import axios from "axios"
const TimeLineItem = Timeline.Item;

class RecentActivity extends React.Component {

    constructor(props){
      super(props)
      const current_user=JSON.parse(sessionStorage.current_user)
      this.state={
        meetings:[],
        current_user:current_user
      }

      this.get_meetings=this.get_meetings.bind(this)
      this.get_meetings()

    }

    get_meetings=()=>{
      axios.get('https://md-dashboard-backend.herokuapp.com/meetings?recent_activity=true',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
        console.log(response)
        this.setState({
          meetings:response.data,
        })
      })
    }

  render() {
    return (
      <Widget title="RECENT ACTIVITIES" styleName="gx-card-timeline gx-card-eq-height">

        {this.state.meetings.map((activity, index) =>
          <div className="gx-timeline-info" key={index}>
            <h4 className="gx-timeline-info-day">{activity.day}</h4>
            <Timeline>
              {activity.meetings.map((task, index) => {
                return <TimeLineItem key={index} dot={
                  <Avatar className="gx-size-24" src=""/>}>
                  <ActivityItem task={task}/>
                </TimeLineItem>
              })}
            </Timeline>
          </div>)}
        <a href="javascript:void(0);" className="gx-btn-link">ALL ACTIVITIES</a>
      </Widget>
    );
  }
}


export default RecentActivity;
