import React from 'react';
import axios from 'axios';
import '../../index.css';

const registrationURL = 'http://localhost:5000/api/users/registration';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Test',
      email: 'test@test.com',
      password: '11223344',
      password2: '11223344',
      displayComponent: '',
      errors: null,
    };
  }

  formName = (event) => {
    this.setState({
      name: event.target.value
    })
  };

  formEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  };

  formPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  };

  formPassword2 = (event) => {
    this.setState({
      password2: event.target.value
    })
  };

  submitUser = (event) => {
    console.log(this.state);
    event.preventDefault();
    axios.post(registrationURL, {
      ...this.state,
    }).then(res => {
      console.log(res)
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
      <li>{item.err}</li>
      ))
    }
  }

  render() {
    return (
      <form onSubmit={this.submitUser}>
        {this.messsageError()}
        <label>
          name
          <p><input value={this.state.name} onChange={this.formName} /></p>
          email
          <p><input value={this.state.email} onChange={this.formEmail} /></p>
          password
          <p><input value={this.state.password} onChange={this.formPassword} /></p>
          confirm password
          <p><input value={this.state.password2} onChange={this.formPassword2} /></p>
        </label>
        <input type="submit" value="registration" />
      </form>
    );
  }
}