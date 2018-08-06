import React from "react";
import axios from 'axios';
import { Modal, Button } from 'antd';
import { Form, Icon, Input,DatePicker,Select} from 'antd';




const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class MeetingsForm extends React.Component{
  constructor(props){
    super(props)
    const current_user=JSON.parse(sessionStorage.current_user)
    this.state = { visible: false ,date:"",users:[],current_user:current_user}
    this.handleSubmit=this.handleSubmit.bind(this)
    this.get_date=this.get_date.bind(this)
    this.get_users=this.get_users.bind(this)
    this.get_attendees=this.get_attendees.bind(this)
    this.get_users()
  }

  showModal = () => {
    this.setState({
      visible: true,

    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  get_attendees=(value)=>{
    console.log(value)
    this.setState({
      attendees:value
    })
  }

  get_users=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com/users_list',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      console.log(response)
      this.setState(
        {
          users:response.data
        }
      )
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    const formData={meeting:''}
    let description=document.getElementById('description').value
    let scheduled_time=this.state.date
    let attendess=this.state.attendees
    console.log(attendess)
    formData.meeting={description:description,scheduled_time:scheduled_time}
    formData.attendess=attendess
    console.log(formData)
    axios.post('https://md-dashboard-backend.herokuapp.com/meetings',formData,{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then(function (response) {
      console.log(response)
      window.location.reload()


    })
      .catch(function (error) {
        console.log(error)

      })

    this.setState({
      visible: false,
    });

  }

  get_date=(date,dateString)=>{
    console.log(date)
    console.log(dateString)
    this.setState({
      date:dateString
    })
  }





    render(){
    const data=this.state.users
      const user_options=()=>{
        return data.map(option=>
          <Option key={option.id} value={option.id}>{option.name}</Option>
        )
      }
    return(
      <div>
        <Button type="primary" onClick={this.showModal}>Create Meeting</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem label="Description">
              <TextArea ref="description" name="description" id="description"/>
            </FormItem>

            <FormItem label="Scheduled Time">
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"  ref="scheduled_time" name="scheduled_time" id="scheduled_time" onChange={this.get_date}/>
            </FormItem>

            <FormItem label="Attendes">
              <Select mode="multiple" placeholder="Please select favourite colors" id="attendess" refs="attendess" onChange={this.get_attendees}>
                {user_options()}
              </Select>
            </FormItem>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>



        </Modal>
      </div>
    )
  }
}


export default MeetingsForm