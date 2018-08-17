import React from "react";
import { Select} from 'antd';
import axios from "axios/index";
const Option = Select.Option;

class AllocateTask extends React.Component {
  constructor(props){
    super(props)
    const current_user=JSON.parse(sessionStorage.getItem('current_user'))
    this.state={
      users:[],
      value:"",
      current_user:current_user
    }

    this.get_users=this.get_users.bind(this)
    this.get_users()
  }

  get_users=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com/users_list',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      console.log(response.data)
      this.setState(
        {
          users:response.data
        }
      )
    })
  }




  render() {
    const data=this.state.users
    const user_options=()=>{
      return data.map(option=>
        <Option key={option.id} >{option.name}</Option>
      )
    }
    return (
      <div style={{width:'50%'}}>
        <Select
          showSearch
          labelInValue
          placeholder="Allocate User"
          style={{width: '100%'}}
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {user_options()}
        </Select>
      </div>
    )
  }
}

export default AllocateTask
