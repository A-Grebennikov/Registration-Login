import React from "react";

export default class Header extends React.Component {
  login = () => {
    this.props.history.push('/login');
  }

  registration = () => {
    this.props.history.push('/registration')
  }

  userList = () => {
    this.props.history.push('/users')
  }

  userProfile = () => {
    this.props.history.push('/profile/:id')
  }

  render() {
    const { isLogined } = this.props;
    if (isLogined) {
      return <Loginned userList={this.userList} userProfile={this.userProfile} history={this.props.history}/>
    } else {
      return <NotLoginned login={this.login} registration={this.registration} />
    }
  }
}

const Loginned = ({ userList, userProfile, history }) => {
  return <div className="header-loginned">
    <input type="button" className="user-list_button" onClick={() => { userList() }} value="User list" />
    <input type="button" className="user-list_button" onClick={() => history.push('/profile/me') } value="Profile" />
    {/* <select className="action-user_select">
      <option><input type="button" className="actiun-user_select" onClick={() => { userProfile() }} value="userProfile" /></option>
      <option><span>logout</span></option>
    </select> */}
  </div>
}

const NotLoginned = ({ login, registration }) => {
  return <div className="header-not-login">
    <input type="button" className="input_button" onClick={() => { login() }} value="Sign in" />
    <input type="button" className="input_button" onClick={() => { registration() }} value="Registration" />
  </div>
}