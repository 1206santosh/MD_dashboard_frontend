import React, {Component} from "react";
import {Drawer, Dropdown, Menu, message, Spin} from "antd";
import CustomScrollbars from "util/CustomScrollbars";
import filters from "./data/filters";
import labels from "./data/labels";
import options from "./data/options";
import todoConversation from "./data/todoConversation";
import ToDoList from "components/todo/ToDoList";
import ToDoDetail from "components/todo/ToDoDetail/index";
import AppModuleHeader from "components/AppModuleHeader/index";
import IntlMessages from "util/IntlMessages";
import axios from "axios/index";
import TaskForm from "components/Tasks/taskform";
import {connect} from 'react-redux';
import {TodoToShow} from "appRedux/actions/Todo";
import MeetingSearch from "components/Meetings/meetings_search"
import configureStore from "../../appRedux/store";
import TaskTimeLine from "../../components/Tasks/TaskTimeLine";
import {bindActionCreators} from "redux";



const ITEM_HEIGHT = 34;

export const store = configureStore();

const mapDispatchToProps=(dispatch)=>{
  return {actions: bindActionCreators(TodoToShow,dispatch)}
}

const mapStateToProps = ({auth,task}) => {
  console.log(task)
  const current_user=auth.authUser
  let currentTodo=null
  if(task.currentTodo){
     currentTodo=task.currentTodo.payload
  }


  return {current_user,currentTodo}
};
//
// const mapStateToProps=state=>{
//    const currentTodo=state.task.currentTodo
//    const current_user=state.auth.authUser
//   return {currentTodo,current_user}
// }

