import React from "react";
import {Avatar, Badge, Col, DatePicker, Input, Menu, Row} from "antd";
import Moment from "moment";
import CustomScrollbars from "util/CustomScrollbars";

import labels from "routes/Todo/data/labels";
import users from "routes/Todo/data/users";
import ConversationCell from "./ConversationCell";
import axios from 'axios'

const {TextArea} = Input;

class ToDoDetail extends React.Component {
  constructor(props) {
    super(props);
    const {description, notes} = props.todo;
    const current_user=JSON.parse(sessionStorage.current_user)
    this.state = {
      todo: props.todo,
      description,
      notes,
      anchorEl: undefined,
      userMenu: false,
      labelMenu: false,
      editTitle: false,
      editNote: false,
      message: '',
      comments_by_user:[],
      current_user:current_user
    };

    axios.get("https://md-dashboard-backend.herokuapp.com/tasks/"+props.todo.id,{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
      console.log(response)
     this.setState({
       comments_by_user:response.data.comments_by_user
     })
    })



    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleLabelClick = event => {
    this.setState({labelMenu: true, anchorEl: event.currentTarget});
  };
  handleUserClick = event => {
    this.setState({userMenu: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({userMenu: false, labelMenu: false});
  };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitComment();
    }
  };

  handleEditTitle = () => {
    if (this.state.editTitle) {
      const todo = this.state.todo;
      todo.title = this.state.title;
      this.props.onToDoUpdate(todo)
    }
    this.setState({
      editTitle: !this.state.editTitle
    });
  };

  handleEditNote = () => {
    if (this.state.note) {
      const todo = this.state.todo;
      todo.note = this.state.note;
      this.props.onToDoUpdate(todo)
    }
    this.setState({
      editNote: !this.state.editNote
    });
  };

  handleDueDateChange = (date) => {
    this.setState({
      todo: {...this.state.todo, dueDate: date}
    });
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  submitComment() {
    if (this.state.message !== '') {
      const updatedConversation = this.state.comments_by_user.concat({
        'commentor_name': this.state.current_user.name,
        'thumb': this.props.user.avatar,
        'content': this.state.message,
        'created_at': Moment(new Date).format('ddd DD, YYYY, hh:mm:ss A'),
      });
      this.setState({
        comments_by_user: updatedConversation,
        message: '',
      });
      const data={}
      data['comment']={}
      data['comment']['content']=this.state.message,
      data['comment']['item_id']=this.state.todo.id,
      data['comment']['item_type']="Task",
      //
      axios.post("https://md-dashboard-backend.herokuapp.com//comments",data,{headers:{"Authorization":"Token token="+this.state.current_user.auth_token}}).then((response)=>{
        console.log(response)
      })
    }
  }

  updateMessageValue(evt) {
    this.setState({
      message: evt.target.value
    });
  }

  optionMenu = () => {
    return (<Menu
      id="label-menu" onClick={this.handleRequestClose}
      onClose={this.handleRequestClose}>
      {users.map((user, index) =>
        <Menu.Item key={index} value={user.id}>
          <div className="gx-d-flex gx-user-name gx-align-items-center">
            <Avatar src={user.thumb} alt={user.name}/><h4>{user.name}</h4>
          </div>
        </Menu.Item>
      )}

    </Menu>)
  };

  labelMenu = () => {
    return (<Menu id="label-menu" onClick={this.handleRequestClose()}>
      {labels.map(label =>
        <Menu.Item key={label.id}>
          {label.title}
        </Menu.Item>,
      )}
    </Menu>)

  };

  render() {
    const {onToDoUpdate, onLabelUpdate, onDeleteToDo} = this.props;
    const {todo, editNote, editTitle, description, notes, message} = this.state;
    console.log(this.state.comments_by_user.length)
    const comments=this.state.comments_by_user.length>0 ? this.state.comments_by_user.map((comment, index) => <ConversationCell key={index} comment={comment}/>):""
    // const comments=<div></div>
    let user = null;
    if (todo.user > 0)
      user = users.find((user) => user.id === todo.user);

    return (
      <div className="gx-module-detail gx-module-list">
        <CustomScrollbars className="gx-todo-detail-content-scroll">
          <div className="gx-module-detail-item gx-module-detail-header">
            <Row>
              <Col xs={24} sm={12} md={17} lg={12} xl={17}>
                <div className="gx-flex-row">
                  <div className="gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1"
                       onClick={this.handleUserClick}>

                    {/*{todo.assignee === null ? */}
                      <div className="gx-flex-row gx-align-items-center gx-pointer">
                        {/*<h4 className="gx-mb-0 gx-pointer">Assign User </h4> */}
                        <Avatar className="gx-mr-2"  alt={todo.assignee}/>
                        <h4 className="gx-mb-0">{todo.assignee}</h4>
                      </div>
                    {/*}*/}
                  </div>
                  {/*<DatePicker className="gx-module-date gx-my-1"*/}
                              {/*defaultValue={todo.due_date !== null && Moment(todo.due_date, 'dddd, MMMM DD, YYYY h:mm a')}*/}
                              {/*invalidLabel="Due Date"*/}
                              {/*format="MMMM DD, YYYY"*/}
                              {/*onChange={this.handleDueDateChange.bind(this)}*/}
                              {/*animateYearScrolling={false}/>*/}


                </div>
              </Col>

              {/*<Col xs={24} sm={12} md={7} lg={12} xl={7}>*/}
                {/*<div className="gx-flex-row gx-justify-content-between">*/}
                  {/*<i className="gx-icon-btn icon icon-trash" onClick={() => {*/}
                    {/*onDeleteToDo(todo);*/}
                  {/*}}/>*/}

                  {/*<span className="gx-d-block" onClick={() => {*/}
                    {/*todo.starred = !todo.starred;*/}
                    {/*onToDoUpdate(todo);*/}
                  {/*}}>*/}
                        {/*{todo.starred ?*/}
                          {/*<i className="gx-icon-btn icon icon-star"/> :*/}
                          {/*<i className="gx-icon-btn icon icon-star-o"/>*/}
                        {/*}*/}

                  {/*</span>*/}

                  {/*<span className="gx-d-block" onClick={() => {*/}
                    {/*todo.important = !todo.important;*/}
                    {/*onToDoUpdate(todo);*/}
                  {/*}}>*/}
                        {/*{todo.important ?*/}
                          {/*<i className="gx-icon-btn icon icon-important"/> :*/}
                          {/*<i className="gx-icon-btn icon icon-important-o"/>*/}
                        {/*}*/}

                  {/*</span>*/}
                  {/*<span className="gx-d-block" onClick={this.handleLabelClick}>*/}
                          {/*<i className="gx-icon-btn icon icon-tag"/>*/}
                  {/*</span>*/}


                {/*</div>*/}
              {/*</Col>*/}
            </Row>
          </div>

          <div className="gx-module-detail-item">

            <div className="gx-mb-md-4 gx-mb-2">
              {/*{labels.map((label, index) => {*/}
                {/*return (todo.labels).includes(label.id) &&*/}
                  {/*<Badge key={index} count={label.title} style={{backgroundColor: label.color}}/>*/}
              {/*})}*/}
            </div>

            <div className="gx-form-group gx-flex-row gx-align-items-center gx-mb-0 gx-flex-nowrap">
              <div onClick={(event) => {
                todo.completed = !todo.completed;
                onToDoUpdate(todo);
              }}>
                {(todo.status=="completed")?
                  <span
                    className="gx-border-2 gx-size-30 gx-rounded-circle gx-text-green gx-border-green gx-d-block gx-text-center gx-pointer">
                                        <i className="icon icon-check"/></span>
                  : <span
                    className="gx-border-2 gx-size-30 gx-rounded-circle gx-text-muted gx-border-grey gx-d-block gx-text-center gx-pointer">
                                        <i className="icon icon-check"/>
                                    </span>
                }
              </div>
              {/*{editTitle ?*/}
                {/*<div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">*/}
                  {/*<div className="gx-col">*/}
                    {/*<Input*/}
                      {/*fullWidth*/}
                      {/*className="gx-task-title"*/}
                      {/*id="required"*/}
                      {/*placeholder="Title"*/}
                      {/*onChange={(event) => this.setState({title: event.target.value})}*/}
                      {/*defaultValue={description}/>*/}
                  {/*</div>*/}

                  {/*<span className="gx-d-block gx-size-40 gx-text-center gx-pointer"*/}
                        {/*onClick={this.handleEditTitle}>*/}
                    {/*<i className="gx-icon-btn icon icon-edit"/>*/}
                  {/*</span>*/}
                {/*</div> :*/}
                <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                  <div className="gx-task-title gx-col">
                    {description}
                  </div>
                  {/*<span className="gx-d-block gx-size-40 gx-text-center gx-pointer"*/}
                        {/*onClick={this.handleEditTitle}>*/}
                    {/*<i className="gx-icon-btn icon icon-edit"/>*/}
                  {/*</span>*/}

                </div>
              {/*}*/}
            </div>

          </div>

          <div className="gx-module-detail-item gx-mb-md-4 gx-mb-2">
            {editNote ?
              <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                <div className="gx-col">
                  <Input
                    fullWidth
                    id="required"
                    placeholder="Note"
                    onChange={(event) => this.setState({notes: event.target.value})}
                    defaultValue={notes}/>
                </div>

                <span className="gx-d-block gx-size-40 gx-text-center gx-pointer" onClick={this.handleEditNote}>
                    <i className="gx-icon-btn icon icon-edit"/>
                </span>
              </div> :
              <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1">
                <div className="gx-task-des gx-col">
                  {notes}
                </div>
                <span className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                      onClick={this.handleEditNote}>
                  <i className="gx-icon-btn icon icon-edit"/>
                </span>

              </div>}
          </div>
          <div className="gx-module-detail-item">
            <h3>Comments</h3>
          </div>
          {comments}


        </CustomScrollbars>


        <div className="gx-chat-main-footer gx-todo-main-footer">
          <div className="gx-flex-row gx-align-items-center">
            <div className="gx-col">
              <div className="gx-form-group">
                <TextArea className="gx-border-0 ant-input gx-chat-textarea"
                          id="required"
                          onKeyUp={this._handleKeyPress.bind(this)}
                          onChange={this.updateMessageValue.bind(this)}
                          value={message}
                          rows={2}
                          placeholder="Type and hit enter to send message"/>
              </div>
            </div>

            <div className="gx-chat-sent"
                 onClick={this.submitComment.bind(this)}
                 aria-label="Send message">
              <i className="gx-icon-btn icon icon-sent"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoDetail;
