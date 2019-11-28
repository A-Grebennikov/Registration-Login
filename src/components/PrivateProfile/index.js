import React from 'react';
import axios from 'axios';

const jwtDecode = require('jwt-decode');
const editPrivateProfileURL = "http://localhost:5000/api/users/editProfile";
const userDataUrl = 'http://localhost:5000/api/users/userData';

export default class PrivateProfile extends React.Component {
  constructor(props) {
    super(props);

    this.token = localStorage.getItem('token');
    
    const decoded = jwtDecode(this.token);
    console.log(decoded)
    
    this.state = {
      userData: {},
      id: decoded.id,
    }
  }

  updateForm = (event) => {
    const newFormSata = this.state.userData;
    newFormSata[event.target.id] = event.target.value;
    this.setState({
      userData: {...newFormSata}
    })
  } 

  componentDidMount() {
    axios.get(userDataUrl,
      {
        'headers': { 'authorization': this.token },
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

  render() {
    console.log('render');
    return (
      <div className="user-profile-container">
        <div className="header__userProfile-container">
          <img className="header__logo-profile" src="http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png" alt='some value' />
          <h1 className="headline__header__userProfile-container">Profile user {this.state.userData.name}</h1>
        </div>
        <div className="data-container flex">
          <div>
            <span className="user-label">Name</span>
            <input id="name" className="user-info flex justify-start " value={this.state.userData.name || ''} onChange={this.updateForm}/>
          </div>
          <div>
            <span className="user-label">Email</span>
            <input id="email" className="user-info flex justify-start" value={this.state.userData.email || ''} onChange={this.updateForm}/>
          </div>
          <div>
            <span className="user-label">Adress</span>
            <input id="adress" className="user-info flex justify-start" value={this.state.userData.adress || ''} onChange={this.updateForm}/>
          </div>
          <div>
            <span className="user-label">Phone number</span>
            <input id="phone" className="user-info flex justify-start" value={this.state.userData.phone || ''} onChange={this.updateForm}/>
          </div>
          <div>
            <span className="user-label">About user</span>
            <input id="about" className="user-info flex justify-start textarea" value={this.state.userData.about || ''} onChange={this.updateForm}/>
          </div>
        </div>
      </div>
    );
  }
}