class ToDo extends Component {

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      toDos: (this.state.toDos, oldIndex, newIndex),
    });
  };
  onLabelSelect = event => {
    this.setState({
      anchorEl: event.currentTarget,
      labelMenuState: !this.state.labelMenuState
    })
  };
  onOptionMenuSelect = event => {
    this.setState({
      anchorEl: event.currentTarget,
      optionMenuState: !this.state.optionMenuState
    })
  };
  onOptionMenuItemSelect = (e) => {
    switch (e.key) {
      case 'All':
        this.handleRequestClose();
        this.getAllTodo();
        break;
      case 'Today':
        this.handleRequestClose();
        this.getTodayTodo();
        break;
    }
  };
  getAllTodo = () => {
    let toDos = this.state.allToDos.map((todo) => todo ? {
      ...todo,
      selected: true
    } : todo);
    this.setState({
      selectedToDos: toDos.length,
      optionName: 'All',
      toDos: toDos
    });
  };
  getTodayTodo = () => {
    let toDos = this.state.allToDos.filter((todo) => {
      if(todo.scheduled){
        return todo
      }
      }
    );
    this.setState({
      selectedToDos: 0,
      optionName: 'Today',
      toDos: toDos
    });
  };
  getStarredToDo = () => {
    let selectedToDos = 0;
    let toDos = this.state.allToDos.map((todo) => {
      if (todo.starred) {
        selectedToDos++;
        return {...todo, selected: true};
      }
      return {...todo, selected: false}
    });
    this.setState({
      selectedToDos: selectedToDos,
      allToDos: toDos,
      toDos: toDos.filter(todo => !todo.deleted)
    });
    return toDos;
  };
  getUnStarredTodo = () => {
    let selectedToDos = 0;
    let toDos = this.state.allToDos.map((todo) => {
      if (!todo.starred) {
        selectedToDos++;
        return {...todo, selected: true};
      }
      return {...todo, selected: false}
    });
    this.setState({
      selectedToDos: selectedToDos,
      allToDos: toDos,
      optionName: 'Unstarred',
      toDos: toDos.filter(todo => !todo.deleted)
    });
    return toDos;
  };
  getImportantToDo = () => {
    let selectedToDos = 0;
    let toDos = this.state.allToDos.map((todo) => {
      if (todo.important) {
        selectedToDos++;
        return {...todo, selected: true};
      }
      return {...todo, selected: false}
    });
    this.setState({
      selectedToDos: selectedToDos,
      allToDos: toDos,
      optionName: 'Important',
      toDos: toDos.filter(todo => !todo.deleted)
    });
    return toDos;
  };
  getUnimportantToDo = () => {
    let selectedToDos = 0;
    let toDos = this.state.allToDos.map((todo) => {
      if (!todo.important) {
        selectedToDos++;
        return {...todo, selected: true};
      }
      return {...todo, selected: false}
    });
    this.setState({
      selectedToDos: selectedToDos,
      allToDos: toDos,
      optionName: 'Unimportant',
      toDos: toDos.filter(todo => !todo.deleted)
    });

    return toDos;
  };
  onLabelMenuItemSelect = (e) => {
    const label = +e.key;
    this.handleRequestClose();
    const toDos = this.state.allToDos.map(todo => {
        if (todo.selected) {
          if (todo.labels.includes(label.id)) {
            return {...todo, labels: this.removeLabel(todo, label.id)};
          } else {
            return {...todo, labels: this.addLabel(todo, label.id)};
          }
        } else {
          return todo;
        }
      }
    );
    this.setState({
      alertMessage: 'Label Updated Successfully',
      showMessage: true,
      allToDos: toDos,
      toDos: toDos
    });
  };
  handleRequestClose = () => {
    this.setState({showMessage: false, addTodo: false, labelMenuState: false, optionMenuState: false,});
  };
  onLabelUpdate = (data, label) => {
    if (data.labels.includes(label.id)) {
      data.labels = this.removeLabel(data, label.id);
    } else {
      data.labels = this.addLabel(data, label.id);
    }
    this.handleRequestClose();
    const toDos = this.state.allToDos.map(todo => {
        if (todo.id === data.id) {
          return data;
        } else {
          return todo;
        }
      }
    );

    this.setState({
      alertMessage: 'Label Updated Successfully',
      showMessage: true,
      currentTodo: data,
      allToDos: toDos,
      toDos: toDos,
    });
  };
  onMarkAsStart = (data) => {
    const toDos = this.state.allToDos.map(todo => {
      if (todo.id === data.id) {
        return data;
      } else {
        return todo;
      }
    });
    this.setState({
      alertMessage: 'ToDo Updated Successfully',
      showMessage: true,
      allToDos: toDos,
      toDos: toDos,
    });
  };

  onToDoUpdate = (data) => {
    this.handleRequestClose();
    axios.post('https://md-dashboard-backend.herokuapp.com/tasks/'+this.state.currentTodo.id+'/toggle_state',{},{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      const currentTodo=this.state.currentTodo
      currentTodo.status=response.data.new_state
      this.setState({
        alertMessage: 'Task  Marked  Successfully',
        showMessage: true,
        currentTodo: currentTodo,
      });
    })

  };


  onDeleteToDo = (data) => {
    let selectedToDos = 0;
    const toDos = this.state.allToDos.map(todo => {
        if (todo.selected) {
          selectedToDos++
        }
        if (data.id === todo.id) {
          if (todo.selected) {
            selectedToDos--
          }
          return {...todo, deleted: true};
        } else {
          return todo;
        }
      }
    );
    this.setState({
      alertMessage: 'ToDo Deleted Successfully',
      showMessage: true,
      allToDos: toDos,
      currentTodo: null,
      selectedToDos: selectedToDos,
      toDos: toDos.filter((todo) => !todo.deleted)
    });

  };
  getNavFilters = () => {
    return filters.map((filter, index) =>
      <li key={index} onClick={() => {
        const filterMails = this.state.allToDos.filter(todo => {
          if (filter.id === 0 && todo.starred) {
            return todo
          } else if (filter.id === 1 && todo.scheduled) {

            return todo
          } else if (filter.id === 2 && todo.completed) {
            return todo
          }
          // } else if (filter.id === 3 && todo.important) {
          //   return todo
          // } else if (filter.id === 4 && todo.completed) {
          //   return todo
          // } else if (filter.id === 5 && todo.deleted) {
          //   return todo
          // }
        });
        this.setState({
          loader: true,
          currentTodo: null,
          filter: filter.id,
          toDos: filterMails
        });
        setTimeout(() => {
          this.setState({loader: false});
        }, 1500);
      }
      }>
        <a href="javascript:void(0);" className={filter.id === this.state.selectedSectionId ? 'active' : ''}>
          <i className={`icon icon-${filter.icon}`}/>
          <span>{filter.title}</span>
        </a>
      </li>
    )
  };
  getNavLabels = () => {
    return labels.map((label, index) =>
      <li key={index} onClick={() => {
        const filterMails = this.state.allToDos.filter(todo => todo.labels.includes(label.id));
        this.setState({
          loader: true,
          currentTodo: null,
          toDos: filterMails
        });
        setTimeout(() => {
          this.setState({loader: false});
        }, 1500);
      }
      }>
        <a href="javascript:void(0);">
          <i className={`icon icon-circle gx-text-${label.color}`}/>
          <span>{label.title}</span>
        </a>
      </li>
    )
  };

  filterByMeeting=(meeting_id)=>{

    this.setState({
      loader: true
    })
    const todos=this.state.allToDos.filter(todo=>{
      if(todo.meeting_id==meeting_id.key){
        return todo
      }
    })

    this.setState({
      toDos:todos,
      loader:false,
      infilter:true,
      meeting:meeting_id.key

    })
  };



  ToDoSideBar = () => {
    return <div className="gx-module-side">
      <div className="gx-module-side-header">
        <div className="gx-module-logo">
          <i className="icon icon-check-circle-o gx-mr-4"/>
          Tasks
        </div>

      </div>
      <div className="gx-module-side-content">
        <CustomScrollbars className="gx-module-side-scroll">
          <div className="gx-module-add-task">
            {/*<Button variant="raised" type="primary" className="gx-btn-block"*/}
                    {/*onClick={() => {*/}
                      {/*this.setState({addTodo: true})*/}
                    {/*}}>Add Task </Button>*/}
            {/*<TaskForm/>*/}
          </div>
          <ul className="gx-module-nav">

            <li onClick={() => {
              this.setState({
                currentTodo: null,
                toDos: this.state.allToDos
              });
            }
            }>
              <a className="active" href="javascript:void(0);">
                <i className="icon icon-all-contacts gx-pt-1"/>
                <span><IntlMessages id="todo.all"/></span>
              </a>
            </li>

            <li className="gx-module-nav-label">
              <IntlMessages id="todo.filters"/>
            </li>



            {/*<li className="gx-module-nav-label">*/}
              {/*<IntlMessages id="todo.labels"/>*/}
            {/*</li>*/}

            {/*{this.getNavLabels()}*/}
            {(this.state.currentTodo === null || this.state.currentTodo === undefined) ?
            <MeetingSearch handleChange={this.filterByMeeting} current_user={this.state.current_user}/>:<TaskTimeLine todo={this.state.currentTodo} current_user={this.state.current_user} />
            }

          </ul>
        </CustomScrollbars>
      </div>
    </div>
  };
  searchTodo = (searchText) => {
    if (searchText === '') {
      this.setState({toDos: this.state.allToDos.filter((todo) => !todo.deleted)});
    } else {
      const searchToDos = this.state.allToDos.filter((todo) =>
      todo.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      this.setState({
        toDos: searchToDos
      });
    }
  };
  showToDos = ({currentTodo, toDos, conversation, user}) => {
    const task_id=window.location.href.split("/")
    return (currentTodo === null  || currentTodo===undefined) ?
      <ToDoList toDos={toDos} onSortEnd={this.onSortEnd}
                onMarkAsStart={this.onMarkAsStart.bind(this)}
                onTodoSelect={this.onTodoSelect.bind(this)}
                onTodoChecked={this.onTodoChecked.bind(this)} useDragHandle={true}/>
      :
      <ToDoDetail todo={currentTodo} current_user={this.state.current_user}
                  conversation={conversation}
                  onLabelUpdate={this.onLabelUpdate.bind(this)}
                  onToDoUpdate={this.onToDoUpdate.bind(this)}
                  onDeleteToDo={this.onDeleteToDo.bind(this)}/>
  };

  constructor(props) {
    super(props);
    console.log(props)
    const current_user=this.props.current_user
    const currentTodo=props.currentTodo
    this.state = {
      searchTodo: '',
      alertMessage: '',
      loader: false,
      showMessage: false,
      drawerState: false,
      optionName: 'None',
      anchorEl: null,
      allToDos: this.props.todos,
      currentTodo: currentTodo,
      user: {
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        avatar: 'http://via.placeholder.com/150x150',
      },
      selectedToDos: 0,
      labelMenuState: false,
      optionMenuState: false,
      toDos: this.props.todos,
      filter: -1,
      todoConversation,
      conversation: null,
      current_user:current_user,
      infilter:false,
    }
    this.get_tasks=this.get_tasks.bind(this)
  }

  get_tasks=()=>{
    axios.get('https://md-dashboard-backend.herokuapp.com//tasks',{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      this.setState({
        allToDos:response.data,
        toDos:response.data
      })
    })
  }



  componentDidMount() {
    this.manageHeight();
    this.get_tasks()
  }

  componentDidUpdate() {
    this.manageHeight();
  }

  getToDoConversation(id) {
    return todoConversation.find((conversation) => conversation.id === id);
  }

  onTodoChecked(data) {
    data.selected = !data.selected;
    let selectedToDos = 0;
    const toDos = this.state.toDos.map(todo => {
        if (todo.selected) {
          selectedToDos++;
        }
        if (todo.id === data.id) {
          if (todo.selected) {
            selectedToDos++;
          }
          return data;
        } else {
          return todo;
        }
      }
    );
    this.setState({
      selectedToDos: selectedToDos,
      toDos: toDos
    });
  }

  onAllTodoSelect() {
    const selectAll = this.state.selectedToDos < this.state.toDos.length;
    if (selectAll) {
      this.getAllTodo();
    } else {
      this.getUnselectedAllTodo();
    }
  }

  onTodoAdd(data) {
    this.setState(
      {
        toDos: this.state.allToDos.concat(data),
        allToDos: this.state.allToDos.concat(data)
      }
    );
  }

  manageHeight() {
  }

  onTodoSelect(todo) {
    let conversationList = this.getToDoConversation(todo.id);
    if (conversationList) {
      conversationList = conversationList.conversationData;
    } else {
      conversationList = [];
    }
    this.setState({
      currentTodo: todo,
      loader: true,
      conversation: conversationList
    });
    // window.localStorage.setItem("current_todo",JSON.stringify(todo))
    this.props.dispatch(TodoToShow(todo))
    setTimeout(() => {
      this.setState({loader: false});
    }, 1000);
  }

  removeLabel(todo, label) {
    todo.labels.splice(todo.labels.indexOf(label), 1);
    return todo.labels;
  }

  addLabel(todo, label) {
    todo.labels = todo.labels.concat(label);
    return todo.labels
  }

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState
    });
  }

  updateSearch(evt) {
    this.setState({
      searchTodo: evt.target.value,
    });
    this.searchTodo(evt.target.value)
  }

  optionMenu = () => {
    return (<Menu id="option-menu" onClick={this.onOptionMenuItemSelect.bind(this)}
                  onClose={this.handleRequestClose}
                  style={{maxHeight: ITEM_HEIGHT * 5.5}}>
      {options.map(option =>
        <Menu.Item key={option.title}
        >
          {option.title}
        </Menu.Item>,
      )}
    </Menu>)

  };

  labelMenu = () => {
    return (
      <Menu id="label-menu" onClick={this.onLabelMenuItemSelect.bind(this)}
            onClose={this.handleRequestClose}
            style={{maxHeight: ITEM_HEIGHT * 4.5}}>
        {labels.map(label =>
          <Menu.Item key={label}>
            {label.title}
          </Menu.Item>,
        )}
      </Menu>)
  };

  render() {
    const {selectedToDos, loader, drawerState, currentTodo, toDos, conversation, user, alertMessage, showMessage} = this.state;

    return (
      <div className="gx-main-content">
        <div className="gx-app-module">
          <div className="gx-d-block gx-d-lg-none">
            <Drawer
              placement="left"
              closable={false}
              visible={drawerState}
              onClose={this.onToggleDrawer.bind(this)}>
              {this.ToDoSideBar()}
            </Drawer>
          </div>
          <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
            {this.ToDoSideBar()}
          </div>

          <div className="gx-module-box">
            <div className="gx-module-box-header">

              <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
                  <i className="icon icon-menu gx-icon-btn" aria-label="Menu"
                     onClick={this.onToggleDrawer.bind(this)}/>
              </span>
              <AppModuleHeader placeholder="Search Tasks" user={this.state.current_user}
                               onChange={this.updateSearch.bind(this)}
                               value={this.state.searchTodo}/>
            </div>
            <div className="gx-module-box-content">

              {this.state.currentTodo === null ?
                <div className="gx-module-box-topbar gx-module-box-topbar-todo">
                  {/*<Checkbox className="gx-icon-btn" color="primary"*/}
                            {/*indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}*/}
                            {/*checked={selectedToDos > 0}*/}
                            {/*onChange={this.onAllTodoSelect.bind(this)}*/}
                            {/*value="SelectMail"/>*/}
                  <Dropdown overlay={this.optionMenu()} placement="bottomRight" trigger={['click']}>
                    <div>
                      <span className="gx-px-2"> {this.state.optionName}</span>
                      <i className="icon icon-charvlet-down"/>
                    </div>
                  </Dropdown>

                  <div class="width-90">{(this.state.infilter) &&
                    < TaskForm meeting_id={this.state.meeting} current_user={this.state.current_user}/>
                  }</div>

                  {/*{*/}
                    {/*( selectedToDos > 0) &&*/}

                  {/*<Dropdown overlay={this.labelMenu()} placement="bottomRight" trigger={['click']}>*/}
                    {/*<i className="gx-icon-btn icon icon-tag"/>*/}
                  {/*</Dropdown>*/}
                  {/*}*/}
                </div>

                :
                <div className="gx-module-box-topbar">
                  <i className="icon icon-arrow-left gx-icon-btn" onClick={() => {
                    this.setState({currentTodo: null})
                    this.props.dispatch(TodoToShow(null))
                  }}/>
                </div>
              }
              {loader ?
                <div className="gx-loader-view">
                  <Spin/>
                </div> :
                this.showToDos(this.state)
              }
            </div>
          </div>
        </div>
        {showMessage && message.info(<span id="message-id">{alertMessage}</span>, 3, this.handleRequestClose)}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ToDo)
