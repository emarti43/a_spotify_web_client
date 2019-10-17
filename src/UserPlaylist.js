import React, { useContext } from 'react';
import './UserPlaylists.css';
import {default as UserContext} from './Contexts/UserContext';
import { pushPlaylist } from './Contexts/UserActions';

function UserPlaylist({playlist, index}) {
  let {state, dispatch} = useContext(UserContext);
  return (
  <React.Fragment>
    <div className="Playlist-container" >
      <div className="playlist-header" onClick={() => pushPlaylist({playlist}, dispatch)}>
        <div className="Playlist-image-container">
          <img className="Playlist-image" src={playlist.images[0].url || "null"} alt={`playlist for ${playlist.name}`}/>
        </div>
        <div className="Playlist-description">
          <h4 className="Playlist-description"> {playlist.name} </h4>
        </div>
      </div>
    </div>
  </React.Fragment>
  );
}
export default UserPlaylist