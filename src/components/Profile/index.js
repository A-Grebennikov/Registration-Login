import React from 'react';
import axios from 'axios';
import '../../index.css';
import { createID } from '../helpers';
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
    const decoded = jwtDecode(token);   //get name from decrypted token 
    console.log('name from token:', decoded.name);
    this.setState({ username: decoded.name })


    axios.get('http://localhost:5000/api/users/username', { 'headers': { 'authorization': token } })
      .then(response => {
        this.setState({ usernames: response.data }) // set username
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
      <li key={createID("name")}>{item.name}</li>
    ))
  }

  render() {
    return (
      <div>
        <h2>Hello, {this.state.username}</h2>
        <h3> List of registered Users</h3>
        <ul>
          {this.renderUsernames()}
        </ul>
        <LogoutButton onClick={this.handleLogoutClick} />
      </div>
    )
  }
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}