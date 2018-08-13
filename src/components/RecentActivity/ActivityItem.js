import React from "react";

import Aux from "util/Auxiliary";

const ActivityItem = ({task}) => {

  return (
    <Aux>
      <h4 className="gx-text-truncate">{task.title}</h4>
      <span className="gx-fs-sm gx-text-grey">{task.time}</span>
    </Aux>
  );
};

export default ActivityItem;
