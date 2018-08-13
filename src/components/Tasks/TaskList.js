import React from "react";
import {Tabs} from "antd";
import Widget from "components/Widget";
import {taskList} from "./data";
import TaskItem from "./TaskItem";

const TabPane = Tabs.TabPane;

class TaskList extends React.Component {
  state = {taskList};

  onChange = (data, index) => {
    this.setState((prevState) => ({
      taskList: prevState.taskList.map(task => {
        if (task.id === data.id) {
          task.completed = !data.completed;
        }
        return task;
      })
    }))
  };

  render() {
    return (
      <Widget title="TASK LIST" styleName="gx-card-tabs gx-card-eq-height">
        <Tabs defaultActiveKey="1">
          <TabPane tab="All Task" key="1">
            {
              this.state.taskList.map((task, index) =>
                <TaskItem key={index} data={task} onChange={this.onChange}/>)
            }
          </TabPane>
          <TabPane tab="My Task" key="2">{
            this.state.taskList.map((task, index) =>
              <TaskItem key={index} data={task} onChange={this.onChange}/>)
          }</TabPane>
        </Tabs>
      </Widget>
    );
  }
}


export default TaskList;
