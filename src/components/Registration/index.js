import React from 'react';
import axios from 'axios';
import '../../index.css';
import { createID } from '../helpers';

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
      this.setState({errors})
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
      <form onSubmit={this.submitUser} className="loginForm-container">
        {this.messsageError()}
        <label htmlFor="name" className="loginForm__label"> <span>Name</span>
        <input id="name" value={this.state.name} onChange={this.updateForm} className="loginForm__input" placeholder='enter your name' />
        </label>
        <label htmlFor="email" className="loginForm__label"> <span>Email</span>
        <input id="email" value={this.state.email} onChange={this.updateForm} className="loginForm__input" placeholder='enter your email'/>
        </label>
        <label htmlFor="password" className="loginForm__label"> <span>Password</span>
        <input id="password" value={this.state.password} onChange={this.updateForm} className="loginForm__input" placeholder='enter password'/>
        </label>
        <label htmlFor="password2" className="loginForm__label"> <span>Password2</span>
        <input id="password2" value={this.state.password2} onChange={this.updateForm} className="loginForm__input" placeholder='repeat password'/>
        </label>
        <label className="loginForm__button">
        <input type="submit" value="Registration" className="loginForm__button_item"/>
        <RegistrationButton onClick={this.handleLoginClick} className="loginForm__button_item"/>
        </label>
      </form>
    );
  }
}

function RegistrationButton(props) {
  return (
    <button onClick={props.onClick}>
      Already registered?
    </button>
  );
}