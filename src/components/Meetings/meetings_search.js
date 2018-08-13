import React, {Component} from "react";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import axios from "axios/index";
const Option = Select.Option;



class MeetingSearch extends Component{

  constructor(props){
    super(props)
    const current_user=JSON.parse(sessionStorage.current_user)
    this.state = {
      data: [],
      value: [],
      fetching: false,
      current_user:current_user,
      allMeetings:[]
    }
    this.get_meetings=this.get_meetings.bind(this)
    this.get_meetings()
  }

  get_meetings=()=>{
    console.log(this.state.current_user.auth_token)
    axios.get('https://md-dashboard-backend.herokuapp.com/meetings',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      console.log(response)
      this.setState({
        allMeetings:response.data,
        data: response.data
      })
    })
  }

  // handleChange = (value) => {
  //   console.log(value)
  // }

  fetchMeeting=(value)=>{
    this.setState({ data: [], fetching: true });
    const data=this.state.allMeetings.map(meeting=> {
      console.log(meeting.description.prop)
      if (meeting.description.include(value.description)) {
        return meeting
      }
    })

    this.setState({
      data:data
    })

  }



  render(){
    return(
      <Select
        labelInValue
        placeholder="Select Meeting"
        filterOption={false}
        onChange={this.props.handleChange}
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        onSearch={this.fetchMeeting}
        style={{ width: '100%' }}
      >
        {this.state.data.map(d => <Option key={d.id} >{d.description}</Option>)}
      </Select>

    )
  }

}

export default MeetingSearch
