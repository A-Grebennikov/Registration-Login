import React from 'react';
import Login from '../Login';
import Header from '../Header';
import UserList from '../UserList';
import UserProfile from '../UserProfile';
import Registration from '../Registration';
import PrivateProfile from '../PrivateProfile';
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { getIslogin } from "../../helpers"

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.customHistory = createBrowserHistory();
    this.state = {
      isLogined: getIslogin(),
    }
  }

  handleLogin = (isLogined = false) => {
    this.setState({ isLogined })
  }

  render() {
    return (
      <Router history={this.customHistory}>
        <Header history={this.customHistory} isLogined={this.state.isLogined} handleLogin={this.handleLogin}/>
        <Switch>
          <Route path='/login' component={(props) => <Login {...props} handleLogin={this.handleLogin} />} />
          <Route path='/registration' component={Registration} />
          <Route path='/profile/me' component={PrivateProfile} />
          <WithToken>
            <Route path='/users' component={(props) => <UserList {...props} handleLogin={this.handleLogin} />} />
            <Route path='/profile/:id' component={UserProfile} />
            <Redirect from='/' to='/users' />
          </WithToken>
        </Switch>
        <footer></footer>
      </Router>
    );
  };
}

const WithToken = ({ children, defaultComponent = <Redirect to='/login' /> }) => {
 
  if (getIslogin()) {
    return children
  }
  return defaultComponent
}