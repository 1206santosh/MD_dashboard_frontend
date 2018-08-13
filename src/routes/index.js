import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import MeetingsList from "components/Meetings/index";
import Inbox from "components/Tasks/index"
import Dashboard from "components/Dashboard/index"

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path='/meetings' component={MeetingsList} />
      <Route path='/inbox/:task_id' component={Inbox}/>
      <Route path='/inbox' component={Inbox}/>
      <Route path='/' component={Dashboard}/>

    </Switch>
  </div>
);

export default App;
