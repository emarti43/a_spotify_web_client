import React from 'react';
import './UserPlaylists.css';
import UserPlaylist from './UserPlaylist';
export default class UserPlaylists extends React.Component {
  render() {
    let playlists = this.props.userPlaylists.map((playlist, i) =>
      <UserPlaylist playlist={playlist} key={i} renderDetails={this.props.renderDetails}/>
    );
    return(
      <div className="Playlists-container">
      {playlists}
      </div>
    );
  }
}
