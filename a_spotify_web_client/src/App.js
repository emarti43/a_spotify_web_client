import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './UserProfile';
const axios = require('axios');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.fetchUserInformation = this.fetchUserInformation.bind(this);
  }

  fetchUserInformation() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      let params = {
        headers: {'Authorization': 'Bearer ' + urlParams.get('access_token')},
        json: true,
        method: 'get',
        url: 'https://api.spotify.com/v1/me',
      }
      axios(params)
      .then( response => {
        console.log(response);
        this.setState({userInfo: response.data})
      })
      .catch( error => {
        console.log(error);
      }); 
    }
  }

  componentDidMount() {
    this.fetchUserInformation();
  }

  render () {

    let linkToLogin = (this.state.accessToken && this.state.refresh_token) ?
      <a
        className="App-link"
        href="http://edgar-marti.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Login
      </a> : '';
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.userInfo ? <UserProfile userInfo={this.state.userInfo}/> : ''}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}
