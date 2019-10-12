import React from 'react';
import './UserPlaylists.css';

function UserPlaylist({renderDetails, playlist, index}) {
  return (
  <React.Fragment>
    <div className="Playlist-container" >
      <div className="playlist-header" onClick={() => renderDetails(playlist.id)}>
        <div className="Playlist-image-container">
          <img className="Playlist-image" src={playlist.images[0].url || "null"} alt={`playlist for ${playlist.name}`}/>
        </div>
        <div className="Playlist-description">
          <h4> {playlist.name} </h4>
        </div>
      </div>
    </div>
  </React.Fragment>
  );
}
export default UserPlaylist
