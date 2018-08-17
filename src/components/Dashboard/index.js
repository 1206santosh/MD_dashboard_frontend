import React from "react";
import TaskList from "components/Tasks/TaskList"
import RecentActivity from "components/RecentActivity/RecentActivity"
import { Row, Col } from 'antd';





class Dashboard extends React.Component {
  render(){
    return (
      <div>
      {/*<Row>*/}
        {/*<Col xl={8} lg={8} md={8} sm={24} xs={24}>*/}
          {/*<Metrics title="TOTOAL SALES" styleName="gx-card-eq-height">*/}
            {/*<Row>*/}
              {/*<Col xl={10} lg={24} md={10} sm={24} xs={24}>*/}
                {/*<h1 className="gx-mb-1 gx-font-weight-semi-bold gx-dash-h1">3792</h1>*/}
                {/*<p className="gx-mb-md-0 gx-text-light gx-fs-sm gx-font-weight-semi-bold">Orders this year</p>*/}
              {/*</Col>*/}
              {/*<Col xl={14} lg={24} md={14} sm={24} xs={24}>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</Metrics>*/}
        {/*</Col>*/}
        {/*<Col xl={8} lg={8} md={8} sm={24} xs={24}>*/}
          {/*<Metrics title="TOTOAL SALES" styleName="gx-card-eq-height">*/}
            {/*<Row>*/}
              {/*<Col xl={10} lg={24} md={10} sm={24} xs={24}>*/}
                {/*<h1 className="gx-mb-1 gx-font-weight-semi-bold gx-dash-h1">3792</h1>*/}
                {/*<p className="gx-mb-md-0 gx-text-light gx-fs-sm gx-font-weight-semi-bold">Orders this year</p>*/}
              {/*</Col>*/}
              {/*<Col xl={14} lg={24} md={14} sm={24} xs={24}>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</Metrics>*/}
        {/*</Col>*/}
        {/*<Col xl={8} lg={8} md={8} sm={24} xs={24}>*/}
          {/*<Metrics title="TOTOAL SALES" styleName="gx-card-eq-height">*/}
            {/*<Row>*/}
              {/*<Col xl={10} lg={24} md={10} sm={24} xs={24}>*/}
                {/*<h1 className="gx-mb-1 gx-font-weight-semi-bold gx-dash-h1">3792</h1>*/}
                {/*<p className="gx-mb-md-0 gx-text-light gx-fs-sm gx-font-weight-semi-bold">Orders this year</p>*/}
              {/*</Col>*/}
              {/*<Col xl={14} lg={24} md={14} sm={24} xs={24}>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</Metrics>*/}
        {/*</Col>*/}



      {/*</Row>*/}
      <Row>
        <Col xs={{span:24}} lg={{span:12}}><TaskList/></Col>
        <Col xs={{span:24}} lg={{span:12}} ><RecentActivity/></Col>
      </Row>
      </div>
    )
  }
}

export default Dashboard;
