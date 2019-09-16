import React from 'react';
import './UserPlaylists.css';
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
export default Track;
