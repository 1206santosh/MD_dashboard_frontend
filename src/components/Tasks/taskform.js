import React from "react";
import { Form, Icon, Input, Button, Checkbox} from 'antd';
import { Modal } from 'antd';
import { DatePicker,Select } from 'antd';
import axios from 'axios';
import { Upload, message } from 'antd';
import "components/Tasks/Taskform.css"

const Dragger = Upload.Dragger;
const { RangePicker, MonthPicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class TaskForm extends React.Component{
   constructor(props){
     super(props)
     const current_user=props.current_user
     this.state={visible:false,file_ids:[],users:[],current_user:current_user}
     this.handleSubmit=this.handleSubmit.bind(this)
     this.handleUpload=this.handleUpload.bind(this)
     this.get_users=this.get_users.bind(this)
     this.get_assignee=this.get_assignee.bind(this)
     this.get_users()
   }

  get_assignee=(value)=>{
    this.setState({
      assignee:value
    })
  }

  get_users=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com/users_list',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      this.setState(
        {
          users:response.data
        }
      )
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleSubmit=(e)=>{
     e.preventDefault()
     const description=document.getElementById('description').value
     const due_date=this.state.date
     const file_ids=this.state.file_ids
     const meeting_id=document.getElementById('meeting_id').value
     const formdata={task:{},file_ids:file_ids}
     const assignee=this.state.assignee
     formdata.task={description:description,due_date:due_date,meeting_id:meeting_id,assignee_id:assignee}
     axios.post("https://md-dashboard-backend.herokuapp.com/tasks",formdata,{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
       window.location.reload()
     })

  }

  get_date=(date,dateString)=>{
    this.setState({
      date:dateString
    })
  }

  handleUpload=(file)=>{
    if(file.file.status==="done"){
      const file_ids=file.file.response.id
     const p_files_ids=this.state.file_ids
     const n_files_ids=[...p_files_ids,file_ids]
      this.setState({
        file_ids:n_files_ids
      })
    }

  }





  render(){
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const data=this.state.users
    const user_options=()=>{
      return data.map(option=>
        <Option key={option.id} value={option.id}>{option.name}</Option>
      )
    }


    return(
      <div>
        <Button type="primary" onClick={this.showModal}>Create Tasks</Button>
        <Modal
          title="Create Task"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" loading={this.state.loading} htmlType="submit" onClick={this.handleSubmit}>
              Submit
            </Button>,
          ]}
        >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem label="Task Description"  {...formItemLayout}>
            <TextArea ref="description" name="description" id="description"/>
          </FormItem>

          <FormItem label="Due Date"  {...formItemLayout}>
            <DatePicker renderExtraFooter={() => 'extra footer'}  onChange={this.get_date} />
          </FormItem>
          <FormItem label="Assignee"  {...formItemLayout}>
            <Select  id="attendess" refs="attendess" onChange={this.get_assignee}>
              {user_options()}
            </Select>
          </FormItem>
          <input type="hidden" value={this.props.meeting_id} id="meeting_id" />
          <Dragger name="upload[file]"
                   action="https://md-dashboard-backend.herokuapp.com/uploads"
                   multiple={true}
                   onChange={this.handleUpload}
                   headers={{"Authorization":"Token token="+this.state.current_user.auth_token}}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
          </Dragger>,
          {/*<Button type="primary" htmlType="submit">Submit</Button>*/}
        </Form>
        </Modal>

      </div>
    )

  }

}

export default TaskForm
