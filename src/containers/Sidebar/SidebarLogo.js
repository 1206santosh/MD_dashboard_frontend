import React, {Component} from "react";
import {connect} from "react-redux";

import {onVerticalNavStyleChange, toggleCollapsedSideNav} from "appRedux/actions/Setting";
import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI, TAB_SIZE, THEME_TYPE_LITE} from "constants/ThemeSetting";


class SidebarLogo extends Component {

  render() {
    const {width, themeType, navCollapsed} = this.props;
    let {verticalNavStyle} = this.props;
    if (width < TAB_SIZE && verticalNavStyle === NAV_STYLE_FIXED) {
      verticalNavStyle = NAV_STYLE_DRAWER;
    }
    return (
      <div className="gx-layout-sider-header">

        {verticalNavStyle === NAV_STYLE_DRAWER ? null : <div className="gx-linebar">
          <i
            className={`gx-icon-btn icon icon-${verticalNavStyle === NAV_STYLE_MINI ? 'menu-unfold' : 'menu-fold'} ${themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''}`}
            onClick={() => {
              if (verticalNavStyle === NAV_STYLE_DRAWER) {
                this.props.toggleCollapsedSideNav(!navCollapsed);
              } else if (verticalNavStyle === NAV_STYLE_FIXED) {
                this.props.onVerticalNavStyleChange(NAV_STYLE_MINI)
              } else {
                this.props.onVerticalNavStyleChange(NAV_STYLE_FIXED)
              }
            }}
          />
        </div>}

        <div className="gx-site-logo">
          {/*{themeType === THEME_TYPE_LITE ? <img src={require("assets/images/logo.png")}/> :*/}
            {/*<img src={require("assets/images/Deepak-About-Deepak_Nitrite-Logo.png")} styles={{width:'10% !important'}}/>*/}
          {/*}*/}
          <a href="/"> MD DASHBOARD</a>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {verticalNavStyle, themeType, width, navCollapsed} = settings;
  return {verticalNavStyle, themeType, width, navCollapsed}
};

export default connect(mapStateToProps, {onVerticalNavStyleChange, toggleCollapsedSideNav})(SidebarLogo);
