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

    this.state = {
      userData: {},
      id: decoded.id,
      username: '',
    }
  }

  updateForm = (event) => {
    const newFormData = this.state.userData;
    newFormData[event.target.id] = event.target.value;
    this.setState({
      userData: { ...newFormData }
    })
  }

  componentDidMount() {
    axios.get(userDataUrl,
      {
        headers: { 'authorization': this.token },
        params: { id: this.state.id }
      })
      .then(response => {
        this.setState({ userData: response.data, username: response.data.name });
      })
      .catch((err) => {
        console.log('err', err)
      });
  }

  editUserData = (event) => {
    event.preventDefault();
    // console.log('id', this.state.id);
    // console.log('token', this.token);
    // console.log('data', JSON.stringify(this.state.userData))
    axios.put(editPrivateProfileURL, 
      this.state.userData, {
      headers: { 'authorization': this.token },
      params: { id: this.state.id }
    })
      .then(res => {
        alert('data saved')
        this.props.history.push('/users');
      })
      .catch(err => {
        const errors = err.response.data;
        console.log(errors)
      })
  }

  showUserList() {
    this.props.history.push('/users');
  }

  render() {
    return (
      <form className="user-profile-container" onSubmit={this.editUserData}>
        <div className="header__userProfile-container">
          <img className="header__logo-profile" src="http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png" alt='some value' />
          <h1 className="headline__header__userProfile-container">Profile user {this.state.username}</h1>
          <div className="flex">
            <input type="button" className="header__back-button" onClick={() => { this.showUserList() }} />
          </div>
        </div>
        <div className="data-container flex">
          <div>
            <span className="user-label">Name</span>
            <input id="name" className="user-info flex justify-start editForm__input" value={this.state.userData.name || ''} onChange={this.updateForm} />
          </div>
          <div>
            <span className="user-label">Email</span>
            <input id="email" className="user-info flex justify-start editForm__input" value={this.state.userData.email || ''} onChange={this.updateForm} />
          </div>
          <div>
            <span className="user-label">Adress</span>
            <input id="adress" className="user-info flex justify-start editForm__input" value={this.state.userData.adress || ''} onChange={this.updateForm} />
          </div>
          <div>
            <span className="user-label">Phone number</span>
            <input id="phone" className="user-info flex justify-start editForm__input" value={this.state.userData.phone || ''} onChange={this.updateForm} />
          </div>
          <div>
            <span className="user-label">About user</span>
            <div className="flex justify-betwen">
            <input id="about" className="user-info flex justify-start editForm__input" value={this.state.userData.about || ''} onChange={this.updateForm} />
            <input type="submit" className="header__save-button" value="" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}