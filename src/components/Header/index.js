import React from "react";

export default class Header extends React.Component {

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
  return <div className="header justify-betwen align-items_center">
    <input type="button" className="header_button button_left" onClick={() => history.push('/users')} value="User list" />
    <div className="dropdown button_right">
      <input type="button" className="header_button" value="user" />
      <div className="dropdown-content">
        <div className="column">
          <input type="button" className="header_button margin_middle size_dropdown_item" onClick={logout} value="Logout" />
          <input type="button" className="header_button margin_middle size_dropdown_item" onClick={() => history.push('/profile/me')} value="Profile" />
        </div>
      </div>
    </div>
  </div>
}

const NotLoginned = ({ history }) => {
  return <div className="header  justify-end align-items_center">
    <input type="button" className="header_button button_right" onClick={() => history.push('/login')} value="Sign in" />
    <input type="button" className="header_button button_right" onClick={() => history.push('/registration')} value="Registration" />
  </div>
}