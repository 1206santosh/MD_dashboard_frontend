import React from "react";
import CustomScrollbars from 'util/CustomScrollbars'

import ToDoItem from "./ToDoItem/index";

const ToDoList = (({toDos, onTodoSelect, onTodoChecked, onMarkAsStart}) => {
  console.log(toDos)
  return (
    <div className="gx-module-list">
      <CustomScrollbars className="gx-module-content-scroll">
        {toDos.map((todo, index) =>
          <ToDoItem key={index} index={index} todo={todo} onTodoSelect={onTodoSelect}
                    onMarkAsStart={onMarkAsStart}
                    onTodoChecked={onTodoChecked}/>
        )}
      </CustomScrollbars>
    </div>
  )
});

export default ToDoList;