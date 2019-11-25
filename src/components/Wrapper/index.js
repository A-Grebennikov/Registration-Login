import React from 'react';
import Login from '../Login';
import Registration from '../Registration';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegistrationClick = this.handleRegistrationClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleRegistrationClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <RegistrationButton onClick={this.handleRegistrationClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Authentification isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

function Authentification(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <Registration />;
  }
  return <Login />;
}

function LoginButton(props) {
  return (
    <p><button onClick={props.onClick}>
      Not registered?
    </button></p>
  );
}

function RegistrationButton(props) {
  return (
    <p><button onClick={props.onClick}>
      Already registered?
    </button></p>
  );
}