import React from 'react';
import axios from 'axios';

const loginURL = 'http://localhost:5000/api/users/login';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: null,
    };
  }

  updateForm = (event) => {
    const newState = {}
    newState[event.target.id] = event.target.value;
    this.setState({
      ...newState
    })
  }

  submitUser = (event) => {
    event.preventDefault();
    axios.post(loginURL, {
      ...this.state,
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      this.props.handleDisplayedComponent("profile");
    }).catch(err => {
      const errors = err.response.data;
      this.setState({email: '', password: '', errors: errors});
    })
  }

  messsageError = () => {
      if (this.state.errors) {
        return "Incorrect email or password"
      }
  }

  handleLoginClick = () => {
    this.props.handleDisplayedComponent("registration");
  }

  render() {
    return (
      <form onSubmit={this.submitUser} className="loginForm-container">
        <h1>Login</h1>
        <label htmlFor="email" className="commonForm__label">
        <input id="email" value={this.state.email} onChange={this.updateForm} className={`commonForm__input ${this.state.errors ? 'error': ''}`} placeholder='e-mail' />
        </label>
        <label htmlFor="password" className="commonForm__label">
        <input id="password" value={this.state.password} onChange={this.updateForm} className={`commonForm__input ${this.state.errors ? 'error': ''}`} placeholder='password' />
        <span className="error-message">
          {this.messsageError()}
        </span>
        </label>
        <input type="submit" value="Login" className="loginForm__button_item"/>
        <label>
        <span>Not registered?  </span><LoginButton onClick={this.handleLoginClick} className="loginForm__button_item"/>
        </label>
      </form>
    );
  }
}

function LoginButton(props) {
  return (
    <a href='#' onClick={props.onClick}>
      Create an account
    </a>
  );
}