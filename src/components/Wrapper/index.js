import React from 'react';
import Login from '../Login';
import Registration from '../Registration';
import Profile from '../Profile';

export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      displayedComponent: "login",
    };
  }

  handleDisplayedComponent = (component) => {
    this.setState({ displayedComponent: component})
  }

  render() {
    const { displayedComponent } = this.state;
    return (
      <div>
        <Authentification
         displayedComponent={displayedComponent}
         handleDisplayedComponent={this.handleDisplayedComponent} 
         />
      </div>
    )
  }
}

function Authentification(props) {
  const { displayedComponent } = props;
  switch(displayedComponent){
    case "login":
       return <Login {...props}/>;
    case "registration":
       return <Registration {...props}/>; 
    case "profile":
        return <Profile {...props}/>; 
       default: return ;
  }
}