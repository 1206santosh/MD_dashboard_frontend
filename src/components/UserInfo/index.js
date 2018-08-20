import React, {Component} from "react";
import {Avatar, Popover} from "antd";
import {userSignOut} from 'appRedux/actions/Auth'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';


const mapDispatchToProps=(dispatch)=>{
  return {actions: bindActionCreators(userSignOut,dispatch)}
}

class UserInfo extends Component {
  constructor(props){
    super(props)
    this.logOut=this.logOut.bind(this)

  }

  logOut=(e)=>{
    this.props.dispatch(userSignOut())
    window.location.reload()
  }

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        {/*<li>Connections</li>*/}
        <li onClick={this.logOut}>Logout</li>
      </ul>
    );

    return (
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src="http://via.placeholder.com/150x150"
                className="gx-size-50 gx-pointer" alt=""/>
      </Popover>
    )

  }
}

export default connect(mapDispatchToProps)(UserInfo);
