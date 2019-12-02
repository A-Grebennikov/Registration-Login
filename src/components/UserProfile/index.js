import React from 'react';
import axios from 'axios';

const userDataUrl = 'http://localhost:5000/api/users/userData';

export default class Userprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      id: this.props.match.params.id,
      isLoaded: false,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    axios.get(userDataUrl,
      {
        'headers': { 'authorization': token },
        'params': { id: this.state.id }
      }
    )
      .then(response => {
        this.setState({ userData: response.data, isLoaded: true });
      })
      .catch((err) => {
        console.log('err', err)
      });
  }

  showUserList() {
    this.props.history.push('/users');
  }

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <h1>Loading...</h1>
    }
    return (
      <div className="user-profile-container">
        <div className="header__userProfile-container">
          <img className="header__logo-profile" src={this.state.userData.avatar} alt='some value' />
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

