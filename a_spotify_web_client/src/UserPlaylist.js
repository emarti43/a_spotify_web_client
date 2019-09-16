import React from 'react';
import './UserPlaylists.css';
const axios = require('axios');
export default class UserPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayInfo = this.displayInfo.bind(this);
  }
  displayInfo(event) {
    if (this.state.playlistInfo) {
      event.preventDefault();
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
          this.setState({playlistInfo: response.data});
        })
        .catch( error => {
          console.log(error);
        });
      }
    }
  }

  render() {
    function Track({track}) {
        return (
          <div className='track-container'>
            <div className='track-image'>
              <img src={track.album.images[0].url} alt="track"/>
            </div>
            <div className='track-content'>
                <h3 className='track-title'>{track.name}</h3>
              <div className='track-artists'>
                {track.artists[0].name}
              </div>
            </div>
          </div>
        );
    }
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
        {this.state.playlistInfo ? <div> {tracks} </div>: ''}
      </div>
    </React.Fragment>
    );
  }
}
