import React, { useContext } from 'react';
import './UserPlaylists.css';
import {default as UserContext} from './Contexts/UserContext';
import { pushPlaylist } from './Contexts/UserActions';
import placeholderArt from './assets/placeholder-art-icon.png';

function UserPlaylist({playlist, index}) {
  let {state, dispatch} = useContext(UserContext);
  let playlistImage = playlist.images ? playlist.images[0] : undefined;
  return (
    <React.Fragment> 
      <div className="Playlist-container" >
        <div className="playlist-header" onClick={() => pushPlaylist({playlist}, dispatch)}>
          <div className="Playlist-image-container">
            <img className="Playlist-image" src={playlistImage ? playlistImage.url : placeholderArt} alt={`playlist for ${playlist.name}`}/>
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
