import React from 'react';
import './UserPlaylists.css';
const axios = require('axios');
export default class UserPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchInfo = this.fetchInfo.bind(this);
  }
  fetchInfo(event) {
    event.preventDefault();
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access_token')) {
      let params = {
        headers: {'Authorization': 'Bearer ' + urlParams.get('access_token')},
        json: true,
        method: 'get',
        url: 'https://api.spotify.com/v1/playlists/' + this.props.playlist.id,
      }
      axios(params)
      .then( response => {
        console.log(response);
        this.setState({playlistInfo: response.data});
      })
      .catch( error => {
        console.log(error);
      });
    }
  }
  render() {
    return (
    <React.Fragment>
    <div className="Playlist-container">
      <div className="Playlist-image-container">
          <img className="Playlist-image" src={this.props.playlist.images[0].url || "null"} alt={`playlist for ${this.props.playlist.name}`}/>
        </div>
        <div className="Playlist-content"  onClick={this.fetchInfo}>
          <h5> {this.props.playlist.name}</h5>
          {this.state.playlistInfo ? `${this.state.playlistInfo.tracks.total} tracks`: ''}
        </div>
      </div>
    </React.Fragment>
  );
  }
}
