import React from "react";
import {Avatar, Timeline} from "antd";
import Widget from "components/Widget";
import {recentActivity} from "components/Tasks/data";
import ActivityItem from "./ActivityItem";

const TimeLineItem = Timeline.Item;

class RecentActivity extends React.Component {

// constructor(){
//
// }

  render() {
    return (
      <Widget title="RECENT ACTIVITIES" styleName="gx-card-timeline gx-card-eq-height">

        {recentActivity.map((activity, index) =>
          <div className="gx-timeline-info" key={index}>
            <h4 className="gx-timeline-info-day">{activity.day}</h4>
            <Timeline>
              {activity.tasks.map((task, index) => {
                return <TimeLineItem key={index} dot={
                  <Avatar className="gx-size-24" src={task.avatar}/>}>
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
