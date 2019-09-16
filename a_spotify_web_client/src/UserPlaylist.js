import React from 'react';
import './UserPlaylists.css';
import Track from './Track.js';
const axios = require('axios');
export default class UserPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTracks: false
    };
    this.displayInfo = this.displayInfo.bind(this);
  }

  displayInfo(event) {
    if (this.state.playlistInfo) {
      event.preventDefault();
      this.setState( prevState => { return {showTracks: !prevState.showTracks} })
    } else {
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
          this.setState({
            playlistInfo: response.data,
            showTracks: true
          });
        })
        .catch( error => {
          console.log(error);
        });
      }
    }
  }

  render() {
    if (this.state.playlistInfo) {
      var tracks = this.state.playlistInfo.tracks.items.map((item, index) => <Track track={item.track} key={index}/> );
    }
    return (
    <React.Fragment>
      <div className="Playlist-container" style={ this.state.playlistInfo ? {backgroundColor: "black"} : {}} onClick={this.displayInfo}>
        <div className="Playlist-image-container">
          <img className="Playlist-image" src={this.props.playlist.images[0].url || "null"} alt={`playlist for ${this.props.playlist.name}`}/>
        </div>
        <div className="Playlist-description">
          <h3> {this.props.playlist.name}</h3>
          {this.state.playlistInfo ? <h4>{this.state.playlistInfo.tracks.total} Tracks </h4>: ''}
        </div>
        {this.state.showTracks ? <div> {tracks} </div>: ''}
      </div>
    </React.Fragment>
    );
  }
}
