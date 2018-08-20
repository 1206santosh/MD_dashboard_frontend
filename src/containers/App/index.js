import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {LocaleProvider} from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import {LAYOUT_TYPE_BOXED, LAYOUT_TYPE_FRAMED, LAYOUT_TYPE_FULL} from "constants/ThemeSetting";
import SignIn from "components/SignIn/index.js"
// import {auth} from "../../firebase/firebase";
import { bindActionCreators } from 'redux';
import {userSignIn} from 'appRedux/actions/Auth'



const RestrictedRoute = ({component: Component, ...rest, authUser}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />;





class App extends Component {
  constructor(props){
    super(props)
    const authUser=this.props.current_user
    this.state={authUser:authUser}
  }
  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  render() {
    const {match, location, layoutType, locale} = this.props;
    this.setLayoutType(layoutType);
    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <Switch>
            <Route path='/signin' component={SignIn}/>
            <RestrictedRoute path={`${match.url}`} authUser={this.state.authUser}
                             component={MainApp}/>
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }


}

const mapStateToProps = ({settings,auth}) => {
  const {locale, layoutType} = settings;
  const current_user=auth.authUser
  return {locale, layoutType,current_user}
};
export default connect(mapStateToProps)(App);
