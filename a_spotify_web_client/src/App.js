import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProfile from './UserProfile';
import UserPlaylists from './UserPlaylists';
const axios = require('axios');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.fetchUserInformation = this.fetchUserInformation.bind(this);
    this.fetchUserPlaylists = this.fetchUserPlaylists.bind(this);
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
        this.setState({userInfo: response.data})
      })
      .catch( error => {
        console.log(error);
      });
    }
  }

  fetchUserPlaylists() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      let params = {
        headers: {'Authorization': 'Bearer ' + urlParams.get('access_token')},
        json: true,
        method: 'get',
        url: 'https://api.spotify.com/v1/me/playlists',
      }
      axios(params)
      .then( response => {
        this.setState({userPlaylists: response.data.items})
      })
      .catch( error => {
        console.log(error);
      });
    }
  }

  componentDidMount() {
    this.fetchUserInformation();
    this.fetchUserPlaylists();
  }

  render () {

    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        {this.state.userInfo ? <UserProfile userInfo={this.state.userInfo}/> : ''}
        {this.state.userPlaylists ? <UserPlaylists userPlaylists={this.state.userPlaylists}/> : ''}
      </div>
    );
  }
}
