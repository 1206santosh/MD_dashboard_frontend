import React, {Component} from "react";
import {Avatar, Popover} from "antd";

class UserInfo extends Component {

  logOut=(e)=>{
    sessionStorage.removeItem('current_user')
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

export default UserInfo;
