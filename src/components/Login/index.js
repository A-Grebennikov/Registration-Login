import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: 'test@test.com',
      password: '11223344'
    };

    this.formEmail = this.formEmail.bind(this);
    this.formPasssword = this.formPasssword.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  formEmail(event) {
    this.setState({ email: event.target.value });
  }

  formPasssword(event) {
    this.setState({ password: event.target.value });
  }

  submitUser = (event) => {
    console.log(this.state);
    event.preventDefault();
    axios.post('http://localhost:5000/api/users/login', {
      ...this.state,
    }).then(res => {
      const token = res.data.token
      console.log(token)


    }).catch(err => {
      const errors = err.response.data;
      console.log(errors)
    })
  }

  render() {
    return (
      <form onSubmit={this.submitUser}>
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