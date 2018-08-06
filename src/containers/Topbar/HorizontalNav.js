import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import IntlMessages from "util/IntlMessages";
import {NAV_STYLE_MINI, THEME_TYPE_LITE} from "constants/ThemeSetting";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HorizontalNav extends Component {

  render() {
    const {themeType, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">

        <MenuItemGroup key="main" title={
          <IntlMessages id="sidebar.main"/>}>

          <Menu.Item key="sample">
            <Link to="/sample"><i className="icon icon-widgets"/>
              <IntlMessages id="sidebar.samplePage"/></Link>
          </Menu.Item>

        </MenuItemGroup>

      </Menu>
    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {themeType, pathname} = settings;
  return {themeType, pathname}
};
export default connect(mapStateToProps)(HorizontalNav);

