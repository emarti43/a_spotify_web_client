import React from 'react';
import logo from './spotify-icon.png';
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
    function LoginContent(props) {
      return(
        <div className="center-text">
          <h2 className="login-content">
            Please Login <a className="login-button" href="/login"> Here</a>
          </h2>
        </div>
      );
    }
    let content =
    <div>
      {this.state.userInfo ? <UserProfile userInfo={this.state.userInfo}/> : <LoginContent/>}
      {this.state.userPlaylists ? <UserPlaylists userPlaylists={this.state.userPlaylists}/> : ''}
    </div>;

    return (
      <div className="App">
        <div className="container">
          <div className="center-text">
            <img src={logo} className="Spotify-logo" alt="logo" />
          </div>

          {content}
        </div>
      </div>
    );
  }
}
