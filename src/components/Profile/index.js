import React from 'react';
import axios from 'axios';
import '../../index.css';
import Wrapper from '../Wrapper';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLogout: false,
      usernames: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/users/username', { 'headers': { 'authorization': token } })
      .then(response => {
        this.setState({ usernames: response.data })
        console.log('res', response.data);
      })
      .catch((error) => {
        console.log('errr', error.response);
      });
  }

  handleLogoutClick() {
    this.setState({ isLogout: true });
  }

  renderUsernames() {
    return this.state.usernames.map(item => (
      <li key={item.toString()}>{item.name}</li>
    ))
  }

  render() {
    const isLogout = this.state.isLogout;
    let button;
    if (!isLogout) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    }
    return (
      <div>
        List of registered users
        <ul>
        {this.renderUsernames()}
        </ul>
        <p><ExitFromProfile isLogout={isLogout} /></p>
        {button}
      </div>
    )
  }
}

function ExitFromProfile(props) {
  const isLogout = props.isLogout;
  if (isLogout) {
    localStorage.removeItem('token');
    return <Wrapper />;
  }
  return <p></p>
}

function LogoutButton(props) {
  return (
    <p><button onClick={props.onClick}>
      logout
    </button></p>
  );
}