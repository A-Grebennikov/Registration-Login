import React from "react";

export default class Header extends React.Component {

  // login = () => {
  //   this.props.history.push('/login');
  // }

  // registration = () => {
  //   this.props.history.push('/registration')
  // }

  logout = () => {
    this.props.handleLogin(false);
    this.props.history.push('/login');
    localStorage.removeItem('token');
  }

  render() {
    const { isLogined } = this.props;
    if (isLogined) {
      return <Loginned history={this.props.history} logout={this.logout} />
    } else {
      return <NotLoginned login={this.login} registration={this.registration} history={this.props.history} />
    }
  }
}

const Loginned = ({ logout, history }) => {
  return <div className="header-loginned">
    <input type="button" className="user-list_button" onClick={() => history.push('/users')} value="User list" />
    {/* <div>
      <input type="button" className="user-list_button right" onClick={logout} value="Logout" />
      <input type="button" className="user-list_button" onClick={() => history.push('/profile/me')} value="Profile" />
    </div> */}


    <div className="dropdown nav">
    <button className="dropbtn">User</button>
    <div className="dropdown-content">
      <div className="column">
      <input type="button" className="user-list_button right" onClick={logout} value="Logout" />
      <input type="button" className="user-list_button" onClick={() => history.push('/profile/me')} value="Profile" />
      </div>
      {/* <a href="#">Profile</a>
      <a href="#">Logout</a> */}
    </div>
  </div> 



  </div>
}

const NotLoginned = ({ login, registration, history }) => {
  return <div className="header-not-login">
    <input type="button" className="input_button" onClick={() => history.push('/login')} value="Sign in" />
    <input type="button" className="input_button" onClick={() => history.push('/registration')} value="Registration" />
    {/* <input type="button" className="input_button" onClick={() => { login() }} value="Sign in" />
    <input type="button" className="input_button" onClick={() => { registration() }} value="Registration" /> */}
  </div>
}