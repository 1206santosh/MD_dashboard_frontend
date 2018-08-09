import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Button, Checkbox, Form, Icon, Input, message} from "antd";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import axios from 'axios'

const FormItem = Form.Item;


class SignIn extends React.Component{
  constructor(props) {
    super(props)
  }


  handleSubmit=(e)=>{
    e.preventDefault()
    const user_email=document.getElementById('user_email').value
    const user_password=document.getElementById('user_password').value
    const data={login_cred:user_email,password:user_password}
    axios.post('https://md-dashboard-backend.herokuapp.com/login',data).then((response)=>{
      console.log(response)
      if(response.data.success){
        sessionStorage.setItem('current_user',JSON.stringify(response.data))
        window.location.href='/'
      }

    })


  }

  render(){
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
                <p><IntlMessages id="app.userAuth.getAccount"/></p>
              </div>
              <div className="gx-app-logo">
                {/*<img alt="example" src={require("assets/images/logo-white.png")}/>*/}
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <FormItem>
                    <Input placeholder="Email" id="user_email"/>
                </FormItem>
                <FormItem>
                    <Input type="password" placeholder="Password" id="user_password"/>
                </FormItem>
                {/*<FormItem>*/}
                  {/*{getFieldDecorator('remember', {*/}
                    {/*valuePropName: 'checked',*/}
                    {/*initialValue: true,*/}
                  {/*})(*/}
                    {/*<Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>*/}
                  {/*)}*/}
                  {/*<a className="gx-signup-form-forgot" href="javascript:void(0);"><IntlMessages*/}
                    {/*id="appModule.termAndCondition"/></a>*/}
                {/*</FormItem>*/}
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn"/>
                  </Button>
                  {/*<span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages*/}
                  {/*id="app.userAuth.signUp"/></Link>*/}
                </FormItem>
                {/*<span*/}
                  {/*className="gx-text-light gx-fs-sm"> demo user email: 'demo@example.com' and password: 'demo#123'</span>*/}
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }


}

export default SignIn
