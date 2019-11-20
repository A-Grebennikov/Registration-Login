import React from 'react';
import './App.css';
import Login from '../src/components/Login';
import Registration from '../src/components/Registration';
import Profile from '../src/components/Profile'


// started react rendering
class App extends React.Component {
  render() {
    return (
      <Login />
      // <Registration />
      // <Profile />
    )
  }
}
export default App;