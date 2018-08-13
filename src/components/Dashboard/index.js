import React from "react";
import TaskList from "components/Tasks/TaskList"
import RecentActivity from "components/RecentActivity/RecentActivity"
import { Row, Col } from 'antd';

class Dashboard extends React.Component {
  render(){
    return (
      <Row>
        <Col span={12} ><TaskList/></Col>
        <Col span={12} ><RecentActivity/></Col>
      </Row>
    )
  }
}

export default Dashboard;
