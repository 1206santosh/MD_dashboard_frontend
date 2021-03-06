import React, {Component} from "react";
import { Select, Spin } from 'antd';
// import debounce from 'lodash/debounce';
import axios from "axios/index";
const Option = Select.Option;



class MeetingSearch extends Component{

  constructor(props){
    super(props)
    const current_user=this.props.current_user
    this.state = {
      data:  [],
      value: this.props.selected_meeting,
      fetching: false,
      current_user:current_user,
      allMeetings:[]
    }
    this.get_meetings=this.get_meetings.bind(this)
    this.get_meetings()
  }

  get_meetings=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com/meetings',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      this.setState({
        allMeetings:response.data,
        data: response.data
      })
    })
  }



  // fetchMeeting=(value)=>{
  //   this.setState({ data: [], fetching: true });
  //   const data=this.state.allMeetings.map(meeting=> {
  //     if (meeting.description.include(value.description)) {
  //       return meeting
  //     }
  //   })
  //
  //   this.setState({
  //     data:data
  //   })
  //
  // }



  render(){
    console.log(this.props.selected_meeting)
    return(
      <Select
        labelInValue
        placeholder="Select Meeting"
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={this.props.handleChange}
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        style={{ width: '100%' }}
        value={this.props.selected_meeting}
      >
        {this.state.data.map(d => <Option key={d.id}  value={d.id}>{d.description}</Option>)}
      </Select>

    )
  }

}

export default MeetingSearch
