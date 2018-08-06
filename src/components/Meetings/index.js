import React from "react";
import { Divider } from 'antd';
import { Table, Icon} from 'antd';
import axios from 'axios';
import MeetingsForm from "./meetings_form";
import TaskForm from "../Tasks/taskform";





class MeetingsList extends React.Component{

  constructor(props){
    super(props)
    const current_user=JSON.parse(sessionStorage.current_user)
    this.state={data:[],tasks:[],current_user:current_user}
    this.get_meetings=this.get_meetings.bind(this)
    this.get_task_table=this.get_task_table.bind(this)
    this.set_tasks=this.set_tasks.bind(this)
    this.handleExpansion=this.handleExpansion.bind(this)
    this.get_meetings()

  }


  get_meetings=()=>{
    console.log(this.state.current_user.auth_token)
    axios.get('https://md-dashboard-backend.herokuapp.com/meetings',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      console.log(response)
        this.setState({
          data:response.data,
        })
    })
  }

  handleExpansion=(expanded,record)=> {
    if (expanded) {
      // console.log(record)
      // axios.get('https://md-dashboard-backend.herokuapp.com/tasks').then(function (response) {
      //   console.log(response)
      // })
      // let expand_data = []
      // axios.get('https://md-dashboard-backend.herokuapp.com/tasks').then((response)=>{
      //   console.log(response)
      //   this.setState({
      //     tasks:response.data
      //   })
      // })
      let expand_data=[]
      axios.get('https://md-dashboard-backend.herokuapp.com/tasks?meeting_id='+record.id,{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
        console.log(response)
        this.setState({
          tasks:response.data
        })
      })

      return true
    }
  }

  set_tasks(response){
    this.setState(
      {
        tasks:response.data
      }
    )
  }

  get_task_table=(record)=>{
    console.log(record.id)
    const columns = [
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Due Date', dataIndex: 'due_date', key: 'due_date' },
    ];

    const task_form=<TaskForm meeting_id={record.id}/>

    return (
      <div>
      <Table
        columns={columns}
        dataSource={this.state.tasks}
        pagination={false}
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


   console.log(this.state.data)
    return(
      <div>
        <h1>Meeting List</h1>
        <MeetingsForm/>
        <Divider></Divider>
        <Table columns={columns} dataSource={this.state.data} pagination={false}  expandedRowRender={expandedRowRender}  onExpand={this.handleExpansion} />
      </div>
    )
  }
}


export default MeetingsList
