import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout, Popover} from "antd";
import CustomScrollbars from "util/CustomScrollbars";

import languageData from "./languageData";
import {onVerticalNavStyleChange, switchLanguage, toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  HORIZONTAL_NAVIGATION,
  INSIDE_THE_HEADER,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI,
  TAB_SIZE,
  VERTICAL_NAVIGATION
} from "constants/ThemeSetting";
import HorizontalNav from "./HorizontalNav";
import Auxiliary from "util/Auxiliary";

const {Header} = Layout;

class Topbar extends Component {

  state = {
    searchText: '',
  };



  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };


  render() {
    const {locale, navStyle, horizontalNavPosition, navCollapsed, width} = this.props;
    let {verticalNavStyle} = this.props;
    if (width < TAB_SIZE && verticalNavStyle === NAV_STYLE_FIXED) {
      verticalNavStyle = NAV_STYLE_DRAWER;
    }
    return (
      <Auxiliary>
        {navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER && width >= TAB_SIZE ?
          <div className="gx-nav-header"><HorizontalNav/></div> : null}
        <Header
          className={`${navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER ? 'gx-layout-header-horizontal' : ''}`}>
          {width < TAB_SIZE || (navStyle === VERTICAL_NAVIGATION && verticalNavStyle === NAV_STYLE_DRAWER) ?
            <div className="gx-linebar gx-mr-3">
              <i className="gx-icon-btn icon icon-menu"
                 onClick={() => {
                   if (width <= TAB_SIZE || verticalNavStyle === NAV_STYLE_DRAWER) {
                     this.props.toggleCollapsedSideNav(!navCollapsed);
                   } else if (verticalNavStyle === NAV_STYLE_FIXED) {
                     this.props.onVerticalNavStyleChange(NAV_STYLE_MINI)
                   } else {
                     this.props.onVerticalNavStyleChange(NAV_STYLE_FIXED)
                   }
                 }}
              />

            </div> : null}


          {width >= TAB_SIZE && navStyle === HORIZONTAL_NAVIGATION ? <div className="gx-site-logo gx-mr-2">
            <img src={require("assets/images/logo.png")}/>
          </div> : null}


          <SearchBox styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
                     placeholder="Search in app..."
                     onChange={this.updateSearchChatUser.bind(this)}
                     value={this.state.searchText}/>

          {width >= TAB_SIZE && navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER ?
            <HorizontalNav/> : null}
          <ul className="gx-header-notifications gx-ml-auto">
            <Popover placement="bottomRight" content={
              <SearchBox styleName="gx-popover-search-bar"
                         placeholder="Search in app..."
                         onChange={this.updateSearchChatUser.bind(this)}
                         value={this.state.searchText}/>
            } trigger="click">
              <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                <span className="gx-pointer gx-d-block"><i className="icon icon-search gx-fs-xl"/></span>
              </li>
            </Popover>
            <Popover placement="bottomRight" content={<AppNotification/>} trigger="click">
              <li className="gx-notify">
                <span className="gx-pointer gx-d-block"><i className="icon icon-notification gx-fs-xl"/></span>
              </li>
            </Popover>
            {/*<li className="gx-msg">*/}
              {/*<Popover placement="bottomRight" content={<MailNotification/>} trigger="click">*/}
            {/*<span className="gx-pointer gx-status-pos gx-d-block">*/}
              {/*<i className="icon icon-chat gx-fs-xl"/>*/}
              {/*<span className="gx-status gx-status-rtl gx-small gx-orange"/>*/}
            {/*</span>*/}
              {/*</Popover>*/}
            {/*</li>*/}
            {/*<li className="gx-language">*/}
              {/*<Popover placement="bottomRight" content={this.languageMenu()} trigger="click">*/}
              {/*<span className="gx-pointer gx-flex-row gx-align-items-center"><i*/}
                {/*className={`flag flag-24 flag-${locale.icon}`}/>*/}
                {/*<span className="gx-pl-2 gx-language-name">{locale.name}</span>*/}
                {/*<i className="icon icon-charvlet-down gx-pl-2"/>*/}
              {/*</span>*/}
              {/*</Popover>*/}
            {/*</li>*/}
            <li className="gx-user-nav">
            <span className="gx-pointer gx-d-block">
              <UserInfo/>
            </span>

            </li>
          </ul>
        </Header>
        { width >= TAB_SIZE && navStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER ?
          <div className="gx-nav-header gx-nav-header-ble"><HorizontalNav/></div> : null}
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {navStyle, verticalNavStyle, horizontalNavPosition, locale, width, navCollapsed} = settings;
  return {navStyle, verticalNavStyle, horizontalNavPosition, locale, width, navCollapsed}
};

export default connect(mapStateToProps, {onVerticalNavStyleChange, toggleCollapsedSideNav, switchLanguage})(Topbar);
