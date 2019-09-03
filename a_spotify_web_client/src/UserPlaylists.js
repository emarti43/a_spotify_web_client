import React from 'react';
import './UserPlaylists.css';
import UserPlaylist from './UserPlaylist';
export default class UserPlaylists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let playlists = this.props.userPlaylists.map((playlist) =>
      <UserPlaylist playlist={playlist}/>
    );
    return(
      <div className="Playlists-container">
      {playlists}
      </div>
    );
  }
}
