import React from 'react';
import Login from '../Login';
import Registration from '../Registration';
import UserList from '../UserList';
import UserProfile from '../UserProfile';
import Header from '../Header';
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { createBrowserHistory } from "history";

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.customHistory = createBrowserHistory();
    this.state = {
      isLogined: false,
    }
  }

  handleLogin = (isLogined = false) => {
    this.setState({ isLogined })
  }

  render() {
    console.log('new render')
    return (
      <Router history={this.customHistory}>
        <Header history={this.customHistory} isLogined={this.state.isLogined} />
        <Switch>
          <Route path='/login' component={(props) => <Login {...props} handleLogin={this.handleLogin} />} />
          <Route path='/registration' component={Registration} />
          {/* <Route path='/profile' component={} /> */}
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
  let isLogined = false;
  let token = localStorage.getItem('token');
  if (token) isLogined = true;

  if (isLogined) {
    return children
  }
  return defaultComponent
}