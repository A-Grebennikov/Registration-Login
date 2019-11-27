import React from 'react';
import axios from 'axios';


export default class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/users/userData',
      {
        'headers': { 'authorization': token },
        'params': { id: this.state.id }
      }
    )
      .then(response => {
        this.setState({ userData: response.data });
      })
      .catch((err) => {
        console.log('err', err)
      });
  }

  showUserList() {
    this.props.history.push('/users');
  }

  render() {
    return (
      <div className="user-profile-container">
        <div className="header__userProfile-container">
          <img className="header__logo-profile" src="http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png" alt='some value' />
          <h1 className="headline__header__userProfile-container">Personal data</h1>
          <div>
            <input type="button" className="header__back-button" onClick={() => { this.showUserList() }} />
          </div>
        </div>
        <div className="data-container flex">
          <div>
            <span className="user-label">Name</span>
            <div className="user-info flex justify-start">{this.state.userData.name}</div>
          </div>
          <div>
            <span className="user-label">Email</span>
            <div className="user-info flex justify-start">{this.state.userData.email}</div>
          </div>
          <div>
            <span className="user-label">Adress</span>
            <div className="user-info flex justify-start">{this.state.userData.adress}</div>
          </div>
          <div>
            <span className="user-label">Phone number</span>
            <div className="user-info flex justify-start">{this.state.userData.phone}</div>
          </div>
          <div>
            <span className="user-label">About user</span>
            <div className="user-info flex justify-start textarea">{this.state.userData.about}</div>
          </div>
        </div>
      </div>
    );
  };
}

