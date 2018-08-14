import React from "react";
import {Avatar, Checkbox, Tooltip} from "antd";

import Aux from "util/Auxiliary";
import {taskTags} from "./data";

const getTags = (tags) => {
  return taskTags.map((tag, index) => {
    if (tags.includes(tag.id)) {
      return <Tooltip key={index} title={tag.name}>
        <li className={`gx-text-${tag.color}`}>
          <i className="icon icon-circle gx-fs-xxs"/>
        </li>
      </Tooltip>
    }
  })
};

const TaskItem = ({data, onChange}) => {

  const {description, status, assignee, due_date} = data;
  return (
    <Aux>
      <div className="gx-media gx-task-list-item gx-flex-nowrap">
        <div className="gx-mr-3">
          {/*<Checkbox checked={completed} onChange={() => onChange(data)}/>*/}
        </div>
        <div className="gx-media-body gx-task-item-content">
          <div className="gx-task-item-content-left">
            <h4 className={`${status=="completed" ? 'gx-text-strikethrough' : 'gx-text-truncate gx-text-hover'}`}>{description}</h4>
            <Avatar className="gx-mr-2 gx-size-24" src={""}/>
            <span className=" gx-text-grey">{assignee.name}</span>
          </div>
          <div className="gx-task-item-content-right">
            <ul className="gx-dot-list">
              {/*{getTags(tags)}*/}
            </ul>
            <span className="gx-fs-sm gx-text-grey">Due  {due_date}</span>
          </div>
        </div>
      </div>
    </Aux>

  );
};

export default TaskItem;
