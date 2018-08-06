import React, {Component} from "react";
import {Layout} from "antd";

import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import {footerText} from "util/config";
import App from "routes/index";

const {Content, Footer} = Layout;


export class MainApp extends Component {


  render() {
    const {match} = this.props;

    return (
      <Layout>
        <Sidebar/>

        <Layout>
          <Topbar/>
          <Content>
            <App match={match}/>
            <Footer>
              {footerText}
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default MainApp;
