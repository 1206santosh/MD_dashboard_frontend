import React from "react";
import {Avatar} from "antd";

const ConversationCell = ({comment}) => {
  return (
    <div className="gx-flex-row gx-module-detail-item gx-flex-nowrap">
      <div className="gx-chat-todo-avatar">

        {/*<Avatar className="gx-rounded-circle gx-size-40" src={conversation.thumb}*/}
                {/*alt="..."/>*/}
        <Avatar className="gx-rounded-circle gx-size-40"
                alt="..."/>
      </div>
      <div className="gx-chat-toto-info">
        <div className="gx-flex-column">
          <div className="gx-name gx-mr-2">{comment.commentor_name}</div>
          <div className="gx-time gx-text-muted">{comment.created_at}</div>
        </div>
        <div className="gx-message">{comment.content}</div>
      </div>
    </div>
  )
};

export default ConversationCell;
