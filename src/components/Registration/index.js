import React from 'react';
import axios from 'axios';
import '../../index.css';
import { createID } from '../helpers';

const registrationURL = 'http://localhost:5000/api/users/registration';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Test',
      email: 'test@test.com',
      password: '11223344',
      password2: '11223344',
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
      <form onSubmit={this.submitUser}>
        {this.messsageError()}
        <label htmlFor="name"> Name
        <br/>
        <input id="name" value={this.state.name} onChange={this.updateForm} />
        </label>
        <br/>
        <label htmlFor="email"> Email
        <br/>
        <input id="email" value={this.state.email} onChange={this.updateForm} />
        </label>
        <br/>
        <label htmlFor="password"> Password
        <br/>
        <input id="password" value={this.state.password} onChange={this.updateForm} />
        </label>
        <br />
        <label htmlFor="password2"> Password2
        <br/>
        <input id="password2" value={this.state.password2} onChange={this.updateForm} />
        </label>
        <br/>
        <input type="submit" value="Registration" />
        <RegistrationButton onClick={this.handleLoginClick} />
      </form>
    );
  }
}

function RegistrationButton(props) {
  return (
    <p><button onClick={props.onClick}>
      Already registered?
    </button></p>
  );
}