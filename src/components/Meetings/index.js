import React from "react";
import { Divider } from 'antd';
import { Table} from 'antd';
import axios from 'axios';
import MeetingsForm from "./meetings_form";
import TaskForm from "../Tasks/taskform";
import {connect} from "react-redux";


const mapStateToProps=state=>{
  const current_user=state.auth.authUser
  return {current_user}
}



class MeetingsList extends React.Component{

  constructor(props){
    super(props)
    const current_user=props.current_user
    this.state={data:[],tasks:[],current_user:current_user}
    this.get_meetings=this.get_meetings.bind(this)
    this.get_task_table=this.get_task_table.bind(this)
    // this.set_tasks=this.set_tasks.bind(this)
    // this.handleExpansion=this.handleExpansion.bind(this)
    this.get_meetings()

  }


  get_meetings=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com/meetings',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
        this.setState({
          data:response.data,
        })
    })
  }

  handleExpansion=(expanded,record)=> {
    if (expanded) {
      axios.get('https://md-dashboard-backend.herokuapp.com/tasks?meeting_id='+record.id,{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
        let meeting_tasks={}
        meeting_tasks["meeting"+record.id]=response.data
        this.setState(meeting_tasks)
      })

      return true
    }
  }

  // set_tasks(response){
  //   this.setState(
  //     {
  //       tasks:response.data
  //     }
  //   )
  // }

  get_task_table=(record)=>{
    const columns = [
      { title: 'Description', dataIndex: 'description', key: 'task_description' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Due Date', dataIndex: 'due_date', key: 'due_date' },
    ];


    const task_form=<TaskForm meeting_id={record.id} current_user={this.state.current_user}/>

    return (
      <div>
      <Table
        columns={columns}
        dataSource={this.state["meeting"+record.id]}
        pagination={false}
        className="gx-table-responsive"
      />
        {task_form}
      </div>
    );
  }




  render(){
    const expandedRowRender = this.get_task_table
    const columns = [
      {
        title:'ID',
        dataIndex:"id",
        key:"id",
        render: text => <a href="javascript:;">{text}</a>,
      },

      {
      title: 'Scheduled Time',
      dataIndex: 'scheduled_time',
      key: 'scheduled_time:',

    },
      {
      title: 'Description',
      dataIndex: 'description',
      key: 'description:',
    },
    ];

    // const data = [
    //   {
    //     id:"1",
    //   name: 'John Brown',
    //   description: 'New York No. 1 Lake Park',
    // },
    //   {
    //     id:"2",
    //     name: 'John Brown',
    //     description: 'New York No. 1 Lake Park',
    //   },
    //   {
    //     id:"3",
    //     name: 'John Brown',
    //     description: 'New York No. 1 Lake Park',
    //   },
    //   {
    //     id:'4',
    //     name: 'John Brown',
    //     description: 'New York No. 1 Lake Park',
    //   },
    //   ];



    return(
      <div>
        <h1>Meeting List</h1>
        <MeetingsForm current_user={this.state.current_user}/>
        <Divider></Divider>
        <Table className="gx-table-responsive" columns={columns} dataSource={this.state.data} pagination={false}  expandedRowRender={expandedRowRender}  onExpand={this.handleExpansion} />
      </div>
    )
  }
}


export default connect(mapStateToProps)(MeetingsList)
