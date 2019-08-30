import React from 'react';
import './UserPlaylists.css'

export default class UserPlaylists extends React.Component {

  render() {
    let playlists = this.props.userPlaylists.map((playlist) =>
    <div className="Playlist-container">
      <div className="Playlist-image-container">
        <img className="Playlist-image" src={playlist.images[0].url || "null"} alt={`playlist for ${playlist.name}`}/>
      </div>
      <div className="Playlist-content">
        <h5> {playlist.name}</h5>
      </div>
    </div>);
    return(
      <div className="Playlists-container">
      {playlists}
      </div>
    );
  }
}
