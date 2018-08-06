import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import IntlMessages from "util/IntlMessages";
import {NAV_STYLE_MINI, THEME_TYPE_LITE} from "constants/ThemeSetting";
import Auxiliary from "util/Auxiliary";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SidebarContent extends Component {

  render() {
    const {navStyle, themeType, verticalNavStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (<Auxiliary>

        <SidebarLogo/>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            inlineCollapsed={verticalNavStyle === NAV_STYLE_MINI}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <MenuItemGroup key="main" title={
              <IntlMessages id="sidebar.main"/>}>

              <Menu.Item key="sample">
                <Link to="/meetings"><i className="icon icon-widgets"/>
                  Meetings</Link>
              </Menu.Item>

              <Menu.Item key="sample">
                <Link to="/inbox"><i className="icon icon-widgets"/>
                  Inbox</Link>
              </Menu.Item>
            </MenuItemGroup>



          </Menu>
        </CustomScrollbars>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, verticalNavStyle, themeType, locale, pathname} = settings;
  return {navStyle, verticalNavStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

