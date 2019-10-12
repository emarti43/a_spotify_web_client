import React from 'react';
import './UserPlaylists.css';
import playButton from './play-button.png'
import genericRequest from './ApiRequests';
function Track({track}) {
  const urlParams = new URLSearchParams(window.location.search);
  const playTrack = () => {
    console.log('there\' no endpoint for this to work rn');
  }
  return (
    <div className='track-container'>
      <div className='track-content'>
        <h3 className='track-title'>{track.name}</h3>
        <div className='track-artists'>
          {track.artists[0].name}
        </div>
      </div>
      <div className='track-url'>
        <a  className="play-button" onClick={() => playTrack()}>
          <img src={playButton} alt="play button"/>
        </a>
      </div>
    </div>
  );
}
export default Track;
