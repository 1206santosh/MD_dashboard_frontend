import React from "react";

export const taskList = [{
  id: 1,
  title: 'Make the home page dynamic',
  completed: false,
  user: {
    name: 'Joshua Mulski',
    avatar: 'http://via.placeholder.com/150x150',
  },
  dueDate: 'Today',
  tags: [1, 2]
}, {
  id: 2,
  title: 'Design wireframes based on the requirements',
  completed: false,
  user: {
    name: 'Alex Mulski',
    avatar: 'http://via.placeholder.com/150x150',
  },
  dueDate: 'Tomorrow',
  tags: [2, 4]
}, {
  id: 3,
  title: 'Need to define microinteraction on click of signin button',
  completed: false,
  user: {
    name: 'Domnic Harris',
    avatar: 'http://via.placeholder.com/150x150',
  },
  dueDate: 'Today',
  tags: [1, 2, 3]
}, {
  id: 4,
  title: 'New page need to be designed for property listing',
  completed: false,
  user: {
    name: 'Jimmy Harris',
    avatar: 'http://via.placeholder.com/150x150',
  },
  dueDate: 'Today',
  tags: [2, 3, 4]
}, {
  id: 5,
  title: 'Design wireframes based on the requirements',
  completed: false,
  user: {
    name: 'Alex Harris',
    avatar: 'http://via.placeholder.com/150x150',
  },
  dueDate: 'Today',
  tags: [2, 4]
}];

export const taskTags = [{
  id: 1,
  name: 'HTML',
  color: 'red',
}, {
  id: 2,
  name: 'React',
  color: 'green',
}, {
  id: 3,
  name: 'JavaScript',
  color: 'blue',
}, {
  id: 4,
  name: 'CSS',
  color: 'orange',
}];

export const recentActivity = [
  {
    id: 1,
    day: 'yesterday',
    tasks: [{
      id: 1,
      title: 'Stella Johnson invited Joshua K. to the project Jump Jump Kim',
      avatar: 'http://via.placeholder.com/150x150',
      time: '13Hr ago',
    }, {
      id: 2,
      title: 'Chris H. posted a comment on task Create CSS animations for the...',
      avatar: 'http://via.placeholder.com/150x150',
      time: '21Hr ago',
    }]
  }, {
    id: 2,
    day: 'april 23, 2018',
    tasks: [{
      id: 3,
      title: 'Stella Johnson invited Joshua K. to the project Jump Jump Kim',
      avatar: 'http://via.placeholder.com/150x150',
      time: '03:18 AM',
    }, {
      id: 4,
      title: 'Chris H. posted a comment on task Create CSS animations',
      avatar: 'http://via.placeholder.com/150x150',
      time: '01:08 AM',
    }, {
      id: 5,
      title: 'Chris H. posted a comment on task Create CSS animations for home..',
      avatar: 'http://via.placeholder.com/150x150',
      time: '23:00 PM',
    }]
  }];

export const ticketList = [
  {
    id: 1,
    avatar: 'http://via.placeholder.com/150x150',
    title: 'Need a quick support on setting',
    description: [<a href="javascript:void(0);">Joy Parish</a>, "  created ticket 15 mins ago"],
    status: 2
  }, {
    id: 2,
    avatar: 'http://via.placeholder.com/150x150',
    title: 'Pre-sale query about the product',
    description: [<a href="javascript:void(0);">You</a>, " replied 2 days ago"],
    status: 1
  }, {
    id: 3,
    avatar: 'http://via.placeholder.com/150x150',
    title: 'Regarding customization service',
    description: [<a href="javascript:void(0);">Joy Parish</a>, " replied 2 days ago"],
    status: 4
  }
];

export const taskStatus = [
  {
    id: 1,
    title: 'Critical',
    color: 'red'
  }, {
    id: 2,
    title: 'High',
    color: 'orange'
  }, {
    id: 3,
    title: 'Normal',
    color: 'green'
  }, {
    id: 4,
    title: 'Low',
    color: 'light-grey'
  }
];
export const siteVisit = [
  {name: '1', uv: 0, pv: 0},
  {name: '2', uv: 0, pv: 1},
  {name: '3', uv: 5, pv: 2},
  {name: '4', uv: 10, pv: 0},
  {name: '5', uv: 4, pv: 1},
  {name: '6', uv: 16, pv: 3},
  {name: '7', uv: 5, pv: 1},
  {name: '8', uv: 11, pv: 5},
  {name: '9', uv: 6, pv: 2},
  {name: '10', uv: 11, pv: 3},
  {name: '11', uv: 30, pv: 2},
  {name: '12', uv: 10, pv: 1},
  {name: '13', uv: 13, pv: 0},
  {name: '14', uv: 4, pv: 2},
  {name: '15', uv: 3, pv: 8},
  {name: '16', uv: 1, pv: 0},
  {name: '17', uv: 0, pv: 0},
];

export const totalSaleData = [
  {name: 'JAN', pv: 600},
  {name: 'FEB', pv: 3398},
  {name: 'MAR', pv: 1200},
  {name: 'APR', pv: 4908},
  {name: 'MAY', pv: 2908},
];

export const totalRevenueData = [
  {name: 'JAN', uv: 60},
  {name: 'FEB', uv: 90},
  {name: 'MAR', uv: 50},
  {name: 'APR', uv: 75},
  {name: 'MAY', uv: 60},
  {name: 'JUN', uv: 85},
  {name: 'JUL', uv: 20},
  {name: 'AUG', uv: 75},
  {name: 'SEP', uv: 60},
  {name: 'OCT', uv: 40},
  {name: 'NOV', uv: 75},
  {name: 'DEC', uv: 25},
];
