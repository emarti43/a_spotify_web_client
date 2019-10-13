import React from 'react';
import './UserPlaylists.css';
import UserPlaylist from './UserPlaylist';

function UserPlaylists({userPlaylists}) {
  let playlists = userPlaylists.map((playlist, i) =>
    <UserPlaylist playlist={playlist} key={i} index={i}/>
  );
  return(
    <div className="Playlists-container">
    {playlists}
    </div>
  );
}
export default UserPlaylists;
