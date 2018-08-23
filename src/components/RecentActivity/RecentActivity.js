import React from "react";
import {Avatar, Timeline} from "antd";
import Widget from "components/Widget";
// import {recentActivity} from "components/Tasks/data";
import ActivityItem from "./ActivityItem";
import axios from "axios"
import {Redirect} from "react-router-dom";
import {history} from "../../appRedux/store";
import {connect} from "react-redux";
import {MeetingFilter} from "appRedux/actions/Todo"
import {bindActionCreators} from "redux";

const TimeLineItem = Timeline.Item;


const mapDispatchToProps=(dispatch)=>{
  return {dispatch: bindActionCreators(MeetingFilter,dispatch)}
}

class RecentActivity extends React.Component {

    constructor(props){
      super(props)
      console.log(props)
      const current_user=this.props.current_user
      this.state={
        meetings:[],
        current_user:current_user
      }

      this.get_meetings=this.get_meetings.bind(this)


    }

  componentWillMount(){
    this.get_meetings()
  }

    get_meetings=()=>{
      axios.get('https://md-dashboard-backend.herokuapp.com/meetings?recent_activity=true',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
        this.setState({
          meetings:response.data,
        })
      })
    }

  handleClick=(todo)=> {
    return <Redirect to='/inbox' />
  }


  render() {
    return (
      <Widget title="RECENT ACTIVITIES" styleName="gx-card-timeline gx-card-eq-height">

        {this.state.meetings.map((activity, index) =>
          <div className="gx-timeline-info" key={index}>
            <h4 className="gx-timeline-info-day">{activity.day}</h4>
            <Timeline>
              {(activity.meetings!=null)?
              activity.meetings.map((task, index) => {
                return(
                <div onClick={(task)=>{
                  this.props.dispatch(task.id)
                  history.push('/inbox')
                }}>
                <TimeLineItem key={index} dot={
                  <Avatar className="gx-size-24" src=""/>}>
                  <ActivityItem task={task}/>
                </TimeLineItem>
                </div>
              )}):<h1>No Meetings for {activity.day}</h1>
              }

            </Timeline>
          </div>)}
        {/*<a href="javascript:void(0);" className="gx-btn-link">ALL ACTIVITIES</a>*/}
      </Widget>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const current_user=auth.authUser
  return {current_user}
};


export default connect(mapStateToProps,mapDispatchToProps)(RecentActivity);
