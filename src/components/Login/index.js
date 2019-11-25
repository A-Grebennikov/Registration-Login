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
        return <p>Incorrect email or password</p>
      }
  }

  handleLoginClick = () => {
    this.props.handleDisplayedComponent("registration");
  }

  render() {
    return (
      <form onSubmit={this.submitUser} className="loginForm-container">
        <label className="loginForm__areaError">{this.messsageError()}</label>
        <label htmlFor="email" className="loginForm__label"> <span>Email</span>
        <input id="email" value={this.state.email} onChange={this.updateForm} className="loginForm__input" placeholder='enter your email' />
        </label>
        <label htmlFor="password" className="loginForm__label"><span>Password</span>
        <input id="password" value={this.state.password} onChange={this.updateForm} className="loginForm__input" placeholder='enter your password' />
        </label>
        <label className="loginForm__button">
        <input type="submit" value="Login" className="loginForm__button_item"/>
        <LoginButton onClick={this.handleLoginClick} className="loginForm__button_item"/>
        </label>
      </form>
    );
  }
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Not registered?
    </button>
  );
}