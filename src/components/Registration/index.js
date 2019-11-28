import React from 'react';
import axios from 'axios';
import '../../index.css';
import { createID } from '../../helpers';
import { Link } from 'react-router-dom'

const registrationURL = 'http://localhost:5000/api/users/registration';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  submitUser = (event) => {
    event.preventDefault();
    axios.post(registrationURL, {
      ...this.state,
    }).then(res => {
      this.props.history.push('/login')
    }).catch(err => {
      const errors = err.response.data;
      console.log(errors)
      this.setState({ errors })
    })
  }

  messsageError() {
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
          <input id="name" value={this.state.name} onChange={this.updateForm} className="commonForm__input" placeholder='name' autocomplete="off" />
          <span className="error-message">
            {this.state.errors.name}
          </span>
        </label>
        <label htmlFor="email" className="commonForm__label">
          <input id="email" value={this.state.email} onChange={this.updateForm} className="commonForm__input" placeholder='e-mail' autocomplete="off" />
          <span className="error-message">
            {this.state.errors.email}
          </span>
        </label>
        <label htmlFor="password" className="commonForm__label">
          <input id="password" type="password" value={this.state.password} onChange={this.updateForm} className="commonForm__input" placeholder='password' />
          <span className="error-message">
            {this.state.errors.password}
          </span>
        </label>
        <label htmlFor="password2" className="commonForm__label">
          <input id="password2" type="password" value={this.state.password2} onChange={this.updateForm} className="commonForm__input" placeholder='confirm password' />
          <span className="error-message">
            {this.state.errors.password2}
          </span>
        </label>
        <input type="submit" value="SIGN ME UP" className="loginForm__button_item" />
        <label>
          <span> Already registered?  </span>
          <Link to='/login'>Login</Link>
        </label>
      </form>
    );
  }
}

