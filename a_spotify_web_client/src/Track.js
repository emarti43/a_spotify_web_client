import React from 'react';
import './UserPlaylists.css';
import playButton from './play-button.png'
function Track({track}) {
    return (
      <div className='track-container'>
        <div className='track-content'>
          <h3 className='track-title'>{track.name}</h3>
          <div className='track-artists'>
            {track.artists[0].name}
          </div>
        </div>
        <div className='track-url'>
          <a href={track.external_urls.spotify} className="play-button">
            <img src={playButton} alt="play button"/>
          </a>
        </div>
      </div>
    );
}
export default Track;
