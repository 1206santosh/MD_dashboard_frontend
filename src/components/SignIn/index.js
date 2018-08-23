import React from "react";
import {Button, Checkbox, Form, Icon, Input, message} from "antd";
import axios from 'axios'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import {userSignInSuccess} from 'appRedux/actions/Auth'



const FormItem = Form.Item;
const mapDispatchToProps=(dispatch)=>{
  return {actions: bindActionCreators(userSignInSuccess,dispatch)}
}

class SignIn extends React.Component{
  constructor(props) {
    super(props)
    this.handleSubmit=this.handleSubmit.bind(this)
  }


  handleSubmit=(e)=>{
    e.preventDefault()
    const user_email=document.getElementById('user_email').value
    const user_password=document.getElementById('user_password').value
    const data={login_cred:user_email,password:user_password}
    axios.post('https://md-dashboard-backend.herokuapp.com/login',data).then((response)=>{
      if(response.data.success){
        this.props.dispatch(userSignInSuccess(response.data))
        window.location.href='/'

      }

    })


  }

  render(){
    return (
    <div className="gx-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Sign In</h1>
        </div>
        <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
          <FormItem>
            {/*{getFieldDecorator('email', {*/}
              {/*rules: [{required: true, message: 'Please input your username!'}],*/}
            {/*})(*/}
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     placeholder="Username" id="user_email"/>
            {/*)}*/}
          </FormItem>
          <FormItem>
            {/*{getFieldDecorator('password', {*/}
              {/*rules: [{required: true, message: 'Please input your Password!'}],*/}
            {/*})(*/}
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                     type="password"
                     placeholder="Password" id="user_password"/>
            {/*)}*/}
          </FormItem>
          <FormItem>
            {/*{getFieldDecorator('remember', {*/}
              {/*valuePropName: 'checked',*/}
              {/*initialValue: true,*/}
            {/*})(*/}
              {/*<Checkbox>Remember me</Checkbox>*/}
            {/*)}*/}
            {/*<Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot password</Link>*/}
          </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
    );
  }


}

export default connect(mapDispatchToProps)(SignIn)
