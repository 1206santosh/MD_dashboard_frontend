import React from "react";
import Aux from "util/Auxiliary";



const ActivityItem = ({task,handleClick}) => {
  return (
    <Aux>
      <h4 className="gx-text-truncate" onClick={()=>handleClick(task)}>{task.description}</h4>
      <span className="gx-fs-sm gx-text-grey">{task.scheduled_time}</span>
    </Aux>
  );
};

export default ActivityItem;
