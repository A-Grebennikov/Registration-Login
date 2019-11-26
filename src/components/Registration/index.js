import React from 'react';
import axios from 'axios';
import '../../index.css';
import { createID } from '../../helpers';

const registrationURL = 'http://localhost:5000/api/users/registration';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: 'Test',
      // email: 'test@test.com',
      // password: '11223344',
      // password2: '11223344',
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {
        email: null,
        name: null,
        password: null,
        password2: null,
      },
    };
  }

  updateForm = (event) => {
    const newState = {}
    newState[event.target.id] = event.target.value;
    this.setState({
      ...newState
    })
  }

  handleLoginClick = () => {
    this.props.handleDisplayedComponent("login");
  }

  submitUser = (event) => {
    event.preventDefault();
    axios.post(registrationURL, {
      ...this.state,
    }).then(res => {
      this.handleLoginClick();
    }).catch(err => {
      const errors = err.response.data;
      console.log(errors)
      this.setState({ errors })
    })
  }

  messsageError = () => {
    const { errors } = this.state;
    if (errors) {
      const arrOfErr = [];
      for (let key in errors) {
        arrOfErr.push({ err: errors[key] })
      }
      return arrOfErr.map(item => (
        <li key={createID("name")}>{item.err}</li>
      ))
    }
  }

  render() {
    return (
      <form onSubmit={this.submitUser} className="registrationForm-container">
        <h1>Create an account</h1>
        <label htmlFor="name" className="commonForm__label">
          <input id="name" value={this.state.name} onChange={this.updateForm} className={`commonForm__input ${!this.state.errors.name === '' ? 'error' : ''}`} placeholder='name' autocomplete="off" />
          <span className="error-message">
            {this.state.errors.name}
          </span>
        </label>

        <label htmlFor="email" className="commonForm__label">
          <input id="email" value={this.state.email} onChange={this.updateForm} className={`commonForm__input ${!this.state.errors.email === '' ? 'error' : ''}`} placeholder='e-mail' autocomplete="off" />
          <span className="error-message">
            {this.state.errors.email}
          </span>
        </label>
        <label htmlFor="password" className="commonForm__label">
          <input id="password" type="password" value={this.state.password} onChange={this.updateForm} className={`commonForm__input ${!this.state.errors.password === '' ? 'error' : ''}`} placeholder='password' />
          <span className="error-message">
            {this.state.errors.password}
          </span>
        </label>
        <label htmlFor="password2" className="commonForm__label">
          <input id="password2" type="password" value={this.state.password2} onChange={this.updateForm} className={`commonForm__input ${!this.state.errors.password2 === '' ? 'error' : ''}`} placeholder='confirm password' />
          <span className="error-message">
            {this.state.errors.password2}
          </span>
        </label>
        <input type="submit" value="SIGN ME UP" className="loginForm__button_item" />
        <label>
          <span> Already registered?  </span> <RegistrationButton onClick={this.handleLoginClick} className="loginForm__button_item" />
        </label>
      </form>
    );
  }
}

function RegistrationButton(props) {
  return (
    <a href='#' onClick={props.onClick}>
      Login
    </a>
  );
}