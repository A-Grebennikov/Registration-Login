import React from 'react';
import axios from 'axios';
import '../../index.css';
import { createID } from '../../helpers';

const userNameListURL = 'http://localhost:5000/api/users/username';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      usernames: [],
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    axios.get(userNameListURL, { 
      headers: { 'authorization': token } 
    })
      .then(response => {
        this.setState({
          usernames: response.data
        })
      })
      .catch((error) => {
        this.props.history.push('/login');
        console.log('errr', error.response);
      });
  }

  handleLogoutClick() {
    this.props.handleLogin(false);
    this.props.history.push('/login')
    localStorage.removeItem('token');
  }

  showUserProfile(id) {
    this.props.history.push(`/profile/${id}`);
  }

  renderUsernames() {
    return this.state.usernames.map(item => (
      <div key={createID()} className="profile-users" onClick={() => { this.showUserProfile(item._id) }}>
        <div>
          <img className="logo-profile" src="http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png" alt='some value' />
        </div>
        <div className="users-data">
          <span className="users-data__name">{item.name}</span>
          <div className="users-data__email">
            <img className="logo-email" src="https://cdn.icon-icons.com/icons2/788/PNG/512/email_icon-icons.com_64925.png" alt='some value' />
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
        <button onClick={this.handleLogoutClick} className="logout_button">
          Logout
        </button>
      </div>
    )
  }
}