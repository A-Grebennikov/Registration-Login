import React from 'react';
import axios from 'axios';
import '../../index.css';
import Profile from '../Profile';

const loginURL = 'http://localhost:5000/api/users/login';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'test@test.com',
      password: '11223344',
      errors: null,
      token: null,
      isLoggedIn: false,
    };
  }

  formEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  formPasssword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  submitUser = (event) => {
    event.preventDefault();
    axios.post(loginURL, {
      ...this.state,
    }).then(res => {
      const token = res.data.token
      console.log(token);
      localStorage.setItem('token', token);

    }).catch(err => {
      const errors = err.response.data;
      console.log(errors);
      this.setState({email: '', password: '', errors: errors});
    })
  }

  messsageError = () => {
      if (this.state.errors) {
        return <p>Incorrect email or password</p>
      } else {
        // return <Profile />
      }
  }

  render() {
    return (
      <form onSubmit={this.submitUser}>
        {this.messsageError()}
        <label>
          email
  <p><input value={this.state.email} onChange={this.formEmail} /></p>
          password
          <p><input value={this.state.password} onChange={this.formPasssword} /></p>
        </label>
        <input type="submit" value="login" />
      </form>
    );
  }
}