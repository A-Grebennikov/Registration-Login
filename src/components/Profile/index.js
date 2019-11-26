import React from 'react';
import axios from 'axios';
import '../../index.css';
import { createID } from '../../helpers';
const jwtDecode = require('jwt-decode');

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      username: '',
      usernames: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    this.setState({ username: decoded.name })


    axios.get('http://localhost:5000/api/users/username', { 'headers': { 'authorization': token } })
      .then(response => {
        this.setState({ usernames: response.data })
      })
      .catch((error) => {
        console.log('errr', error.response);
      });
  }

  handleLogoutClick() {
    console.log(this.props);
    this.props.handleDisplayedComponent("login");
    localStorage.removeItem('token');
  }

  renderUsernames() {
    return this.state.usernames.map(item => (
      <div className="profile-users">
        <div>
          <img className="logo-profile" src="http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png" />
        </div>
        <div className="users-data">
          <span className="users-data__name" key={createID("name")}>{item.name}</span>
          <div className="users-data__email">
            <img className="logo-email" src="https://cdn.icon-icons.com/icons2/788/PNG/512/email_icon-icons.com_64925.png" />
            <span> {item.email}</span>
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className="userList-container">
        <h1 className="header-list"> List of registered Users</h1>
        <div className="userList__list">
          {this.renderUsernames()}
        </div>
        <LogoutButton onClick={this.handleLogoutClick} />
      </div>
    )
  }
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick} className="logout_button">
      Logout
    </button>
  );
}